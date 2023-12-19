import React from 'react';
import {Card, CardBody, CardFooter, CardHeader, Button} from 'reactstrap';

const controls = [
    {label: 'Salad', type: 'salad', price: '20'},
    {label: 'Cheese', type: 'cheese', price: '40'},
    {label: 'Meat', type: 'meat' , price: '90'}
];

const BuildControl = props => {
    return(
        <div className='d-flex'>
            <div className='mr-auto ml-2 ml-md-1' style={{
                fontWeight: 'bold',
                fontSize: '1.2rem'
            }}>
                {props.label}
                : <span style={{fontSize: '1.1rem', fontWeight: '400'}}>
                   {props.price}/-
                  </span>
            </div>
            <button className='btn btn-danger btn-sm m-1' onClick={props.removed}>Less</button>
            <button className='btn btn-success btn-sm m-1' onClick={props.added}>More</button>
        </div>
    )
}

const Controls = props => {
    return (
        <div className='container ml-md-5' style={{textAlign: "center"}}>
            <Card style={{
                marginTop: "30px",
                marginBottom: "30px",
                textAlign: "center"
            }} >
               <CardHeader style={{
                   backgroundColor: '#D70F64',
                   color: "white"
               }}>
                   <h4>Add Ingredients</h4>
               </CardHeader>
               <CardBody>
                   {
                       controls.map(item => {
                           return <BuildControl
                             label={item.label}
                             type={item.type}
                             price={item.price}
                             key={Math.random()}
                             added={() => props.ingredientsAdded(item.type)}
                             removed={() => props.ingredientsRemoved(item.type)} />
                       })
                   }
               </CardBody>
               <CardFooter>
                   <h5>Price: <strong>{props.price}</strong> BDT</h5>
               </CardFooter>
               <Button disabled={!props.purchasable}
                       onClick={props.toggleModal}
                       style={{backgroundColor: '#D70F64', border: 'none'}}> Order Now </Button>
            </Card>
        </div>
    )
}
export default Controls;