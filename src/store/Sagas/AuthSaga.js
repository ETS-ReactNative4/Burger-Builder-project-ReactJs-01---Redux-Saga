import {put, delay, call} from 'redux-saga/effects'
import * as actionTypes from "../actions/actionTypes";
import * as authActions from "../actions/authActions";
import * as actions from './rootSaga'
import axios from "axios";





export function* logoutSaga(action){  //"function*" is a next gen js function type called "Generator" which can run incrementally means we can pause it in between an execution and allow any asyn task to finish.
    yield localStorage.removeItem('token'); //"yield" is optional for this ide. It makes the execution continue only when it's step is done. useful for asyn operations
    //yield localStorage.removeItem('localId');
    yield call([localStorage, "removeItem"], "localId");
    //yield localStorage.removeItem('expirationDate');
    yield call([localStorage, "removeItem"], "expirationDate");

    yield put({type:actionTypes.AUTH_LOGOUT})//"put()" dispatches new action
};

export function* checkAuthTimeoutSaga(action){ //we have access to "action" because it sits in between action creator and reducer
    yield delay(action.expirationTime * 1000); //"delay(miliseconds)" function executes the "put()" after a given time which is here the "expirationTime"

    yield put(authActions.logOut());
};

export function* authSaga(action){

    yield put(authActions.authStart());

    const authData={
        email:action.email,
        password:action.password,
        returnSecureToken:true
    };

    let url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDy42Gunqos9Mb7IJQxDwbXx0EEY5ABDDU';
    if(!action.isSignup){
        url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDy42Gunqos9Mb7IJQxDwbXx0EEY5ABDDU';
    }

    try {
        const response = yield axios.post(url, authData); // because of using "yield" we don't need the then() and catch() promise handler here. Without "yield" this method would have returned a promise but because of "yield" now the method "axios.post()" will wait until the promise is resolved or reject and then return whatever the result is. which will be stored than in the "response" variable
        //.then(response=>{
        // console.log(response);

        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('localId', response.data.localId);

        const expirationDate=new Date(new Date().getTime()+response.data.expiresIn*1000); //converting the token expiration time in to the time of current date so we get the time of the token expiration in current date
        localStorage.setItem('expirationDate', expirationDate);

        yield put(authActions.authSuccess(response.data.idToken, response.data.localId));
        yield put(authActions.checkAuthTimeout(response.data.expiresIn));
    }catch (error) {
        yield put(authActions.authFail(error.response.data.error));
    }
       // }).catch(error=>{
        //return dispatch(authFail(error.response.data.error));
   // })
};

export function* authCheckStateSaga(action){
    const token=localStorage.getItem('token');
    if(!token){

        yield put(authActions.logOut());

    }else{

        const expirationDate=new Date(localStorage.getItem('expirationDate')); //to convert the exparitation date string into a date object
        if(expirationDate <= new Date()){

            yield put(authActions.logOut()); // because the expiration time is less than current date means already expirad

        }else{

            const localId=localStorage.getItem('localId');
            yield put(authActions.authSuccess(token, localId));

            yield put(authActions.checkAuthTimeout( (expirationDate.getTime() - new Date().getTime())/1000  ));
        }

    }
}
