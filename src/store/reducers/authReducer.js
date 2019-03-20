import * as actionType from '../actions/actionTypes'
import {updateObject} from "../utility";

const initialState={
    token:null,
    userId:null,
    error:null,
    loading:false
};

const reducer=(state=initialState, action)=>{
    switch(action.type){
        case actionType.AUTH_START:
            return updateObject(state, {error:null, loading:true});
        case actionType.AUTH_SUCCESS:
            return {
                ...state,
                token:action.authData.idToken,
                userId:action.authData.localId,
                error:null,
                loading:false
            };
        case actionType.AUTH_FAIL:
            return {
                ...state,
                error:action.error,
                loading:false
            };
        default:
            return state;
    }
};

export default reducer;
