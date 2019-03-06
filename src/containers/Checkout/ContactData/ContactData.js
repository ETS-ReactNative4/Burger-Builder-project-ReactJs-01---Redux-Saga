import React, {Component} from 'react'
import CssContactData from './ContactData.module.css'
import axios from '../../../axios-orders'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'


class ContactData extends Component{
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false,

    };
    onOrderHandler=(event)=>{
        event.preventDefault();//to prevent the page reload upon clicking submit button inside the form

        this.setState({loading:true});

       const order={
           ingredients:this.props.ingredients,
           price:this.props.price,
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
           this.setState({loading:false});
           this.props.history.push('/');
       }).catch(error=>{
           console.log(error);
           this.setState({loading:false});
       });

    }
    render(){
        let form=(
            <form>
                <input className={CssContactData.Input} type="text" name="name" placeholder="Your Name"/>
                <input className={CssContactData.Input} type="email" name="email" placeholder="Your Mail"/>
                <input className={CssContactData.Input} type="text" name="Street" placeholder="Street"/>
                <input className={CssContactData.Input} type="text" name="postal" placeholder="Postal Code"/>
                <Button btnType="Success" clicked={this.onOrderHandler}>Order</Button>
            </form>
            );
        if(this.state.loading){
            form=<Spinner/>;
        }
        return(
            <div className={CssContactData.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;
