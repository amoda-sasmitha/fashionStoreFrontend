      /*  eslint-disable */

import React, { Component } from 'react';

import './myaccount.css';

// import loading 
import Loading from '../../components/loading'
// import controller
import C_User from '../../controllers/User'
// import config 
import C_Config from '../../controllers/Config'
// import rect router
import { Link } from "react-router-dom";
//import navbar
import MainNavbar from '../../components/MainNavbar';
// import footer
import Footer from '../../components/Footer';

import UserInfo from './Userinfo'

import BillingInformation from './billingInformation'

import Myorders from '../orders/myOrders'

class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "userInfo"
        };



    }

    componentWillMount(){
        console.log(this.props.isAuthed);
    }



    setPage(page) {
        this.setState({
            page: page
        });
    }

    render() {
        return (
            <div className="wrapper">
                {this.state.loading ? <Loading /> : null}
                {/* // ======================================================== */}
                {/* // =============== Nav Bar =============== */}
                {/* // ========================================================  */}
                <MainNavbar isAuthed = {this.props.isAuthed}></MainNavbar>
                {/* // ======================================================== */}
                {/* // ===============  Register Section Begin  =============== */}
                {/* // ========================================================  */}
                {/* // ======================================================== */}
                {/* // =============== Breadcrumb Section Begin  =============== */}
                {/* // ========================================================  */}
                {/* <div className="breacrumb-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-text">
                                    <Link to="/" ><i className="fa fa-home"></i> Home</Link>
                                    <span>My Account</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* // ======================================================== */}
                {/* // =============== Breadcrumb Form Section end  =============== */}
                {/* // ========================================================  */}

                {/* // ======================================================== */}
                {/* // ===============My Account Section Start Here =========== */}
                {/* // ========================================================  */}

                <div className="container">
                    <div className="row">

                        {/* Sidebar */}
                        <div className="col-md-2 IS_acc_Sidebar">
                            {/* <h1 className="backBtn" onClick={() => this.props.history.goBack()}  >
                                <i className="fas fa-angle-left"></i> Account Settings </h1> */}
                            <h1 className="backBtn"   >
                                My Account  </h1>
                            {/* sidebar Links */}
                            <h1 onClick={() => this.setPage("userInfo")} className={this.state.page === "userInfo" ? "linkItem active" : "linkItem"} >
                                <i className="fas fa-user"></i> User Info  </h1>
                            {/* <h1 onClick={() => this.setPage("BillingInformation")} className={this.state.page === "usage" ? "linkItem active" : "linkItem"}>
                                <i className="fas fa-file-invoice"></i>Billing Information </h1> */}
                            <h1 onClick={() => this.setPage("Myorders")} className={this.state.page === "Myorders" ? "linkItem active" : "linkItem"}>
                                <i className="fas fa-receipt"></i> My Orders </h1>
                            {/* <h1 onClick={() => this.setPage("billing")} className={this.state.page === "billing" ? "linkItem active" : "linkItem"}>
                                <i className="fas fa-receipt"></i> Order Details </h1>
                            <h1 onClick={() => this.setPage("billing")} className={this.state.page === "billing" ? "linkItem active" : "linkItem"}>
                                <i className="fas fa-receipt"></i>  Complains  </h1> */}
                        </div>

                        <div className="col-md-10 IS_acc_container">
                            {this.state.page === "userInfo" ? (
                                <UserInfo {...this.props} />
                            ) : null}
                            {this.state.page === "BillingInformation" ? (
                                <BillingInformation {...this.props} />
                            ) : null}
                            {this.state.page === "Myorders" ? (
                                <Myorders {...this.props} />
                            ) : null}
                        </div>
                    </div>

                </div>







                {/* // ======================================================== */}
                {/* // ===============My Account Section End Here =========== */}
                {/* // ========================================================  */}



                {/* // ======================================================== */}
                {/* // =============== Register Form Section End  =============== */}
                {/* // ========================================================  */}

                {/* // ======================================================== */}
                {/* // =============== Footer =============== */}
                {/* // ========================================================  */}
                <Footer></Footer>

            </div>
        );
    }
}


export default MyAccount;