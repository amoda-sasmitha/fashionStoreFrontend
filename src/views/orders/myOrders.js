/*  eslint-disable */
import React, { Component } from 'react';
import MainNavbar from '../../components/MainNavbar';
import Footer from '../../components/Footer';
import Config from "../../controllers/Config";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { getOrdersByUserId } from '../../controllers/Order'
import { updateOrder } from '../../controllers/Order'
import { string } from 'prop-types';
import moment from 'moment'
import OrderDetails from '../orders/components/orderProductList'

class MyOrders extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading : true,
            orders: [],
            visible: false,
        }
    }

    componentDidMount(){
        this.loadOrders();
    }

    loadOrders = () => {
        const userId = this.props.auth.user.id;
        console.log("User Id is: ", userId);

        getOrdersByUserId(userId)
            .then( result => {
                console.log("Orders by user: ", result);
                this.setState({orders : result});
            })
            .catch ( err => {
                console.log(err);
            })
    } 

    render () {
        const { orders } = this.state;
        return (
          <div className="wrapper  mb-5">
            {/* <MainNavbar></MainNavbar> */}
            {/* <section className="product-shop spad"> */}
            <section className="product-shop spad pt-0 pb-0">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div>
                      <div className="col-12 px-0">
                        <div className="card border-0  rounded mt-3 bg-white pb-2">
                          <h5 className="text-dark bold-normal py-2 bg-white px-2">
                            My Orders
                          </h5>
                          <div className="table-responsive px-2 mb-5">
                            <table className="table table-stripped">
                              <thead>
                                <tr>
                                  <th scope="col">Date</th>
                                  <th scope="col">Amount</th>
                                  <th scope="col">Address</th>
                                  <th scope="col">Shipped</th>
                                  <th scope="col">Actions</th>
                                  <th scope="col"> </th>
                                </tr>
                              </thead>
                              <tbody>
                                {orders.map((item) =>
                                  this.renderOrdersTable(item)
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-0">
                      {/* {this.showOrderDetails([{id: 'Item Name', price: '0.0', selected_color: '', selected_size: '', quantity: ''}])} */}
                      
                    </div>
                </div>
              </div>
            </section>

            {/* <Footer></Footer> */}
          </div>
        );
    }

    renderOrdersTable = item => {
        return(
                <tr key={item._id}>
                <td><b>{ moment(new Date(item.date)).format('DD , MMM YYYY') }</b></td>
                <td>
                    <h6 className="form-label">LKR {item.amount}</h6>
                </td>
                <td>{item.deliveryAddress }</td>
                <td>{item.shipped ? <span className="badge badge-pill badge-success">Shipped</span> : <span className="badge badge-pill badge-secondary">Not Shipped Yet</span>}</td>
                <td>
                    {item.deleteRequest ? <span className="badge badge-pill badge-warning">Cancel Order Request Sent</span> : <button className="btn btn-danger btn-sm px-2 mr-2" onClick={() => this.onClickDeleteRequest(item)}>
                            Cancel Order
                    </button> }
                </td>
                <td>
                    {/* <button className="btn btn-dark btn-sm px-2 mr-2" onClick={() => this.setVisible()}>
                            Details
                    </button> */}
                    {/* {this.state.visible ? this.showOrderDetails(item.products) : null} */}
                    {this.showOrderDetails(item.products)}
                </td>
                </tr>
        );
    }

    getVisible = (calledAgain) => {
        console.log("get Visible called");
        
        if (calledAgain){
            return true;
        }
        else{
            return false;
        }
    }

    setVisible = () => {
        console.log("set Visible called");
        this.setState({visible: !this.state.visible})
        //this.getVisible(true); 
    }

    showOrderDetails = (products) => {
        console.log("Item Products: ", products);
        return(
            <div className="card" style={{width: "300px", overflow: "scroll", height: "300px"}}>
                <h4 className="h4 ml-4 mt-2 mb-2">Order Details</h4>
                {products.map((item) => this.renderOrderDetails(item))}
            </div>
        );
    }

    renderOrderDetails = (product) => {
        console.log("Product Details: ", product);
        
        return(
            <div key={product.id}>
                <div className="card-body">
                    <h5 className="card-title">{product.id}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Color: {product.selected_color}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Size: {product.selected_size}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Quantity: {product.quantity}</h6>
                    <p className="card-link" style={{color: "blue"}}>LKR: {product.price}</p>
                </div>
            </div>
        );
    }

    onClickDeleteRequest = (item) => {
        console.log("Delete Requested Item: ", item);
        item.deleteRequest = true;

        console.log("Updated Delete Requested Item: ", item);

        updateOrder({
            id: item._id, 
            deleteRequest: item.deleteRequest,
        })
        .then( result => {
            Config.setToast("Delete Request Sent Successfully" );
            window.location.reload(false);
        })
        .catch( err => {
            console.log(err);
            Config.setErrorToast("Somthing Went Wrong!");
           
        })

        
        //this.props.history.push("/myOrders");
    }
}

const mapStateToProps = state => ({
    auth: state.auth || {},
  });

export default connect(mapStateToProps)(MyOrders);