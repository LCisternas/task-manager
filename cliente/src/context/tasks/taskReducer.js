/* Here I set all the functionalities of the functions of the TaskState */
import { TASKS_PROYECTS ,ADD_TASK, VALID_FORM, DELETE_TASK, ACTUAL_TASK, UPDATE_TASK } from '../../types'

const taskReducer = (state, action) => {
  switch(action.type) {
    case TASKS_PROYECTS :
      return {
        ...state,
        tasksProyect: action.payload,
        activeTask: null
      }
    case ADD_TASK :
      return {
        ...state,
        tasksProyect: [...state.tasksProyect, action.payload],
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
        tasksProyect: state.tasksProyect.filter(task => task._id !== action.payload)
      }
    case ACTUAL_TASK :
      return {
        ...state,
        activeTask: action.payload
      }
    case UPDATE_TASK :
      return {
        ...state,
        tasksProyect: state.tasksProyect.map(task => task._id === action.payload._id ? action.payload : task),
        activeTask: null
      }            
    default : 
      return state
  }
}

export default taskReducer;