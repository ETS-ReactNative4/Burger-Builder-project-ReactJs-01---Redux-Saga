import * as actionType from '../actions/actionTypes'
import reducer from './authReducer'

describe('authReducer', ()=>{
   it('should return the initial state', ()=>{
       expect(reducer(undefined, {})).toEqual({
           token:null,
           userId:null,
           error:null,
           loading:false,
           authRedirectPath:'/'
       })
   });

   it('should store token upon login', ()=>{
       expect(reducer({
           token:null,
           userId:null,
           error:null,
           loading:false,
           authRedirectPath:'/'},
           {type:actionType.AUTH_SUCCESS, idToken:'some-token',localId:'some-id'})).toEqual({

                                    token:'some-token',
                                    userId:'some-id',
                                    error:null,
                                    loading:false,
                                    authRedirectPath:'/'})
   });
});
