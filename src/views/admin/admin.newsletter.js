/*  eslint-disable */
import React, { Component } from 'react';
import MainNavbar from '../../components/MainNavbar';
import Footer from '../../components/Footer';
import Config from "../../controllers/Config";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { string, func } from 'prop-types';
import AdminSidebar from '../../components/AdminSidebar'
import moment from 'moment'
import { getAllOrders } from '../../controllers/Order'

class allOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            orders: [],
        }
    }

    componentDidMount() {
        this.loadOrders();
    }

    loadOrders = () => {
        getAllOrders()
            .then(result => {
                console.log(result);
                this.setState({ orders: result });
            })
            .catch(err => {
                console.log(err);
            })
    }

    getStyle = (item) => {
        console.log("Get Style: ", item.deleteRequest);
        return {
            backgroundColor: item.deleteRequest ? '#ffa1a1' : '#FFFFFF',
        }
    }

    render() {
        const { orders } = this.state;
        let reversedOrders = orders.reverse();

        let ShippedOrders = reversedOrders.filter((ord) => {
            return (
                ord.shipped == true
            );
        });



        //console.log("Shipped Orders: ", ShippedOrders);
        return (
            <div className="bg-light wd-wrapper">
                <AdminSidebar active={"newsletters"} />
                <div className="wrapper-wx" >
                    <div className="container-fluid" >
                        <div className="row">
                            <div className="col-12">
                                <h5 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                                    Newsletter  Subscriptions
                        </h5>

                                {/* ----------------------------------------------------------- */}

                                <div className="col-12 px-0">
                                    <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                                        <h5 className="text-dark bold-normal py-2 bg-white px-2">
                                            Subscribers
                            </h5>
                                        <div className="table-responsive px-2">
                                            <table className="table table-stripped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">No</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Email</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td><b>01</b></td>
                                                        <td>0.05.2020</td>
                                                        <td>jayamaha@gmail.com</td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>02</b></td>
                                                        <td>08.05.2020</td>
                                                        <td>admin@gmail.com</td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>03</b></td>
                                                        <td>12.05.2020</td>
                                                        <td>padulaguruge@gmail.com</td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>04</b></td>
                                                        <td>13.05.2020</td>
                                                        <td>padula.g@lucidex.tech</td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>05</b></td>
                                                        <td>13.05.2020</td>
                                                        <td>amoda29@gmail.com</td>
                                                    </tr>
                                                    {/* { ShippedOrders.map( item => this.renderOrdersTable(item) )} */}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                {/*Shipped orders end*/}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    renderOrdersTable = item => {
        return (
            <tr key={item._id} style={this.getStyle(item)} >
                <td><b>{moment(new Date(item.date)).format('DD , MMM YYYY')}</b></td>
                <td>
                    <h6 className="form-label">LKR {item.amount}</h6>
                </td>
                <td>{item.userName}</td>

            </tr>
        );
    }


}



export default withRouter(allOrders);