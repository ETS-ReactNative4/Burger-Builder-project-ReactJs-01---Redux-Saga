import React from 'react'
import CssNavItems from './NavigationItems.module.css'
import NaviItem from './NavigationItem/NavigationItem'

const NavigationItems=(props)=>{
    return(
        <ul className={CssNavItems.NavigationItems}>
            <NaviItem link="/"  exact>Burger Builder</NaviItem>
            {props.Authenticated ? <NaviItem link="/orders">Orders</NaviItem> : null}
            {props.Authenticated?
                <NaviItem link="/logout">Logout</NaviItem> :
                <NaviItem link="/auth">Authentication</NaviItem>}
        </ul>
    )
};

export default NavigationItems
