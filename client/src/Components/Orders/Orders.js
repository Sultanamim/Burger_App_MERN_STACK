import React,{Component} from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../../redux/actionCreators';
import Order from './order/order';
import Spinner from '../Spinner/Spinner';

const mapStateToProps = state => {
    return{
        orders: state.orders,
        orderLoading: state.orderLoading,
        orderErr: state.orderErr,
        token: state.token,
        userId: state.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchOrders: (token,userId) => dispatch(fetchOrders(token,userId))
    }
}

class Orders extends Component{
    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = null;
        if(this.props.orderErr) {
            orders = <p style={{
                        borderRadius: "5px",
                        padding: "20px",
                        marginRight: "10px",
                        marginBottom: "15px",
                        backgroundColor: "wheat",
                        color: "red"
                    }}>Sorry Failed To Load Orders!!!</p>
        } else {
           if(this.props.orders.length === 0) {
               orders = <p style={{
                            borderRadius: "5px",
                            padding: "20px",
                            marginRight: "10px",
                            marginBottom: "15px",
                            backgroundColor: "wheat",
                            color: "#D70F64"
                        }}>You have no orders to show...</p>
           } else {
              orders = this.props.orders.map(order => {
                return <Order order={order} key={order.id} />
             })
           }
        }
        return(
            <div>
               {this.props.orderLoading ? <Spinner /> : orders}
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Orders);