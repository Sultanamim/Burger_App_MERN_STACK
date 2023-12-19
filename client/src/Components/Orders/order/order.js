import React from 'react';

const Order = props => {
    const ingredientSummary = props.order.ingredients.map(item => {
        return(
            <span key={item.type} style={{
                 border: "1px solid green",
                 borderRadius: "5px",
                 padding: "5px",
                 marginRight: "10px"
            }}>
              <span style={{color: "#D70F64"}}>{item.amount}x</span> <span style={{textTransform: "capitalize", color: "green"}}>{item.type}</span>
            </span>
        )
    })
    return(
        <div style={{
            padding: "20px",
            marginRight: "10px",
            marginBottom: "15px",
            backgroundColor: "wheat"
        }}>
            <p><span style={{color: 'green'}}>Order Number: </span> <span style={{color: "#D70F64"}}>{props.order.id}</span> </p>
            <p><span style={{color: 'green'}}> Delivery Address: </span>{props.order.customer.deliveryAddress} </p>
            <p><span style={{color: 'green'}}>  Contact Number: </span>{props.order.customer.phone} </p>
            <p><span style={{color: 'green'}}>  Payment: </span>{props.order.customer.paymentType} </p>
            <p><span style={{color: 'green'}}>  Date: </span>{props.order.orderTime} </p>
            <hr />
            {ingredientSummary}
            <hr />
            <p><span style={{color: 'green'}}> Total: </span><span style={{color: "#D70F64"}}>{props.order.price} BDT</span></p>
        </div>
    )
}
export default Order;