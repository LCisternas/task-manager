/* Main component route "/proyects" */
/* Dependecies */
import React, { useContext, useEffect } from 'react'
/* Components */
import Sidebar from '../layout/Sidebar';
import Bar from '../layout/Bar';
import FormTask from '../tasks/FormTask';
import ListTask from '../tasks/ListTask';
import authContext from '../../context/auth/authContext';
/* Component */
const Proyects = () => {

  /* Use Context AuthState */
  const authsContext = useContext(authContext);
  const { userAuthenticated } = authsContext;

  /* Verify authenticated every time page reload */
  useEffect(() => {
    userAuthenticated();
  }, [])

  return (
    <div className='contenedor-app'>
      <Sidebar />
      <div className="seccion-principal">
        <Bar />  
        <main>
          <FormTask />
          <div className='contenedor-tareas'>
            <ListTask />
          </div>
        </main>
      </div>
    </div>
  );
};
 
export default Proyects;