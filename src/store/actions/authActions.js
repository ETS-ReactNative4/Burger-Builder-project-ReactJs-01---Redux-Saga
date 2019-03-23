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

              localStorage.setItem('token', response.data.idToken);
              localStorage.setItem('localId', response.data.localId);

              const expirationDate=new Date(new Date().getTime()+response.data.expiresIn*1000); //converting the token expiration time in to the time of current date so we get the time of the token expiration in current date
              localStorage.setItem('expirationDate', expirationDate);

              dispatch(authSuccess(response.data.idToken, response.data.localId));
              dispatch(checkAuthTimeout(response.data.expiresIn));
          }).catch(error=>{
              console.log(error.response);
              return dispatch(authFail(error.response.data.error));
      })
  }
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
    return (dispatch)=>{
        setTimeout(()=>{ dispatch(logOut()) }, expirationTime*1000);
    }
};
export const logOut=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('localId');
    localStorage.removeItem('expirationDate');
    return {type:actionTypes.AUTH_LOGOUT}
};


export const setAuthRedirectPath=(path)=>{
   return {type:actionTypes.SET_AUTH_REDIRECT_PATH, path:path}
};

export const authCheckState=()=>{
    return (dispatch)=>{
        const token=localStorage.getItem('token');
        if(!token){

            dispatch(logOut());

        }else{

            const expirationDate=new Date(localStorage.getItem('expirationDate')); //to convert the exparitation date string into a date object
            if(expirationDate <= new Date()){

                dispatch(logOut()); // because the expiration time is less than current date means already expirad

            }else{

                const localId=localStorage.getItem('localId');
                dispatch(authSuccess(token, localId));

                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime())/1000  ));
            }

        }
    };
};
