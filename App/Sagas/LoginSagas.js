import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import LoginActions from '../Redux/LoginRedux'

export function * getUser (api, action) {
  const { email, password } = action
  // make the call to the api
  const response = yield call(api.login, email, password)

  if (response.ok) {
    //console.tron.log("successful login:" + response.data.token);
    yield put(LoginActions.userSuccess(response.data.token))
  } else {
    yield put(LoginActions.userFailure())
  }
}