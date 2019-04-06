import * as actionTypes from './actionTypes'
import axios from 'axios'



export const auth=(email, password, isSignup)=>{
  return {type:actionTypes.AUTH_USER, email:email, password:password, isSignup:isSignup}
};

export const authStart=()=>{
    return {type:actionTypes.AUTH_START}
};

export const authSuccess=(idToken, localId)=>{
    return {type:actionTypes.AUTH_SUCCESS, idToken:idToken, localId:localId}
};

export const authFail=(error)=>{
    return {type:actionTypes.AUTH_FAIL, error:error};
};



export const checkAuthTimeout=(expirationTime)=>{
   return {type:actionTypes.AUTH_CHECK_TIMEOUT, expirationTime:expirationTime};
};
export const logOut=()=>{
    //localStorage.removeItem('token');
    //localStorage.removeItem('localId');
    //localStorage.removeItem('expirationDate');
    return {type:actionTypes.AUTH_INITIATE_LOGOUT}
};


export const setAuthRedirectPath=(path)=>{
   return {type:actionTypes.SET_AUTH_REDIRECT_PATH, path:path}
};

export const authCheckState=()=>{
    return {type:actionTypes.AUTH_CHECK_STATE};
};
