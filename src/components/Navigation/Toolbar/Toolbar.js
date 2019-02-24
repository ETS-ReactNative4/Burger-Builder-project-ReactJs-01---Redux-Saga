import React from 'react'
import CssToolbar from './Toolbar.module.css'
import Logo from '../../Logo/Logo'

const Toolbar=(props)=>{
    return(
            <header className={CssToolbar.Toolbar}>
                <div>Menu</div>
                <Logo/>
                <nav>...</nav>
            </header>
    )
};

export default Toolbar;
