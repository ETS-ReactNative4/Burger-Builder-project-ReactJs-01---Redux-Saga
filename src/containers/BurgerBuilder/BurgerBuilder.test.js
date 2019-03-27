import React from 'react'

import {configure, shallow} from 'enzyme' //"shallow" is a popular function for rendering React component// it renders the component with all its contents but they are not deeply render means without any child component nested within it
import Adapter from 'enzyme-adapter-react-16' // to configure enzyme and connect it to react varsion we need "Adapter"

import {BurgerBuilder} from './BurgerBuilder'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

configure({adapter: new Adapter()}); // now exzyme is connected to react

describe('BurgerBuilder', ()=>{

    let wrapper;
    beforeEach(()=>{
        wrapper=shallow(<BurgerBuilder onInitIngredients={()=>{}}/>); // because "onInitIngredients" is expacted inthe lyfecycle hook of this component
    });

    it('should render BuildControls when receiving ingredients',()=>{
        wrapper.setProps( {ingredients:{meat:0} } );
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
})
