import React from 'react'
import CssBuildControl from './BuildControl.module.css'

const BuildControl=(props)=>{
    return(
        <div className={CssBuildControl.BuildControl}>
            <div className={CssBuildControl.Label}>{props.label}</div>
            <button className={CssBuildControl.More} onClick={props.added}>More</button>
            <button className={CssBuildControl.Less}>Less</button>
        </div>
    )
};

export default BuildControl;
