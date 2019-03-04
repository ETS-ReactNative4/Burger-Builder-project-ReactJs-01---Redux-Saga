import React from 'react'
import CssCheckoutSum from './CheckoutSummery.module.css'
import Burger from '../../Burger/Burger'
import Button from  '../../UI/Button/Button'

const CheckoutSummery=(props)=>{
    return(
        <div className={CssCheckoutSum.CheckoutSummery}>
            <h1>We hope it tastes well !</h1>
            <div style={{width:'100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancle}>Cancel</Button>
            <Button btnType="Success" clicked={props.checkoutContinue}>Continue</Button>
        </div>
    );
};

export default CheckoutSummery;
