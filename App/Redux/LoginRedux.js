import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userRequest: ['email', 'password'],
  userSuccess: ['token'],
  userFailure: ['error_message'],
  logout: null,
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

export const logout = (state) => INITIAL_STATE

// failed to get the avatar
export const failure = (state, action) => {
  const {error_message} = action
  return state.merge({ fetching: false, error: error_message, token: null })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_REQUEST]: request,
  [Types.USER_SUCCESS]: success,
  [Types.USER_FAILURE]: failure,
  [Types.LOGOUT]: logout,
})
