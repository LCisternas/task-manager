/* Component to creating Task */
/* Dependencies */
import React, { useContext, useState, useEffect } from 'react'
import proyectContext from '../../context/proyects/proyectContext';
import taskContext from '../../context/tasks/taskContext';
import { nanoid } from 'nanoid';
/* Component */
const FormTask = () => {

  /* Use Context ProyectState */
  const proyectsContext = useContext(proyectContext)
  const { proyect } = proyectsContext
  /* Use Context TaskState */
  const tasksContext = useContext(taskContext)
  const { addTask, taskError, taskerror, getTasksByProyect, activeTask, updateTask } = tasksContext

  useEffect(() => {
    /* Reload component every time I edit a task */
    if(activeTask !== null) {
      setTask(activeTask)
    } else {
      /* Reload input */
      setTask({ name: '', state: false })
    }
  }, [activeTask])
  /* Local State */
  const [task, setTask] = useState({
    name: '',
    state: false
  })
  /* Destructuring */
  const { name } = task
  /* Function onChange Event */
  const onChangeTask = e => {
    setTask({
      ...task,
      [e.target.name] : e.target.value
    })
  }
  /* Function onSubmit Event */
  const onSubmitTask = e => {
    e.preventDefault()
    /* Simple Validation */
    if(name.trim() === '') {
      taskError()
      return;
    }
    /* Simple Validation to add and not edit */
    if(activeTask === null) {
      task.proyectId = proyect[0].id
      task.id = nanoid()
      addTask(task)
    } else {
      /* If is not null then edit */
      updateTask(task)
    }
    /* Show in the task inmediately */
    getTasksByProyect(task.proyectId)
    /* Reset Form */
    setTask({
      name: '', state: false
    })
  }
  /* If the proyect does not exist, return null */
  if(proyect === null) return null

  return (
    <div className='formulario'>
      <form onSubmit={onSubmitTask}>
        <div className='contenedor-input'>
          <input 
            type='text'
            className='input-text'
            placeholder='Task Name'
            name='name'
            value={name}
            onChange={onChangeTask}
          />
        </div>
        <div className='contenedor-input'>
          <button
          type='submit'
          className='btn btn-form btn-block' 
          > {activeTask ? 'Edit Task' : 'Add Task'} </button>
        </div>
      </form>
      {taskerror ? ( <p className='mensaje error'>EMPTY INPUT</p> ) : null }
    </div>
  );
};
 
export default FormTask;