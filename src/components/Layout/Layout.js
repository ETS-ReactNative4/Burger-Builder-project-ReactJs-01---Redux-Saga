import React from 'react'
import Aux from '../../hoc/Auxiliary'
import CssClass from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

const Layout=(props)=>{

    return(
        <Aux>
            <Toolbar/>
            <SideDrawer/>
            <main className={CssClass.Content}>
                {props.children}
            </main>
        </Aux>
    );

};

export default Layout;


