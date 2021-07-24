/* Dependencies */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
/* Componentes */
import Login from './components/auth/Login';
import NewAccount from './components/auth/NewAccount';
import Proyects from './components/proyects/Proyects';
import PrivateRoute from './components/routes/PrivateRoute';
/* Context */
import ProyectState from './context/proyects/proyectState';
import TaskState from './context/tasks/taskState';
import AlertState from './context/alerts/alertState';
import AuthState from './context/auth/authState';
import tokenAuth from './config/tokenAuth';
/* Check token */
const token = localStorage.getItem('token');
if(token) {
  tokenAuth(token);
};

/* Main Component */
function App() {

  return (
    /* Consuming context */
    <ProyectState>
      <TaskState>
        <AlertState>
          <AuthState>
            {/* Routing Front */}
            <Router>
              <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/new-account' component={NewAccount} />
                <PrivateRoute exact path='/proyects' component={Proyects} />
              </Switch>
            </Router>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProyectState>
  );
}

export default App;
