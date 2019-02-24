import React from 'react'
import Aux from '../../../hoc/Auxiliary'

const OrderSummery=(props)=>{
    const ingredientsSummmery=Object.keys(props.ingredients).map(igkey=>{
        return <li key={igkey}><span style={{textTransform:'capitalize'}}>{igkey}</span>: {props.ingredients[igkey]}</li>;
    });

    return(
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with following ingredients:</p>
                <ul>
                    {ingredientsSummmery}
                </ul>
                <p>Continue to check out ?</p>
            </Aux>
    );
};

export default OrderSummery;
