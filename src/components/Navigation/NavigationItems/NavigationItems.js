import React from 'react'
import CssNavItems from './NavigationItems.module.css'
import NavItem from './NavigationItem/NavigationItem'
const NavigationItems=(props)=>{
    return(
        <ul className={CssNavItems.NavigationItems}>
            <NavItem link="/" active>Burger Builder</NavItem>
            <NavItem link="/">Check out</NavItem>
        </ul>
    )
};

export default NavigationItems
