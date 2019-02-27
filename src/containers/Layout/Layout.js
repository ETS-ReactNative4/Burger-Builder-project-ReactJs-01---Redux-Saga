import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliary'
import CssClass from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component{

    state={
        showSideDrawer:true,
    };

    sideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false});
    };

    sideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    };

   render() {

       return(
           <Aux>
               <Toolbar toggler={this.sideDrawerToggleHandler}/>
               <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
               <main className={CssClass.Content}>
                   {this.props.children}
               </main>
           </Aux>
       );
   }
};

export default Layout;


