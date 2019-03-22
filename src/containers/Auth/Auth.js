import React, {Component} from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import CssAuth from './Auth.module.css'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/exportAllActions'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class Auth extends Component {
    state={
        controls:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup:true
    }

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath!=='/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity=(value, rules)=>{
        let isValid=true;

        if(!rules){ // so thah the validation checking operation does not fail. for in case we don;t have the "validation" property in any orderForm item. such as "delivaryMethod"
            isValid=true;
        }

        if(rules.required){
            isValid= value.trim() !=='' && isValid; //isValid is only true when the "value" is not empty
        }

        if(rules.minLength){
            isValid= value.length >= rules.minLength && isValid;
        }

        return isValid;
    };

    inputChangeHandler=(event, ControlName)=>{

        const updatedControls={
            ...this.state.controls,
            [ControlName]:{
                ...this.state.controls[ControlName],
                value:event.target.value,
                valid:this.checkValidity(event.target.value, this.state.controls[ControlName].validation),
                touched:true
            }
        };

        this.setState({controls:updatedControls})
    };
    eventPrevent=(event)=>{
        event.preventDefault();
    }
    onSubmitHandler=(event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }
    switchAuthModeHandler=()=>{
        this.setState(prevState=>{
            return {isSignup:!prevState.isSignup};
        });
    }

    render(){

        const formElementArray=[];
        for(let key in this.state.controls){
            formElementArray.push({id:key, config:this.state.controls[key]});
        }

        let form=formElementArray.map(formElem=>{
            return <Input key={formElem.id}
                          elementType={formElem.config.elementType}
                          elementConfig={formElem.config.elementConfig}
                          value={formElem.config.value}
                          invalid={!formElem.config.valid}
                          shouldValidate={formElem.config.validation}
                          touched={formElem.config.touched}
                          changed={(event)=>this.inputChangeHandler(event, formElem.id)}/>
        });

        if(this.props.loading){
            form=<Spinner/>;
        }
        if(this.props.isAuthenticated){
            form=<Redirect to={this.props.authRedirectPath}/>
        }

        let errorMessage=null;
        if(this.props.error){
            errorMessage=(<p>{this.props.error.message}</p>);
        }

        return (
            <div className={CssAuth.Auth}>
                {errorMessage}
                <form onSubmit={this.eventPrevent}>
                    {form}
                    <Button btnType="Success" clicked={this.onSubmitHandler}>Submit</Button>
                    <Button btnType="Danger" clicked={this.switchAuthModeHandler}>Switch to {this.state.isSignup? 'SIGN-IN':'SIGN-UP'}</Button>
                </form>
            </div>
        );
    }
}

const mapPropsToState=state=>{
    return {
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token !== null,
        buildingBurger:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath
    }
};
const mapDispatchToProps=dispatch=>{
  return {
      onAuth:(email, password, isSignup)=>dispatch(actions.auth(email, password, isSignup)),
      onSetAuthRedirectPath:()=>dispatch(actions.setAuthRedirectPath('/'))
  }
};

export default connect(mapPropsToState, mapDispatchToProps)(Auth);
