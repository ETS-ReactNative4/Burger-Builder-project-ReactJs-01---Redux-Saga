import React from 'react'

import {configure, shallow} from 'enzyme' //"shallow" is a popular function for rendering React component// it renders the component with all its contents but they are not deeply render means without any child component nested within it
import Adapter from 'enzyme-adapter-react-16' // to configure enzyme and connect it to react varsion we need "Adapter"

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({adapter: new Adapter()}); // now exzyme is connected to react


//"describe('description of the component for console output', ()=>{ function doing the test })" made available by "Jest"
describe(" NavigationItems ", ()=>{

    let wrapper;
    beforeEach(()=>{
        wrapper=shallow(<NavigationItems/>); //shallowly rendering "NavigationItems.js"
    });// it is a function that will executed before each test// used to clean or reset the component into its default state


    //"it('description of one individual test for console output', ()=>{ testing function})" made available by "Jest"
    it('should render 2 NavigationItem if not authenticated', ()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2);//"expect(wrapper.find(thing i am expecting to find)).toHaveLength(number of time I am expecting to find that thing)" made available by "Jest"
    });


    it('should render 3 NavigationItem if authenticated', ()=>{

        //1st way of setting props
        //wrapper=shallow(<NavigationItems Authenticated />); //sending props into "NavigationItems.js"

        //2nd way of setting props
        wrapper.setProps({Authenticated:true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });


    it('should an exact logout', ()=>{

        wrapper.setProps({Authenticated:true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    })
})

