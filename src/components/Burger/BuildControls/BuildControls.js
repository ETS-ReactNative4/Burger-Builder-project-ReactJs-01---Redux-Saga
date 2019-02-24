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
            {controls.map((elem)=>{
                return <BuildControl key={elem.label} label={elem.label} added={()=>props.ingredientAdder(elem.type)}/>;
            })}
        </div>
    )
};

export default BuildControls;
