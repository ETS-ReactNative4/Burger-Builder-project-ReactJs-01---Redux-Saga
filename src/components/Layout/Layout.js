import React from 'react'
import Aux from '../../hoc/Auxiliary'
import CssClass from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'

const Layout=(props)=>{

    return(
        <Aux>
            <Toolbar/>
            <main className={CssClass.Content}>
                {props.children}
            </main>
        </Aux>
    );

};

export default Layout;


