import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'


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
        loading:false,
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
    };
    purchaseCancelHandler=()=>{
        this.setState({ purchasing:false});
    };
    purchaseContinueHandler=()=>{
        this.setState({loading:true});
        const order={
            ingredients:this.state.ingredients,
            price:this.state.totalPrice,
            delivaryMethod:'fastest',
            customer:{
                name:'Aman',
                address:{
                    street:'Hirschberger Str. 64',
                    zipcode:53119,
                    country:'Germany'
                },
                email:'test.com'
            }
        };

       axios.post('/BurgerOrders.json', order).
        then((res)=>{
            console.log(res);
            this.setState({loading:true, purchasing:false});
        }).catch(error=>{
            console.log(error);
            this.setState({loading:true, purchasing:false});
        });
    };
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

        let orderSummery= <OrderSummery ingredients={this.state.ingredients}
                                        purchaseCancel={this.purchaseCancelHandler}
                                        purchaseContinue={this.purchaseContinueHandler}
                                        price={this.state.totalPrice}/>;

        if(this.state.loading){
            orderSummery=<Spinner/>;
        }
        console.log(disabledInfo);
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
                    {orderSummery}
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

