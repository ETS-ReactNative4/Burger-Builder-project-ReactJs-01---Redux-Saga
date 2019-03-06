import React from 'react'
import {NavLink} from "react-router-dom";
import CssNavItem from './NavigationItem.module.css'

const NavigationItem=(props)=>{
    return(
            <li className={CssNavItem.NavigationItem}>
                <NavLink to={props.link} activeClassName={CssNavItem.active} exact={props.exact}>{props.children}</NavLink>
            </li>
    )
};

export default NavigationItem
