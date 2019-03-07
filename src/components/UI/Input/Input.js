import React from  'react'
import CssInput from './Input.module.css'

const Input=(props)=>{
    let inputElement=null;

    switch(props.elementType){
        case('input'):
            inputElement=<input className={CssInput.InputElement} {...props.elementConfig} value={props.value}/>;
            break;
        case('textarea'):
            inputElement=<textarea className={CssInput.InputElement} {...props.elementConfig}  value={props.value}/>;
            break;
        default:
            inputElement=<input className={CssInput.InputElement} {...props.elementConfig}  value={props.value}/>;
    }

    return(
        <div className={CssInput.Input}>
            <label className={CssInput.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
};

export default Input;
