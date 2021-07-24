/* Dependencies */
import React, { useReducer } from 'react';
import taskContext from './taskContext';
import taskReducer from './taskReducer';
import { TASKS_PROYECTS, ADD_TASK, VALID_FORM, DELETE_TASK, UPDATE_STATE, ACTUAL_TASK, UPDATE_TASK } from '../../types';
/* Component */
const TaskState = props => {

  const initialState = {
    tasks: [
      { id: 1, name: 'Fix cart', state: true, proyectId: 1 },
      { id: 2, name: 'Choose Colors', state: false, proyectId: 2 },
      { id: 3, name: 'Config Payments', state: true, proyectId: 3 },
      { id: 4, name: 'Fix view Products', state: false, proyectId: 4 },
      { id: 5, name: 'Build Back-end', state: false, proyectId: 2 },
      { id: 6, name: 'Write DOCS', state: true, proyectId: 3 },
      { id: 7, name: 'Deployment App', state: false, proyectId: 4 }
    ],
    tasksProyect : [],
    taskerror: false,
    activeTask: null
  }
  const [state, dispatch] = useReducer(taskReducer, initialState);

  /*** FUNCTIONS ***/
  const getTasksByProyect = proyectId => {
    dispatch({
      type: TASKS_PROYECTS,
      payload: proyectId
    })
  }
  const addTask = task => {
    dispatch({
      type: ADD_TASK,
      payload: task
    })
  }
  const taskError = () => {
    dispatch({
      type: VALID_FORM
    })
  }
  const deleteTask = id => {
    dispatch({
      type: DELETE_TASK,
      payload: id
    })
  }
  const updateState = task => {
    dispatch({
      type: UPDATE_STATE,
      payload: task
    })
  }
  const actualTask = task => {
    dispatch({
      type: ACTUAL_TASK,
      payload: task
    })
  }
  const updateTask = task => {
    dispatch({
      type: UPDATE_TASK,
      payload: task
    })
  }

  return (
    <taskContext.Provider
      value={{
        tasks: state.tasks,
        tasksProyect: state.tasksProyect,
        taskerror: state.taskerror,
        activeTask: state.activeTask,
        getTasksByProyect,
        addTask,
        taskError,
        deleteTask,
        updateState,
        actualTask,
        updateTask
      }}
    >
      {props.children}
    </taskContext.Provider>
  )
}

export default TaskState;