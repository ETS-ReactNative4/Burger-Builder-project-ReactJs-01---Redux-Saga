import React from 'react'
import CssToolbar from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const Toolbar=(props)=>{
    return(
            <header className={CssToolbar.Toolbar}>
                <Logo/>
                <div className={CssToolbar["justify-start"]}>Menu</div>
                <nav>
                    <NavigationItems/>
                </nav>
            </header>
    )
};

export default Toolbar;
