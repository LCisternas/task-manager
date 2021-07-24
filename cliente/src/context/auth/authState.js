/* Dependencies */
import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
/* Case */
import {
  SUCCESSFUL_REGISTRATION,
  ERROR_REGISTRATION,
  GET_USER,
  SUCCESSFUL_LOGIN,
  ERROR_LOGIN,
  LOG_OUT
} from '../../types';
/* localhost:4000 */
import axiosClient from '../../config/axios';
/* authentication */
import tokenAuth from '../../config/tokenAuth';
/* Component */
const AuthState = props => {

  const initialState = {
    token: localStorage.getItem('token'),
    authenticated: null,
    user: null,
    msg: null,
    charging: true
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  /*** FUNCTIONS ***/
  /* Function that register the user */
  const userRegister = async (info) => {
    try {
      const response = await axiosClient.post('/api/users', info)
      dispatch({
        type: SUCCESSFUL_REGISTRATION,
        payload: response.data
      })
      userAuthenticated()
    } 
    catch (error) {
      const alert = {
        msg: error.response.data.msg,
        category: 'alerta-error'
      }
      dispatch({
        type: ERROR_REGISTRATION,
        payload: alert
      })  
    }
  }
  /* Function that verifies that the user is authenticated */
  const userAuthenticated = async () => {
    const token = localStorage.getItem('token');
    if(token) {
      tokenAuth(token);
    }

    try {
      const response = await axiosClient.get('/api/auth')
      dispatch({
        type: GET_USER,
        payload: response.data.user
      })
    } 
    catch (error) {
      dispatch({
        type: ERROR_LOGIN
      })  
    }
  }
 /* Function that checks a registered user */
  const logIn = async info => {
    try {
      const response = await axiosClient.post('/api/auth', info)
      dispatch({
        type: SUCCESSFUL_LOGIN,
        payload: response.data
      })
      userAuthenticated();
    }  
    catch (error) {
      console.log(error.response.data.msg)
      const alert = {
        msg: error.response.data.msg,
        category: 'alerta-error'
      }
      dispatch({
        type: ERROR_LOGIN,
        payload: alert
      })
    }
  }
  /* Function that logs out */
  const logOut = () => {
    dispatch({
      type: LOG_OUT
    })
  }

  return (
    <authContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        msg: state.msg,
        charging: state.charging,
        userRegister,
        logIn,
        userAuthenticated,
        logOut
      }}
    >
      { props.children }
    </authContext.Provider>
  )

}

export default AuthState;