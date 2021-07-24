/* Component Bar in the "/proyects" */
/* Dependencies */
import React, { useContext, useEffect } from 'react'
import authContext from '../../context/auth/authContext';

/* Component */
const Bar = () => {

  /* Use Context AuthState */
  const authsContext = useContext(authContext);
  const { user, userAuthenticated, logOut } = authsContext

  useEffect(() => {
    /* Verify the authentication every time the page reloads */
    userAuthenticated()
    // eslint-disable-next-line
  }, [])

  return (
    <header className='app-header'>
      {/* Show user info in de Bar */}
      {
        user ? (
          <p className='nombre-usuario'>
            Hola <span>{ user.name }</span>
          </p>
        ) : null
      }
      <nav className='nav-principal'>
        <button
          type='button'
          className='btn btn-blank cerrar-sesion'
          onClick={() => logOut()}
        > Log out </button>
      </nav>
    </header>
  );
};
 
export default Bar;