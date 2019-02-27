import React, {Component} from 'react'
import CssModal from './Modal.module.css'
import BackDrop from '../Backdrop/BackDrop'
import Aux from '../../../hoc/Auxiliary'

class Modal extends Component{

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.show !== this.props.show;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('[Modal.js] will update')
    }

   render(){
       return(
           <Aux>
               <BackDrop show={this.props.show} clicked={this.props.modalClose}/>
               <div className={CssModal.Modal}
                    style={{transform:this.props.show? 'translateY(0)':'translateY(-100vh)',
                        opacity:this.props.show? '1':'0'}}>
                   {this.props.children}
               </div>
           </Aux>
       )
   }
};

export default Modal;
