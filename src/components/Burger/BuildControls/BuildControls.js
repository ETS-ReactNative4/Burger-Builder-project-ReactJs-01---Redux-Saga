import React from 'react'
import CssBuildControls from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'


const controls=[
    {label:'Salat', type:'salat'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'},
    {label:'Bacon', type:'bacon'}
];

const BuildControls=(props)=>{
    return(
        <div className={CssBuildControls.BuildControls}>
            <p><b>Current Price: {props.price.toFixed(2)}</b></p>
            {controls.map((elem)=>{
                return <BuildControl key={elem.label}
                                     label={elem.label}
                                     added={()=>props.ingredientAdder(elem.type)}
                                     remover={()=>{props.ingredientRemover(elem.type)}}
                                     disabled={props.disabled[elem.type]}/>;
            })}
            <button className={CssBuildControls.OrderButton} disabled={!props.purchasable} onClick={props.purchasing}>Order Now</button>
        </div>
    )
};

export default BuildControls;
