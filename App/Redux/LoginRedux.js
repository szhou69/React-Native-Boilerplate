import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userRequest: ['email', 'password'],
  userSuccess: ['token'],
  userFailure: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  token: null,
  fetching: null,
  error: null
})

/* ------------- Selectors ------------- */

export const AdminSelectors = {
  token: state => state.admin.token
}

/* ------------- Reducers ------------- */

// request the token for a user
export const request = (state) =>{
  return state.merge({ fetching: true, token: null, error: null })
}

// successful avatar lookup
export const success = (state, action) => {
  const { token } = action
  return state.merge({ fetching: false, token: token, error: null })
}

// failed to get the avatar
export const failure = (state) =>
  state.merge({ fetching: false, error: true, token: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_REQUEST]: request,
  [Types.USER_SUCCESS]: success,
  [Types.USER_FAILURE]: failure
})
