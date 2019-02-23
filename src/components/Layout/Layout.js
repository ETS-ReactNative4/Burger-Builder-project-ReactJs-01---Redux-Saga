import React from 'react'
import Aux from '../../hoc/Auxiliary'
import CssClass from './Layout.module.css'

const Layout=(props)=>{

    return(
        <Aux>
            <div> Toolbar, Sidedrawer, Backdrop</div>
            <main className={CssClass.Content}>
                {props.children}
            </main>
        </Aux>
    );

};

export default Layout;


