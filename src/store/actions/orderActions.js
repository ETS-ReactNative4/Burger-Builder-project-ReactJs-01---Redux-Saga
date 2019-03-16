import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'



export const purchaseBurgerStart=()=>{
    return {type:actionTypes.PURCHASE_BURGER_START}
}


export const purchaseBurger=(orderData)=>{
    return (dispatch)=>{

        dispatch(purchaseBurgerStart());

        axios.post('/BurgerOrders.json', orderData).
        then((res)=>{
            console.log(res.data);
            dispatch(purchaseBurgerSuccess(res.data, orderData));

        }).catch(error=>{
            dispatch(purchaseBurgerFail(error))
        });
    }
}
export const purchaseBurgerSuccess=(id, orderData)=>{
    return {type:actionTypes.PURCHASE_BURGER_SUCCESS, orderId:id, orderData:orderData}
};
export const purchaseBurgerFail=(error)=>{
    return {type:actionTypes.PURSHASE_BURGER_FAIL, error:error}
};

