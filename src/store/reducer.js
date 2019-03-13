import * as actionType from './actions'

const initialState={
    ingredients:{
        salat:0,
        cheese:0,
        meat:0,
        bacon:0
    },
    totalPrice:2,
};

const INGREDIENT_PRICES={
    salat:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
};

const reducer=(state=initialState, action)=>{
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
        default:
            return state;
    }
};

export default reducer;
