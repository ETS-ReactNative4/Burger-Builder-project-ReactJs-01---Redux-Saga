import React, {Component} from 'react'
import CssContactData from './ContactData.module.css'
import axios from '../../../axios-orders'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import CustomInput from '../../../components/UI/Input/Input'


class ContactData extends Component{
    state={
         orderForm:{
             name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:''
             },
             street:{
                 elementType:'input',
                 elementConfig:{
                     type:'text',
                     placeholder:'Street'
                 },
                 value:''
             },
             zipcode:{
                 elementType:'input',
                 elementConfig:{
                     type:'text',
                     placeholder:'ZIP Code'
                 },
                 value:''
             },
             country:{
                 elementType:'input',
                 elementConfig:{
                     type:'text',
                     placeholder:'Country'
                 },
                 value:''
             },
             email:{
                 elementType:'input',
                 elementConfig:{
                     type:'email',
                     placeholder:'Email'
                 },
                 value:''
             },
             delivaryMethod:{
                 elementType:'select',
                 elementConfig:{
                    options:[
                        {value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'}
                        ]
                 },
                 value:''
             }
         },

         loading:false,
    };
    onOrderHandler=(event)=>{
        event.preventDefault();//to prevent the page reload upon clicking submit button inside the form

        this.setState({loading:true});

       const order={
           ingredients:this.props.ingredients,
           price:this.props.price,
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
                <CustomInput elementType="" elementConfig="" value="" />
                <CustomInput inputtype="input" type="email" name="email" placeholder="Your Mail"/>
                <CustomInput inputtype="input" type="text" name="Street" placeholder="Street"/>
                <CustomInput inputtype="input" type="text" name="postal" placeholder="Postal Code"/>
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
