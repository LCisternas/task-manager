/* Use useReducer instead of redux */
/* Depedencies */
import React, { useReducer } from 'react';
import proyectContext from './proyectContext';
import proyectReducer from './proyectReducer';
import { FORM_PROYECT, GET_PROYECTS, ADD_PROYECTS, VALID_FORM, ACTUAL_PROYECT, DELETE_PROYECT } from '../../types/index'
import { nanoid } from 'nanoid'

/* Component with initial status for new proyects */
const ProyectState = props => {

  const proyects = [
    { id: 1 ,name: 'ecommerce' },
    { id: 2, name: 'Intranet' },
    { id: 3, name: 'Website Design' },
    { id: 4, name: 'TEST' }
  ]

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
  const getProyects = () => {
    dispatch({
      type: GET_PROYECTS,
      payload: proyects
    })
  }
  const addProyects = proyect => {
    proyect.id = nanoid()
    dispatch({
      type: ADD_PROYECTS,
      payload: proyect
    })
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
  const deleteProyect = proyect => {
    dispatch({
      type: DELETE_PROYECT,
      payload: proyect
    })
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