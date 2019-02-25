import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'
import CssSideDrawer from './SideDrawer.module.css'

const SideDrawer=(props)=>{

    return(
        <div className={CssSideDrawer.SideDrawer}>
            <Logo/>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
    )
};

export default SideDrawer;
