import React from 'react'
import CssNavItems from './NavigationItems.module.css'
import NaviItem from './NavigationItem/NavigationItem'
const NavigationItems=(props)=>{
    return(
        <ul className={CssNavItems.NavigationItems}>
            <NaviItem link="/"  exact>Burger Builder</NaviItem>
            <NaviItem link="/orders">Orders</NaviItem>
            <NaviItem link="/auth">Authentication</NaviItem>
        </ul>
    )
};

export default NavigationItems
