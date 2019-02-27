import React from 'react'
import CssDrawerToggler from "./DrawerToggler.module.css";

const DrawerToggler=(props)=>{
   return(
       <div className={CssDrawerToggler.DrawerToggle} onClick={props.clicked}>
           <div></div>
           <div></div>
           <div></div>
       </div>
   )
};

export default DrawerToggler;
