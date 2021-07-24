/* Component that render each if the user's proyects */
/* Dependencies */
import React, { useContext } from 'react'
import proyectContext from '../../context/proyects/proyectContext';
import taskContext from '../../context/tasks/taskContext';

const Proyect = ({ proyect }) => {

  /* Use Context ProyectState */
  const proyectsContext = useContext(proyectContext);
  const { actualProyect } = proyectsContext;
  /* Use Context TaskState */
  const tasksContext = useContext(taskContext)
  const { getTasksByProyect } = tasksContext
  /* Function onClick Event. Get id of the proyect and show tasks */
  const onClickProyect = (id) => {
    getTasksByProyect(id)
    actualProyect(id)
  }

  return (
    <li>
      <button
        type='button'
        className='btn btn-blank'
        onClick={() => onClickProyect(proyect.id)}
      > {proyect.name} </button>
    </li>
  );
};
 
export default Proyect;