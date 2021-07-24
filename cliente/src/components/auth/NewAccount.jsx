/* Register View */
/* Dependecies */
import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
/* Context */
import alertContext from '../../context/alerts/alertContext'
import authContext from '../../context/auth/authContext'

/* Component */
const NewAccount = (props) => {

  /* Use Context AlertState */
  const alertsContext = useContext(alertContext);
  const { alert, showAlert } = alertsContext;
  /* Use Context AuthState */
  const authsContext = useContext(authContext);
  const { userRegister, msg, authenticated } = authsContext;

  useEffect(()=> {
    /* If authenticated in the state is true, redirect */
    if(authenticated) {
      props.history.push('/proyects')
    }
    /* If authenticated is false, show errors */
    if(msg) {
      showAlert(msg.msg, msg.category)
    }
    // eslint-disable-next-line
  }, [msg, authenticated, props.history])

  /* Local State */
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  })
  /* Destructuring */
  const { name, email, password, confirm } = user
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
    /* Simple Validations */
    if(name.trim() === '' || email.trim() === '' || password.trim === '' || confirm.trim() === '') {
      showAlert('All fields are required', 'alerta-error')
      return;
    }
    if(password.length < 6) {
      showAlert('Minimum password 6 characters', 'alerta-error')
      return;
    }
    if(password !== confirm) {
      showAlert('Different passwords!', 'alerta-error')
      return;
    }
    /* End Validations */
    /* Send data to register in the DB */
    userRegister({ name, email, password })

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
        <h1>Sign Up</h1>
        <form onSubmit={onSubmit}>
          <div className='campo-form'>
            <label htmlFor='email'>Name</label>
            <input 
              type='text'
              id='name'
              name='name'
              value={name}
              placeholder='Your Name'
              onChange={onChange}
            />
          </div>
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
            <label htmlFor='confirm'>Confirm Password</label>
            <input 
              type='password'
              id='confirm'
              name='confirm'
              value={confirm}
              placeholder='Repeat your password'
              onChange={onChange}
            />
          </div>

          <div className='campo-form'>
            <button
              type='submit'
              className='btn btn-primario btn-block'
            > ¡Lets Go! </button>
          </div>
        </form>
        <Link to='/' className='enlace-cuenta'>
          Do you already have an account?
        </Link>
      </div>
    </div>
  );
};
 
export default NewAccount;