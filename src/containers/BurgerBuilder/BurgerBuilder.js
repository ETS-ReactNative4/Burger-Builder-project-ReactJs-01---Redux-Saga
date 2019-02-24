import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'



const INGREDIENT_PRICES={
    salat:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
};
class BurgerBuilder extends Component{
    state={
        ingredients:{
            salat:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice:2,
        purchasable:false,
        purchasing:false,
    };
    updatePurchaseState(UpdatedIngredients){
        const sum=Object.keys(UpdatedIngredients).map(igKey=>{
                    return UpdatedIngredients[igKey];
        }).reduce((accumulator, elem)=>{return accumulator+elem}, 0);
        console.log('sum:'+sum);
        this.setState({purchasable:sum>0});
    }
    purchsingHandler=()=>{
        this.setState({ purchasing:true});
    }
    addIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        const UpdateCounted=oldCount+1;
        const UpdatedIngredients={...this.state.ingredients};
        UpdatedIngredients[type]=UpdateCounted;

        const priceAddition=INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice+priceAddition;

        this.setState({totalPrice:newPrice, ingredients:UpdatedIngredients});
        this.updatePurchaseState(UpdatedIngredients);
    };
    removeIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        if(oldCount<=0){return;}
        const UpdateCounted=oldCount-1;
        const UpdatedIngredients={...this.state.ingredients};
        UpdatedIngredients[type]=UpdateCounted;

        const priceDeduction=INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice-priceDeduction;

        this.setState({totalPrice:newPrice, ingredients:UpdatedIngredients});
        this.updatePurchaseState(UpdatedIngredients);
    };
    render(){
        const disabledInfo={...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }
        console.log(disabledInfo);
        return(
            <Aux>
                <Modal show={this.state.purchasing}>
                    <OrderSummery ingredients={this.state.ingredients}/>
                </Modal>

                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredientAdder={this.addIngredientHandler}
                               ingredientRemover={this.removeIngredientHandler}
                               disabled={disabledInfo}
                               price={this.state.totalPrice}
                               purchasable={this.state.purchasable}
                               purchasing={this.purchsingHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;

