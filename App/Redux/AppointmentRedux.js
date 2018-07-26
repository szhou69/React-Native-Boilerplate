import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  appointmentRequest: ['token'],
  appointmentSuccess: ['data'],
  appointmentFailure: ['error_message'],
})

export const AppointmentTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  error: null
})

/* ------------- Selectors ------------- */

export const AppointmentSelectors = {
  data: state => state.data
}

/* ------------- Reducers ------------- */

// request the token for a user
export const request = (state) =>{
  return state.merge({ data: null, error: null })
}

export const success = (state, action) => {
  const { data } = action
  return state.merge({ data: data, error: null })
}

export const failure = (state, action) => {
  const {error_message} = action
  return state.merge({ data: null, error: error_message })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.APPOINTMENT_REQUEST]: request,
  [Types.APPOINTMENT_SUCCESS]: success,
  [Types.APPOINTMENT_FAILURE]: failure,
})
