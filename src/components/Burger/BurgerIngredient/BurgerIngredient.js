import React from 'react'
import CssIngredient from './BurgerIngredient.module.css'
import PropTypes from 'prop-types'

const BurgerIngredient=(props)=>{
    let ingredient=null;

    switch(props.type){
        case('bread-bottom'):
            ingredient=<div className={CssIngredient.BreadBottom}></div>;
            break;
        case('bread-top'):
            ingredient=(
                <div className={CssIngredient.BreadTop}>
                    <div className={CssIngredient.Seeds1}></div>
                    <div className={CssIngredient.Seeds2}></div>
                </div>
            );
            break;
        case('meat'):
            ingredient=<div className={CssIngredient.Meat}></div>;
            break;
        case('cheese'):
            ingredient=<div className={CssIngredient.Cheese}></div>;
            break;
        case('salat'):
            ingredient=<div className={CssIngredient.Salad}></div>;
            break;
        case('bacon'):
            ingredient=<div className={CssIngredient.Bacon}></div>;
            break;
        default:
            ingredient=null;
    }

    return ingredient;
};

BurgerIngredient.propTypes={
    type:PropTypes.string.isRequired
};

export default BurgerIngredient;
