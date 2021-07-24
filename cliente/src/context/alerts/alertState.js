/* Set alerts */
/* Dependencies */
import React, { useReducer } from 'react';
import alertReducer from './alertReducer';
import alertContext from './alertContext';
import { SHOW_ALERT, HIDDEN_ALERT } from '../../types';
/* Component */
const AlertState = props => {

  const initialState = {
    alert: null
  }

  const [state, dispatch] = useReducer(alertReducer, initialState)

  /*** FUNCTIONS ***/
  /* Display alert on the screen */
  const showAlert = ( msg, category ) => {
    dispatch({
      type: SHOW_ALERT,
      payload: {
        msg, 
        category
      }
    })

    setTimeout(() => {
      dispatch({
        type: HIDDEN_ALERT
      })
    }, 5000)
  }

  return (
    <alertContext.Provider
      value={{
        alert: state.alert,
        showAlert
      }}
    >
      { props.children }
    </alertContext.Provider>
  )

}

export default AlertState