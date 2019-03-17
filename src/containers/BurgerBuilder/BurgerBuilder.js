import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler'
import {connect} from 'react-redux'
import * as Actions from '../../store/actions/exportAllActions'


/*const INGREDIENT_PRICES={
    salat:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
};*/
class BurgerBuilder extends Component{
    state={
        //ingredients:null,
        //totalPrice:2,
        //loading:false,
        //error:false,
        purchasable:false,
        purchasing:false,

    };
    componentDidMount() {
       /* axios.get('https://react-burger-buider.firebaseio.com/ingredients.json').then(response=>{
                this.setState({ingredients:response.data});
        }).catch(error=>{
                this.setState({error:true});
        }); */
       this.props.onInitIngredients();
    }

    /*addIngredientHandler=(type)=>{
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
    };*/

    purchaseContinueHandler=()=>{
        /* const queryParam=[];
         for(let i in this.state.ingredients){
             queryParam.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
         }

         queryParam.push('price'+'='+this.state.totalPrice);

         console.log('queryParam: '+queryParam);
         const queryString=queryParam.join('&');
         console.log('queryParam: '+queryParam);

         this.props.history.push({
             pathname:'/checkout',
             search:'?'+queryString,
         });
         console.log('queryParam &: '+queryParam.join('&')); */
        this.props.onInitPurchase();
        this.props.history.push({pathname:'/checkout'});// after adding Redux to this app we didnt need to send the ingredients as query paramitter so we do this
    };

    updatePurchaseState(UpdatedIngredients){
        const sum=Object.keys(UpdatedIngredients).map(igKey=>{
                    return UpdatedIngredients[igKey];
        }).reduce((accumulator, elem)=>{return accumulator+elem}, 0);
        console.log('sum:'+sum);
        //this.setState({purchasable:sum>0});
        return sum>0;
    }
    purchsingHandler=()=>{
        this.setState({ purchasing:true});
    };
    purchaseCancelHandler=()=>{
        this.setState({ purchasing:false});
    };


    render(){
        const disabledInfo={...this.props.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }

        let orderSummery=null;

        let burger_buildControl=this.props.error? <p>Ingredients can't be loaded</p> : <Spinner/>;

        if(this.props.ingredients){
            burger_buildControl=<Aux>
                                    <Burger ingredients={this.props.ingredients}/>
                                    <BuildControls ingredientAdder={this.props.onIngredientAdd}
                                                   ingredientRemover={this.props.onIngredientRemove}
                                                   disabled={disabledInfo}
                                                   price={this.props.totalPrice}
                                                   purchasable={this.updatePurchaseState(this.props.ingredients)}
                                                   purchasing={this.purchsingHandler}/>
                                    </Aux>;

            orderSummery= <OrderSummery ingredients={this.props.ingredients}
                                        purchaseCancel={this.purchaseCancelHandler}
                                        purchaseContinue={this.purchaseContinueHandler}
                                        price={this.props.totalPrice}/>;
        }

       // if(this.state.loading){
         //   orderSummery=<Spinner/>;
        //}

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
                    {orderSummery}
                </Modal>

                {burger_buildControl}
            </Aux>
        );
    }
}

const mapStateToProps=state=>{
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
};

const mapDispatchToProps=dispatch=>{
    return {
        onIngredientAdd:(ingredientName)=>dispatch(Actions.addIngredients(ingredientName)),
        onIngredientRemove:(ingredientName)=>dispatch(Actions.removeIngredients(ingredientName)),
        onInitIngredients:()=>{dispatch(Actions.asyn_initIngredients())},
        onInitPurchase:()=>dispatch(Actions.purchaseInit())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, axios));

