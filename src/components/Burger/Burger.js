import React from 'react'
import {withRouter} from "react-router-dom";
import CssBurger from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger=(props)=>{

    let transformedIngredients=Object.keys(props.ingredients).map((igKey)=>{
        //[...Array()]an empty array with the given numebrs of empty elements[]
        return[...Array(props.ingredients[igKey])].map((elem, index)=>{
            return <BurgerIngredient key={igKey+index} type={igKey}/>;
        })
    }).reduce((accumulator, elem)=>{return accumulator.concat(elem)}, []);//it runs through all the elements of the array and addthems to the initial value "[]" of an empry array
    //console.log(transformedIngredients);

    if(transformedIngredients.length===0){
        transformedIngredients=<p>Please start to add ingredients</p>
    }

  return(
      <div className={CssBurger.Burger}>
          <BurgerIngredient type="bread-top"/>
          {transformedIngredients}
          <BurgerIngredient type="bread-bottom"/>
      </div>
  );
};

export default withRouter(Burger);
