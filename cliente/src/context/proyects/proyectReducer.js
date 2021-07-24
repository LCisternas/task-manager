/* Here I set all the functionalities of the functions of the ProyectState */
import { FORM_PROYECT, GET_PROYECTS, ADD_PROYECTS, VALID_FORM, ACTUAL_PROYECT, DELETE_PROYECT } from '../../types/index'

const proyectReducer = (state, action) => {
  switch(action.type) {
    case FORM_PROYECT :
      return {
        ...state,
        form: true
      }
    case GET_PROYECTS :
      // console.log(action.payload)
      return {
        ...state,
        proyects: action.payload
      }
    case ADD_PROYECTS :
      return {
        ...state,
        proyects: [...state.proyects, action.payload],
        form: false,
        errorForm: false,
      }
    case VALID_FORM :
      return {
        ...state,
        errorForm: true
      }
    case ACTUAL_PROYECT :
      return {
        ...state,
        proyect: state.proyects.filter(proyect => proyect._id === action.payload)
      }
    case DELETE_PROYECT :
      console.log(action.payload)
      return {
        ...state,
        proyects: state.proyects.filter(proyect => proyect._id !== action.payload),
        proyect: null
      }          
    default: 
      return state
  }
}

export default proyectReducer;