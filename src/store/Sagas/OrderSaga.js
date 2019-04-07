import axios from '../../axios-orders'
import {put} from 'redux-saga/effects'
import * as orderActions from "../actions/orderActions";



export function* purchaseBurgerSaga(action){

    yield put(orderActions.purchaseBurgerStart());

    try {
        const response=yield  axios.post('/BurgerOrders.json?auth='+action.token, action.orderData);

        yield put(orderActions.purchaseBurgerSuccess(response.data.name, action.orderData));

    }catch(error){
        yield put(orderActions.purchaseBurgerFail(error));
    }
};


export function* fetchOrdersSaga(action){

    yield put(orderActions.fetchOrdersStart());

    try {
        const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
        const response = yield axios.get('/BurgerOrders.json'+queryParams);

        const fetchOrders=[];
        for(let key in response.data){

            fetchOrders.push({
                ...response.data[key], //distributing the object and adding a new property of "id"
                id:key,
            });
        }
        yield put(orderActions.fetchOrdersSuccess(fetchOrders));

    }catch(error){
        yield put(orderActions.fetchOrdersFail(error));
    }
}
