import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliary'
import CssClass from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'

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
               <Toolbar toggler={this.sideDrawerToggleHandler}
                        Authenticated={this.props.isAuthenticated}/>
               <SideDrawer open={this.state.showSideDrawer}
                           closed={this.sideDrawerClosedHandler}
                           Authenticated={this.props.isAuthenticated}/>
               <main className={CssClass.Content}>
                   {this.props.children}
               </main>
           </Aux>
       );
   }
};

const mapStatetoProps=(state)=>{
  return{
      isAuthenticated:state.auth.token !== null
  }
};

export default connect(mapStatetoProps)(Layout);


