import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import AppointmentActions from '../Redux/AppointmentRedux'

export function * getAppointments (api, action) {
  const { token } = action
  // make the call to the api
  const response = yield call(api.get_apoointments, token)

  if (response.ok) {
    yield put(AppointmentActions.appointmentSuccess(response.data.allAppointment))
  } else {
    //console.tron.log(response);
    if(response.status == 401){
      yield put(AppointmentActions.appointmentFailure(response.data))
    }else{
      yield put(AppointmentActions.appointmentFailure(response.status))
    }
  }
}