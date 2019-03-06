import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery'
import ContactData from './ContactData/ContactData'

class Checkout extends Component{
    state={
        ingredients:null,
        price:null,
    }
    componentWillMount() {
        const query=new URLSearchParams(this.props.location.search);
        const ingredients={};

        console.log('Search: '+this.props.location.search)
        console.log('query: '+query);
        console.log(query.entries());

        for(let param of query.entries()){
            console.log('param:'+param);
            if(param[0]==='price'){
                this.setState({price:param[1]});
            }else{
                ingredients[param[0]]=+param[1]; //turning each of 4 param arraies of form ['cheese', '2'] into object one ingredient object of form  {cheese:2, meat:1..}
            }

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
                <Route path={this.props.match.path+'/contact-data'} render={(props)=><ContactData ingredients={this.state.ingredients}
                                                                                             price={this.state.price}
                                                                                                  {...props}/>}/>
            </div>
        );
    }

}

export default Checkout;
