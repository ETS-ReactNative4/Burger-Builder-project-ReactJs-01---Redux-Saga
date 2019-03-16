import * as actionType from '../actions/actionTypes'

const initialState={
    ingredients:null,
    totalPrice:2,
    loading:false,
    error:false,
};

const INGREDIENT_PRICES={
    salat:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
};

const burgerBuilderReducer=(state=initialState, action)=>{
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1 // shortcut of finding that particular ingredient using if or for loop then updating it
                },
                totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
            };
        case actionType.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
            };
        case actionType.SET_INGREDIENTS:
            return{
                ...state,
                ingredients:action.ingredients,
                error:false
            };
        case actionType.FETCH_INGREDIENTS_FAIL:
            return{
                ...state,
                error:true
            };
        default:
            return state;
    }
};

export default burgerBuilderReducer;
