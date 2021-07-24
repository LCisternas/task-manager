/* Here I set all the functionalities of the functions of the TaskState */
import { TASKS_PROYECTS ,ADD_TASK, VALID_FORM, DELETE_TASK, UPDATE_STATE, ACTUAL_TASK, UPDATE_TASK } from '../../types'

const taskReducer = (state, action) => {
  switch(action.type) {
    case TASKS_PROYECTS :
      return {
        ...state,
        tasksProyect: state.tasks.filter(task => task.proyectId === action.payload),
        activeTask: null
      }
    case ADD_TASK :
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        taskerror: false
      }
    case VALID_FORM :
      return {
        ...state,
        taskerror: true
      }
    case DELETE_TASK :
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      }
    case UPDATE_STATE :
      return {
        ...state,
        tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task),
        activeTask: null
      }
    case ACTUAL_TASK :
      return {
        ...state,
        activeTask: action.payload
      }
    case UPDATE_TASK :
      return {
        ...state,
        tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task),
        activeTask: null
      }            
    default : 
      return state
  }
}

export default taskReducer;