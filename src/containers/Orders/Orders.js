import React, {Component} from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler'

class Orders extends Component{
    state={
        orders:[],
        loading:true
    }
    componentDidMount() {
        axios.get('/BurgerOrders.json').then( res=>{
            const fetchOrders=[]
            for(let key in res.data){

                fetchOrders.push({
                    ...res.data[key], //distributing the object and adding a new property of "id"
                    id:key,
                });
            }
            this.setState({orders:fetchOrders, loading:false})

        }).catch( err=>{
            this.setState({loading:false})
        })
    }

    render(){
        return(
            <div>
                {this.state.orders.map( order=>{
                    return <Order key={order.id} ingredients={order.ingredients} price={+order.price}/>
                })}
            </div>
        )
    }
}

export default ErrorHandler(Orders, axios);
