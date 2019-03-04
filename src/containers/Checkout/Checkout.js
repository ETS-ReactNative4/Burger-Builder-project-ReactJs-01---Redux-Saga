import React, {Component} from 'react'
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery'

class Checkout extends Component{
    state={
        ingredients:{
            salat:1,
            meat:1,
            cheese:1,
            bacon:1
        }
    }
    componentDidMount() {
        const query=new URLSearchParams(this.props.location.search);
        const ingredients={};

        console.log(this.props.location.search)
        console.log('query: '+query);
        console.log(query.entries());

        for(let param of query.entries()){
            console.log('param:'+param)
            ingredients[param[0]]=+param[1]; //turning each of 4 param arraies of form ['cheese', '2'] into object one ingredient object of form  {cheese:2, meat:1..}
        }
        console.log(ingredients);
        this.setState({ingredients:ingredients});
    }

    checkoutCancleHandler=()=>{
        this.props.history.goBack();
    }
    checkoutContinueHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return(
            <div>
                <CheckoutSummery ingredients={this.state.ingredients}
                                 checkoutCancle={this.checkoutCancleHandler}
                                 checkoutContinue={this.checkoutContinueHandler} />
            </div>
        );
    }

}

export default Checkout;
