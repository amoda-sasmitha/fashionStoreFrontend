/*  eslint-disable */
import React, { Component } from 'react';
import MainNavbar from '../../components/MainNavbar';
import Footer from '../../components/Footer';
import Config from "../../controllers/Config";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { string } from 'prop-types';
import AdminSidebar from '../../components/AdminSidebar'
import moment from 'moment'
import { getAllOrders } from '../../controllers/Order'

class allOrders  extends Component {

    constructor(props){
        super(props);
        this.state = {
           loading : true,
           orders: [],
        }
   }

   componentDidMount(){
        this.loadOrders();
   }

   loadOrders = () => {
    getAllOrders()
        .then( result => {
            console.log(result);
            this.setState({orders : result});
        })
        .catch ( err => {
            console.log(err);
        })
   }

   getStyle = (item) => {
        console.log("Get Style: ", item.deleteRequest);   
        return {
            backgroundColor: item.deleteRequest ? '#ffa1a1' : '#FFFFFF',
        }
    }   

   render(){
    const { orders} = this.state;
    return(
            <div className="bg-light wd-wrapper">
            <AdminSidebar active={"categories"}/>
            <div className="wrapper-wx" >
                <div className="container-fluid" >
                 <div className="row">
                     <div className="col-12">
                        <h5 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                            Orders
                        </h5>
                     
                     {/* ----------------------------------------------------------- */}
                     <div className="col-12 px-0">
                        <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                            <h5 className="text-dark bold-normal py-2 bg-white px-2">
                                Current Orders 
                            </h5>
                            <div className="table-responsive px-2">
                                <table className="table table-stripped">
                                <thead>
                                    <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">User Name</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                  { orders.map( item => this.renderOrdersTable(item) )} 
                                 
                                </tbody>
                                </table>
                            </div>
                        </div>
                     </div>
                 </div>
                </div>
           
            </div>
            </div>
            </div>
    )
}

    renderOrdersTable = item => {
        return(
            <tr key={item._id} style={this.getStyle(item)}>
                <td><b>{ moment(new Date(item.date)).format('DD , MMM YYYY') }</b></td>
                <td>
                    <h6 className="form-label">LKR {item.amount}</h6>
                </td>
                <td>{item.userName}</td>
                <td>{item.deliveryAddress }</td>
                <td>
                    <button className="btn btn-dark btn-sm px-2 mr-2" onClick={() => this.onClickView(item)}>
                            More Details
                    </button>
                </td>
            </tr>
        );
    }

    onClickView = item => {
        this.props.history.push(`/manager/orders/getOrder/${item._id}`)
    }
}



export default withRouter(allOrders);