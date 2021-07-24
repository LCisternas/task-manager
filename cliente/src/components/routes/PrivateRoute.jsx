/* Component that privatizes the routes */
/* With this only authenticated user can access certain routes */
/* Dependencies */
import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../context/auth/authContext';
/* Component */
const PrivateRoute = ({ component: Component, ...props }) => {

  /* Use Context AuthState */
  const authsContext = useContext(authContext);
  const { authenticated, userAuthenticated, charging } = authsContext;

  useEffect(() => {
    /* Authentication user */
    userAuthenticated()
  }, [])

  return (
    <Route 
      { ...props }
      render={ props => !authenticated && !charging ? (
        <Redirect  to='/' />
        ) : (
          <Component {...props} />
        ) 
      }
    />
  );
};
 
export default PrivateRoute;