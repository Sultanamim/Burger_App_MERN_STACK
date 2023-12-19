import React, {Component} from 'react';
import {Button, Modal, ModalBody} from 'reactstrap';
import {connect} from 'react-redux';
import Spinner from '../../Spinner/Spinner';
import {resetIngredients} from '../../../redux/actionCreators';
import axios from 'axios';

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
        userId: state.userId,
        token: state.token,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        resetIngredients: () => dispatch(resetIngredients())
    }
}

class Checkout extends Component {
     state = {
         values: {
             deliveryAddress: "",
             phone: "",
             paymentType: "Cash on delivery",
             isModalOpen: false,
             modalMsg: "",
         },
         isLoading: false,
     }

     goBack = () => {
         this.props.history.goBack("/");
     }

     inputChangeHandler = e => {
         this.setState({
             values: {
                 ...this.state.values,
                 [e.target.name]: e.target.value
             }
         })
     }

     SubmitHandler = () => {
         this.setState({ isLoading: true });
         const order = {
             ingredients: this.props.ingredients,
             customer: this.state.values,
             price: this.props.totalPrice,
             orderTime: new Date().toDateString(),
             userId: this.props.userId,
         }

         axios.post("https://burger-builder-e4246-default-rtdb.firebaseio.com/orders.json?auth="+ this.props.token, order)
         .then(response => {
             if(response.status === 200) {
                this.setState({ 
                    isLoading: false,
                    isModalOpen: true,
                    modalMsg: "Order placed Sccessfully!" 
                })
                this.props.resetIngredients();
             }else{
                this.setState({ 
                    isLoading: false,
                    isModalOpen: false,
                    modalMsg: "Something went wrong!!! Order Again." 
                })
             }
         })
         .catch(err => {
            this.setState({ 
                isLoading: false,
                isModalOpen: false,
                modalMsg: err.response.data.error.message,  
            })
         })
     }

    render() {
        let form = (<div>
                          <h4  style = {{
                   border: "1px solid grey",
                   boxShadow: "1px 1px #888888",
                   borderRadius: "5px",
                   padding: "20px"}}
                >Payment: {this.props.totalPrice} BDT</h4>

               <form style = {{
                   border: "1px solid grey",
                   boxShadow: "1px 1px #888888",
                   borderRadius: "5px",
                   padding: "20px"
               }}>
                   <textarea
                       name = "deliveryAddress"
                       value={this.state.values.deliveryAddress}
                       className= 'form-control'
                       placeholder= "Your Address"
                       onChange={this.inputChangeHandler} ></textarea>
                    <br />
                    <input
                        name= "phone"
                        value= {this.state.values.phone}
                        className= 'form-control'
                        placeholder='Your phone number'
                        onChange={this.inputChangeHandler}  />
                    <br />
                    <select 
                        name= "paymentType" 
                        value= {this.state.values.paymentType}
                        className= 'form-control'
                        onChange={this.inputChangeHandler} >
                            <option value= "Cash on delivery">Cash on delivery</option>
                            <option value= "Bkash">Bkash</option>
                    </select>
                    <br />
                    <Button style={{backgroundColor: '#d70F64', border: 'none'}}
                            className= 'mr-auto'
                            disabled= {!this.props.purchasable}
                            onClick={this.SubmitHandler}>Place Order</Button>
                    <Button color= "secondary"
                            className= 'ml-1'
                            onClick={this.goBack}>Cancel</Button>
               </form>
            </div>)
        return(
            <div>
               {this.state.isLoading ? <Spinner /> : form }
               <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
                  <ModalBody>
                      <p>{this.state.modalMsg}</p>
                  </ModalBody>
               </Modal>
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);