import React from 'react'
import BurgerLogo from '../../assets/Images/burger-logo.png'
import CssLogo from './Logo.module.css'

const Logo=(props)=>{
    return(
        <div className={CssLogo.Logo}>
            <img src={BurgerLogo} alt="MyBurger"/>
        </div>
    )
};

export default Logo;
