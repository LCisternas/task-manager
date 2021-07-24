/* Component that renders each task */
/* Dependencies */
import React, { useContext } from 'react'
import taskContext from '../../context/tasks/taskContext';
import proyectContext from '../../context/proyects/proyectContext';
/* Component */
const Task = ({ task }) => {

  /* Use Context TaskState */
  const tasksContext = useContext(taskContext)
  const { deleteTask, getTasksByProyect, updateState, actualTask } = tasksContext
  /* Use Context ProyectState */
  const proyectsContext = useContext(proyectContext)
  const { proyect } = proyectsContext
  /* Function onClick Event */
  const onClickDelete = (id) => {
    deleteTask(id)
    getTasksByProyect(proyect[0].id)
  }
  /* Function onClick Event */
  const onClickUpdateState = (task) => {
    if(task.state) {
      task.state = false
    } else {
      task.state = true
    }
    updateState(task)
  }
  /* Function it take a task to update it */ 
  const selectTask = (task) => {
    actualTask(task)
  }

  return (
    <li className='tarea sombra'>
      <p>{task.name}</p>
      <div className='estado'>
        {
          task.state
          ? (
              <button
                type='button'
                className='completo'
                onClick={() => onClickUpdateState(task)}
              > complete </button>
            )
          : (
              <button
                type='button'
                className='incompleto'
                onClick={() => onClickUpdateState(task)}
              > incomplete </button>
            )  
        }
      </div>
      <div className='acciones'>
        <button
          type='button'
          className='btn btn-primario'
          onClick={() => selectTask(task)}
        >Edit</button>
        <button
          type='button'
          className='btn btn-secundario'
          onClick={() => onClickDelete(task.id)}
        >Delete</button>
      </div>
    </li>
  );
};
 
export default Task;