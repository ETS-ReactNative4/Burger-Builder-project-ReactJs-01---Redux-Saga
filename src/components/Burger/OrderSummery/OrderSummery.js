import React, {Component} from 'react'
import Aux from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'

class OrderSummery extends Component{


    render(){
        const ingredientsSummmery=Object.keys(this.props.ingredients).map(igkey=>{
            return <li key={igkey}><span style={{textTransform:'capitalize'}}>{igkey}</span>: {this.props.ingredients[igkey]}</li>;
        });

        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with following ingredients:</p>
                <ul>
                    {ingredientsSummmery}
                </ul>
                <p><b>Total Price: ${this.props.price.toFixed(2)}</b></p>
                <p>Continue to check out ?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancel}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>Continue</Button>
            </Aux>
        );
    }
};

export default OrderSummery;
