import * as actionTypes from './actionTypes';




export const addIngredients=(ingredientName)=>{
    return {type:actionTypes.ADD_INGREDIENT, ingredientName:ingredientName}
};



export const removeIngredients=(ingredientName)=>{
    return {type:actionTypes.REMOVE_INGREDIENT, ingredientName:ingredientName}
};



export const asyn_initIngredients=()=>{
    return {type:actionTypes.INIT_INGREDIENTS};
};
export const setIngredients=(ingredients)=>{
    return {type:actionTypes.SET_INGREDIENTS, ingredients:ingredients}
};
export const fetchIngredientsFails=()=>{
    return {type:actionTypes.FETCH_INGREDIENTS_FAIL}
};


