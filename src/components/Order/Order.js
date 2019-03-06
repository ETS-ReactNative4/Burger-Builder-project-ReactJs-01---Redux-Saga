import React from 'react'
import CssOrder from './Order.module.css'

const Order =(props)=>{

    const ingredients=[];
    for(let ingredientsName in props.ingredients){ //alternative to "Burger.js" ingredient object to array transforming super complex method
        ingredients.push( {name:ingredientsName, amount:props.ingredients[ingredientsName]} );
    }

    const ingredientOutput=ingredients.map( igkey=>{
        return <span style={{
                            textTransform:'capitalize',
                            display:'inline-block',
                            margin:'0 8px',
                            border:'1px solid #ccc',
                            padding:'5px'}} key={igkey.name}> {igkey.name}:{igkey.amount} </span>
    })

    return(
        <div className={CssOrder.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price <b>$ {Number.parseFloat(props.price.toFixed(2))}</b></p>
        </div>
    );
}

export default Order;
