import React, {Component} from 'react'
import CssContactData from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button'


class ContactData extends Component{
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        }
    };
    render(){
        return(
            <div className={CssContactData.ContactData}>
                <h4>Enter your contact data</h4>
                <form>
                    <input className={CssContactData.Input} type="text" name="name" placeholder="Your Name"/>
                    <input className={CssContactData.Input} type="email" name="email" placeholder="Your Mail"/>
                    <input className={CssContactData.Input} type="text" name="Street" placeholder="Street"/>
                    <input className={CssContactData.Input} type="text" name="postal" placeholder="Postal Code"/>
                </form>
                <Button btnType="Success">Order</Button>
            </div>
        )
    }
}

export default ContactData;
