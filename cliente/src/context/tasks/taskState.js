/* Dependencies */
import React, { useReducer } from 'react';
import taskContext from './taskContext';
import taskReducer from './taskReducer';
import { TASKS_PROYECTS, ADD_TASK, VALID_FORM, DELETE_TASK, ACTUAL_TASK, UPDATE_TASK } from '../../types';
import axiosClient from '../../config/axios';
/* Component */
const TaskState = props => {

  const initialState = {
    tasksProyect : [],
    taskerror: false,
    activeTask: null
  }
  const [state, dispatch] = useReducer(taskReducer, initialState);

  /*** FUNCTIONS ***/
  const getTasksByProyect = async proyect => {
    try {
      const result = await axiosClient.get('/api/tasks', { params: { proyect } }) 
      dispatch({
        type: TASKS_PROYECTS,
        payload: result.data.task
      })  
    } 
    catch (error) {
      console.log(error)
    }
  }
  const addTask = async task => {
    try {
      // eslint-disable-next-line
      const result = await axiosClient.post('/api/tasks', task)
      dispatch({
        type: ADD_TASK,
        payload: task
      })
    }
     catch (error) {
      console.log(error)  
    }
  }
  const taskError = () => {
    dispatch({
      type: VALID_FORM
    })
  }
  const deleteTask = async (id, proyect) => {
    try {
      await axiosClient.delete(`/api/tasks/${id}`, { params: { proyect } })
      dispatch({
        type: DELETE_TASK,
        payload: id
      })
    } 
    catch (error) {
      console.log(error)  
    }
  }
  const updateTask = async task => {
    try {
      const result = await axiosClient.put(`/api/tasks/${task._id}`, task)
      console.log(result.data.oneTask)
      dispatch({
        type: UPDATE_TASK,
        payload: result.data.oneTask
      })  
    } 
    catch (error) {
      console.log(error)  
    }
  }
  const actualTask = task => {
    dispatch({
      type: ACTUAL_TASK,
      payload: task
    })
  }

  return (
    <taskContext.Provider
      value={{
        tasksProyect: state.tasksProyect,
        taskerror: state.taskerror,
        activeTask: state.activeTask,
        getTasksByProyect,
        addTask,
        taskError,
        deleteTask,
        actualTask,
        updateTask
      }}
    >
      {props.children}
    </taskContext.Provider>
  )
}

export default TaskState;