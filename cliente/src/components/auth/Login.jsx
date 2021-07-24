/* Login View */
/* Dependecies */
import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
/* Context */
import alertContext from '../../context/alerts/alertContext'
import authContext from '../../context/auth/authContext'

/* Component */
const Login = (props) => {

  /* Use Context AlertState */
  const alertsContext = useContext(alertContext);
  const { alert, showAlert } = alertsContext;
  /* Use Context AuthState */
  const authsContext = useContext(authContext);
  const { logIn, msg, authenticated } = authsContext;

  useEffect(() => {
    /* Check authentication and redirect */
    if(authenticated) {
      props.history.push('/proyects')
    }
    /* Check if there are authentication errors, if there are, it show them */
    if(msg) {
      showAlert(msg.msg, msg.category)
    }
  }, [authenticated, msg, props.history])

  /* Local State */
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  /* Destructuring */
  const { email, password } = user
  /* onChange event function */
  const onChange = e => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }
  /* onSubmit event function */
  const onSubmit = e => {
    e.preventDefault()
    /* Simple Validation */
    if(email.trim() === '' || password.trim() === '') {
      showAlert('All fields are required', 'alerta-error')
    }
    /* AuthState function, send the data validate if the user exist, and check password for this user */
    logIn({ email, password })
  }

  return (
    <div className='form-usuario'>
      {
        alert ? (
          <div className={`alerta ${alert.category}`}>
            {alert.msg}
          </div>
        ) : null
      }
      <h1 className='title-login'>Task Manager</h1>
      <div className='contenedor-form sombra-dark'>
        <h1>¡Welcome!</h1>
        <form onSubmit={onSubmit}>
          <div className='campo-form'>
            <label htmlFor='email'>Email</label>
            <input 
              type='email'
              id='email'
              name='email'
              value={email}
              placeholder='Your email'
              onChange={onChange}
            />
          </div>
          <div className='campo-form'>
            <label htmlFor='password'>Password</label>
            <input 
              type='password'
              id='password'
              name='password'
              value={password}
              placeholder='Your password'
              onChange={onChange}
            />
          </div>
          <div className='campo-form'>
            <button
              type='submit'
              className='btn btn-primario btn-block'
            > Log In </button>
          </div>
        </form>
        <Link to='/new-account' className='enlace-cuenta'>
          You do not have an account?
        </Link>
      </div>
    </div>
  );
};
 
export default Login;