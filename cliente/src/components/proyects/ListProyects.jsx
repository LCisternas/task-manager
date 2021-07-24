/* List all user proyects */
/* Dependencies */
import React, { useContext, useEffect } from 'react'
import Proyect from './Proyect';
import proyectContext from '../../context/proyects/proyectContext';
/* Component */
const ListProyects = () => {

  /* Get proyect from proyectState  */
  const proyectsContext = useContext(proyectContext)
  const { proyects, getProyects } = proyectsContext

  useEffect(() => {
    getProyects();
    //eslint-disable-next-line
  }, [])

  /* Simple Validation */
  if(proyects.length === 0) {
    return <h2 className='proyectos'>No proyects created</h2>
  }

  return (
    <ul className='listado-proyectos'>
      {proyects.map(proyect => (
        <Proyect 
          key={proyect.id}
          proyect={proyect}
        />
      ))}      
    </ul>
  );
};
 
export default ListProyects;