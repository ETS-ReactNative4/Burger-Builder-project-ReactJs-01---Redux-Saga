import React from 'react'
import CssBackdrop from './BackDrop.module.css'

const BackDrop=(props)=>{
    return(
        props.show? <div className={CssBackdrop.BackDrop} onClick={props.clicked}></div>:null
    )
};

export default BackDrop;
