/* Conditional component to creating proyects */
/* Dependencies */
import React, { Fragment, useState, useContext } from 'react'
import proyectContext from '../../context/proyects/proyectContext'
/* Component */
const NewProyect = () => {

  /* Get state from proyectState */
  const proyectsContext = useContext(proyectContext)
  /* Destructuring state */
  const { form, showForm, addProyects, errorForm, validForm } = proyectsContext
  /* Local State */
  const [proyect, setProyect] = useState({
    name: ''
  });
  /* Destructuring */
  const { name } = proyect
  /* Function to onChange Event */
  const onChangeProyect = e => {
    setProyect({
      ...proyect,
      [e.target.name] : e.target.value
    })
  }
  /* Function to onSubmit Event */
  const onSubmitProyect = e => {
    e.preventDefault()
    /* Simple Validation */
    if(name === '') {
      validForm()
      return;
    }
    /* Add to state */
    addProyects(proyect)
    /* Reset Form */
    setProyect({
      name: ''
    })
  }

  return (
    <Fragment>
      <button
      type='button'
      className='btn btn-block btn-primario'
      onClick={() => showForm()}
    >New Proyect</button>
      {
        form ? 
        (
          <form className='formulario-nuevo-proyecto' onSubmit={onSubmitProyect}>
            <input 
              type='text'
              className='input-text'
              placeholder='Proyect Name'
              name='name'
              value={name}
              onChange={onChangeProyect}
            />
            <button
              type='submit'
              className='btn btn-primario btn-block'
            > Add Proyect </button>
          </form>
        ) : null
      }
      {errorForm ? ( <p className='mensaje error'>EMPTY INPUT</p> ) : null}
    </Fragment>
  );
};
 
export default NewProyect;