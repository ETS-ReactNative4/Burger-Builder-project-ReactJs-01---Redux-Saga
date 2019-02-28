import React, {Component} from 'react'
import Aux from '../Auxiliary'
import Modal from '../../components/UI/Modal/Modal'

const ErrorHandler=(WrappedComponent, axios)=>{
    return class extends Component{
        state={
            error:null,
        };
        constructor(props){
            super(props);
            this.resInterceptors=axios.interceptors.response.use(res=>res, error => {
                this.setState({error:error})
            });
            this.reqInterceptors=axios.interceptors.request.use(req=>{
                this.setState({error:null})
                return req;
            })
        }
        componentWillUnmount() {
            axios.interceptors.response.eject(this.resInterceptors);
            axios.interceptors.request.eject(this.reqInterceptors);
        }

        errorConfiremedHandler=()=>{
            this.setState({error:null});
        }
        render(){
            return (
                <Aux>
                    <Modal show={this.state.error} modalClose={this.errorConfiremedHandler}>
                        {this.state.error? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }

    }
};

export default ErrorHandler;
