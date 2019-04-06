import {takeEvery} from 'redux-saga/effects'
import {logoutSaga, checkAuthTimeoutSaga, authSaga, authCheckStateSaga} from './AuthSaga'
import * as actionType from '../actions/actionTypes'

export function* watchAuth(){
    yield takeEvery(actionType.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionType.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionType.AUTH_USER, authSaga);
    yield takeEvery(actionType.AUTH_CHECK_STATE, authCheckStateSaga);
}
