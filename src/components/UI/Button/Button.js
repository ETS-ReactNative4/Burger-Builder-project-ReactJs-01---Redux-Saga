import React from 'react'
import CssButton from './Button.module.css'

const Button=(props)=>{
    return(
        <button onClick={props.clicked}
                className={[CssButton.Button, CssButton[props.btnType]].join(' ')}>{props.children}</button>
    )
};

export default Button;
