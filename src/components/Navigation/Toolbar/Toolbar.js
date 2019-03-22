import React from 'react'
import CssToolbar from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggler from '../SideDrawer/DrawerToggle/DrawerToggle'

const Toolbar=(props)=>{
    return(
            <header className={CssToolbar.Toolbar}>
                <div className={CssToolbar.Logo}>
                    <Logo/>
                </div>

                <DrawerToggler clicked={props.toggler}/>

                <nav className={CssToolbar.DesktopOnly}>
                    <NavigationItems Authenticated={props.Authenticated}/>
                </nav>
            </header>
    )
};

export default Toolbar;
