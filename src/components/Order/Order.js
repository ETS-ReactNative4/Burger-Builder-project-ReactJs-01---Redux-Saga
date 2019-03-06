import React from 'react'
import CssOrder from './Order.module.css'

const Order =(props)=>(
    <div className={CssOrder.Order}>
        <p>Ingredients: Salad (1)</p>
        <p>Price <b>USD 5.45</b></p>
    </div>
);

export default Order;
