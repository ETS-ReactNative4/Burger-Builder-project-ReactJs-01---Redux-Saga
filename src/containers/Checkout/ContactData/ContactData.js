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
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
             },
             street:{
                 elementType:'input',
                 elementConfig:{
                     type:'text',
                     placeholder:'Street'
                 },
                 value:'',
                 validation:{
                     required:true
                 },
                 valid:false,
                 touched:false
             },
             zipcode:{
                 elementType:'input',
                 elementConfig:{
                     type:'text',
                     placeholder:'ZIP Code'
                 },
                 value:'',
                 validation:{
                     required:true,
                     maxLen:5,
                     minLen:5
                 },
                 valid:false,
                 touched:false
             },
             country:{
                 elementType:'input',
                 elementConfig:{
                     type:'text',
                     placeholder:'Country'
                 },
                 value:'',
                 validation:{
                     required:true
                 },
                 valid:false,
                 touched:false
             },
             email:{
                 elementType:'input',
                 elementConfig:{
                     type:'email',
                     placeholder:'Email'
                 },
                 value:'',
                 validation:{
                     required:true
                 },
                 valid:false,
                 touched:false
             },
             delivaryMethod:{
                 elementType:'select',
                 elementConfig:{
                    options:[
                        {value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'}
                        ]
                 },
                 value:'',
                 validation:{},
                 valid:true
             }
         },
         formIsValid:false,
         loading:false,
    };

    checkValidity=(value, rules)=>{
        let isValid=true;

        if(!rules){ // so thah the validation checking operation does not fail. for in case we don;t have the "validation" property in any orderForm item. such as "delivaryMethod"
            isValid=true;
        }

        if(rules.required){
            isValid= value.trim() !=='' && isValid; //isValid is only true when the "value" is not empty
        }

        if(rules.minLen){
            isValid= value.length >= rules.minLen && isValid;
        }

        if(rules.maxLen){
            isValid= value.length <= rules.maxLen && isValid;
        }

        return isValid;
    };

    inputChangeHandler=(event, ElementId)=>{
        console.log(event.target.value);
        const updatedOrderForm={...this.state.orderForm}; // only the first level object pointers are copied such as "name", "street", "email etc"
        const updatedOrderFormElement={...updatedOrderForm[ElementId]}; //deep cloning now the inner object of each object are also copied such as all the properties of "name" object

        updatedOrderFormElement.value=event.target.value;
        updatedOrderFormElement.valid=this.checkValidity(updatedOrderFormElement.value, updatedOrderFormElement.validation);
        updatedOrderFormElement.touched=true;

        //console.log(updatedOrderFormElement);
        updatedOrderForm[ElementId]=updatedOrderFormElement;

        let formIsValid=true;
        for(let inputId in  updatedOrderForm){
            formIsValid= updatedOrderForm[inputId].valid && formIsValid;
        }

        this.setState({orderForm:updatedOrderForm, formIsValid:formIsValid});
    };


    onOrderHandler=(event)=>{
        event.preventDefault();//to prevent the page reload upon clicking submit button inside the form

        this.setState({loading:true});

        const formData={};
        for(let formElementId in this.state.orderForm){
            formData[formElementId]=this.state.orderForm[formElementId].value;
        }

       const order={
           ingredients:this.props.ingredients,
           price:this.props.price,
           orderData:formData
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
        const formElementArray=[];
        for(let key in this.state.orderForm){
            formElementArray.push({id:key, config:this.state.orderForm[key]});
        }
        let form=(
            <form onSubmit={this.onOrderHandler}>
                {formElementArray.map( formElem=>{
                    return <CustomInput key={formElem.id}
                                        elementType={formElem.config.elementType}
                                        elementConfig={formElem.config.elementConfig}
                                        value={formElem.config.value}
                                        invalid={!formElem.config.valid}
                                        shouldValidate={formElem.config.validation}
                                        touched={formElem.config.touched}
                                        changed={(event)=>this.inputChangeHandler(event, formElem.id)}/>;
                })}

                <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
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
