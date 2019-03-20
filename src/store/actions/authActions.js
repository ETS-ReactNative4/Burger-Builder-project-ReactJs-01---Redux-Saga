import * as actionTypes from './actionTypes'
import axios from 'axios'



export const auth=(email, password, isSignup)=>{
  return (dispatch)=>{
      dispatch(authStart());

      const authData={
          email:email,
          password:password,
          returnSecureToken:true
      };

      let url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDy42Gunqos9Mb7IJQxDwbXx0EEY5ABDDU';
      if(!isSignup){
          url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDy42Gunqos9Mb7IJQxDwbXx0EEY5ABDDU';
      }
      axios.post(url, authData)
          .then(response=>{
              console.log(response);
              return dispatch(authSuccess(response.data));
          }).catch(error=>{
              console.log(error.response);
              return dispatch(authFail(error.response.data.error));
      })
  }
};

export const authStart=()=>{
    return {type:actionTypes.AUTH_START}
};

export const authSuccess=(authData)=>{
    return {type:actionTypes.AUTH_SUCCESS, authData:authData}
};

export const authFail=(error)=>{
    return {type:actionTypes.AUTH_FAIL, error:error};
};

