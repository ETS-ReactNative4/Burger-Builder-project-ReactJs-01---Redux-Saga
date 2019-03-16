import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'


export const addIngredients=(ingredientName)=>{
    return {type:actionTypes.ADD_INGREDIENT, ingredientName:ingredientName}
};



export const removeIngredients=(ingredientName)=>{
    return {type:actionTypes.REMOVE_INGREDIENT, ingredientName:ingredientName}
};



export const asyn_initIngredients=()=>{
    return (dispatch)=>{
        axios.get('ingredients.json').then(response=>{
            dispatch(setIngredients(response.data));
        }).catch(error=>{
            dispatch(fetchIngredientsFails());
        });
    };
};
export const setIngredients=(ingredients)=>{
    return {type:actionTypes.SET_INGREDIENTS, ingredients:ingredients}
};
export const fetchIngredientsFails=()=>{
    return {type:actionTypes.FETCH_INGREDIENTS_FAIL}
};


