import axios from '../../axios-orders'
import {put} from 'redux-saga/effects'
import {fetchIngredientsFails, setIngredients} from "../actions/burgerBuilderActions";

export function* asyn_initIngredientsSaga(action){

    try{
        const response=yield axios.get('ingredients.json');

        yield put(setIngredients(response.data));
    }catch(error){
        yield put(fetchIngredientsFails());
    }
}
