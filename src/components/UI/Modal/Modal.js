import React from 'react'
import CssModal from './Modal.module.css'

const Modal=(props)=>{
    return(
        <div className={CssModal.Modal}>
            {props.children}
        </div>
    )
};

export default Modal;
