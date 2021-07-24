/* Use useReducer instead of redux */
/* Depedencies */
import React, { useReducer } from 'react';
import proyectContext from './proyectContext';
import proyectReducer from './proyectReducer';
import { FORM_PROYECT, GET_PROYECTS, ADD_PROYECTS, VALID_FORM, ACTUAL_PROYECT, DELETE_PROYECT } from '../../types/index'
import axiosClient from '../../config/axios';

/* Component with initial status for new proyects */
const ProyectState = props => {

  /* Initial State always is a Object */
  const initialState = {
    form : false,
    proyects : [],
    errorForm: false,
    proyect: null
  }

  /* Creating dispatch for actions */
  const [state, dispatch] = useReducer(proyectReducer, initialState)

  /*** FUNCTIONS ***/
  const showForm = () => {
    dispatch({
      type: FORM_PROYECT
    })
  }
  const getProyects = async () => {
    try {
      const result = await axiosClient.get('/api/proyects')
      dispatch({
        type: GET_PROYECTS,
        payload: result.data.proyects
      })
    }
    catch (error) {
      console.log(error)
    }
  }
  const addProyects = async proyect => {
    try {
      const result = await axiosClient.post('/api/proyects', proyect);
      console.log(result)
      dispatch({
        type: ADD_PROYECTS,
        payload: result.data
      })
    } 
    catch (error) {
      console.log(error)  
    }
  }
  const validForm = () => {
    dispatch({
      type: VALID_FORM
    })
  }
  const actualProyect = proyectId =>{
    dispatch({
      type: ACTUAL_PROYECT,
      payload: proyectId
    })
  }
  const deleteProyect = async proyectId => {
    try {
      const result = await axiosClient.delete(`/api/proyects/${proyectId}`)
      dispatch({
        type: DELETE_PROYECT,
        payload: result.data
      })
    } 
    catch (error) {
      console.log(error)
    }
  } 

  return (
    /* Here we created the context for new proyects */
    <proyectContext.Provider
      value={{
        form: state.form,
        proyects: state.proyects,
        errorForm: state.errorForm,
        proyect: state.proyect,
        showForm,
        getProyects,
        addProyects,
        validForm,
        actualProyect,
        deleteProyect
      }}
    >
      {props.children}
    </proyectContext.Provider>
  )
}

export default ProyectState;