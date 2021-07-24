/* List all task for proyect */
/* Dependencies */
import React, { Fragment, useContext } from 'react'
import Task from './Task';
import proyectContext from '../../context/proyects/proyectContext';
import taskContext from '../../context/tasks/taskContext';
/* Component */
const ListTask = () => {
  
  /* Use Context TaskState */
  const tasksContext = useContext(taskContext)
  const { tasksProyect } = tasksContext
  /* Use Context ProyectState */
  const proyectsContext = useContext(proyectContext)
  const { proyect, deleteProyect } = proyectsContext
  /* If proyect does not exist, return null */
  if(proyect === null) {
    return <h1 className='proyectos'>Select a Proyect</h1>
  }

  /* Here show data for proyects and tasks */
  return (
    <Fragment>
      <h2>Proyect : {proyect[0].name}</h2>
      <ul className='listado-tareas'>
        {
          tasksProyect.length === 0  
          ? <li className='tarea'><p>There are no tasks</p></li>
          : tasksProyect.map(task => (
              <Task 
                key={task.id}
                task={task}
              />
          ))
        }
        <button
        type='button'
        className='btn btn-primario'
        onClick={() => deleteProyect(proyect[0]._id)}
      > Delete Proyect &times; </button>
      </ul>
    </Fragment>
  );
}
 
export default ListTask;