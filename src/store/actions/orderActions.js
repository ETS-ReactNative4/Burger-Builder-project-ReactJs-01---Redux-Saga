import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'



export const purchaseBurgerStart=()=>{
    return {type:actionTypes.PURCHASE_BURGER_START}
}


export const purchaseBurger=(orderData, token)=>{
    return (dispatch)=>{

        dispatch(purchaseBurgerStart());

        axios.post('/BurgerOrders.json?auth='+token, orderData).
        then((res)=>{
            console.log(res.data);
            dispatch(purchaseBurgerSuccess(res.data.name, orderData));

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


export const purchaseInit=()=>{
    return {type:actionTypes.PURCHASE_INIT}
};




export const fetchOrders=(token)=>{
    return (dispatch)=>{
        dispatch(fetchOrdersStart());

        axios.get('/BurgerOrders.json?auth='+token).then( res=>{
            const fetchOrders=[]
            for(let key in res.data){

                fetchOrders.push({
                    ...res.data[key], //distributing the object and adding a new property of "id"
                    id:key,
                });
            }
            dispatch(fetchOrdersSuccess(fetchOrders));

        }).catch( err=>{
           dispatch(fetchOrdersFail(err));
        })
    };
};
export const fetchOrdersStart=()=>{
  return {type:actionTypes.FETCH_ORDERS_START}
};
export const fetchOrdersSuccess=(orders)=>{
   return {type:actionTypes.FETCH_ORDERS_SUCCESS, orders:orders};
};
export const fetchOrdersFail=(error)=>{
    return {type:actionTypes.FETCH_ORDERS_FAIL, error:error};
};

