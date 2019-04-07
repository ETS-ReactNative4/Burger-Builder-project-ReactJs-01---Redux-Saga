import {takeEvery, takeLatest, all} from 'redux-saga/effects'
import {logoutSaga, checkAuthTimeoutSaga, authSaga, authCheckStateSaga} from './AuthSaga'
import {asyn_initIngredientsSaga} from './BurgerBuilderSaga'
import {purchaseBurgerSaga, fetchOrdersSaga} from './OrderSaga'
import * as actionType from '../actions/actionTypes'

export function* watchAuth(){
    yield takeEvery(actionType.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionType.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionType.AUTH_USER, authSaga);
    yield takeEvery(actionType.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder(){
    yield takeEvery(actionType.INIT_INGREDIENTS, asyn_initIngredientsSaga);
}

export function* watchOrder(){
    yield all([ // a way of combining all takeEvery() calls
        takeLatest(actionType.PURCHASE_BURGER, purchaseBurgerSaga), //"takeLatest()" considers the last calls of actionType "PURCHASE_BURGER" and executes "purchaseBurgerSaga" unlike "takeEvery()" that considers any calls
        takeEvery(actionType.FETCH_ORDERS , fetchOrdersSaga)
    ]);
}


