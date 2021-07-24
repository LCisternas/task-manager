/* Here I set all the functionalities of the functions of the AuthState */
import {
  SUCCESSFUL_REGISTRATION,
  ERROR_REGISTRATION,
  GET_USER,
  SUCCESSFUL_LOGIN,
  ERROR_LOGIN,
  LOG_OUT
} from '../../types';

const authReducer = (state, action) => {
  switch(action.type) {
    case SUCCESSFUL_REGISTRATION :
    case SUCCESSFUL_LOGIN :  
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        authenticated: true,
        msg: null,
        charging: false
      }
    case GET_USER :
      return{
        ...state,
        authenticated: true,
        user: action.payload,
        charging: false
      }
    case LOG_OUT :    
    case ERROR_LOGIN :
    case ERROR_REGISTRATION :
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        msg: action.payload,
        authenticated: null,
        user: null,
        charging: false
      }  
    default :
      return state
  }
}

export default authReducer;