import React from  'react'
import CssInput from './Input.module.css'

const Input=(props)=>{
    let inputElement=null;
    const inputCssClasses=[CssInput.InputElement];
    let validationError = null;

    if(props.invalid && props.shouldValidate && props.touched){
        inputCssClasses.push(CssInput.Invalid);
        validationError = <p className={CssInput.ValidationError}>Please enter a valid value!</p>;
    }

    switch(props.elementType){
        case('input'):
            inputElement=<input className={inputCssClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case('textarea'):
            inputElement=<textarea className={inputCssClasses.join(' ')} {...props.elementConfig}  value={props.value} onChange={props.changed}/>;
            break;
        case('select'):
            inputElement=(
                <select className={inputCssClasses.join(' ')} value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(option=>{
                        return  <option key={option.value} value={option.value}>{option.displayValue}</option>
                    })}
                </select>
            );
            break;
        default:
            inputElement=<input className={inputCssClasses.join(' ')} {...props.elementConfig}  value={props.value} onChange={props.changed}/>;
    }

    return(
        <div className={CssInput.Input}>
            <label className={CssInput.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
};

export default Input;
