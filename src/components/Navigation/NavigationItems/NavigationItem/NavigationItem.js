import React from 'react'
import CssNavItem from './NavigationItem.module.css'

const NavigationItem=(props)=>{
    return(
            <li className={CssNavItem.NavigationItem}>
                <a href={props.link} className={props.active? CssNavItem.active:null}>{props.children}</a>
            </li>
    )
};

export default NavigationItem
