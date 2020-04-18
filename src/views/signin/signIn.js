import React, { Component } from 'react';
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

// import css file
import './signin.css'

class SignIn extends Component {
    constructor() {
        super();
        this.state = {

        };



    }



    render() {
        return (
            <div className="wrapper">
                {this.state.loading ? <Loading /> : null}
                {/* // ======================================================== */}
                {/* // =============== Nav Bar =============== */}
                {/* // ========================================================  */}
                <MainNavbar></MainNavbar>
                {/* // ======================================================== */}
                {/* // ===============  Register Section Begin  =============== */}
                {/* // ========================================================  */}
                {/* // ======================================================== */}
                {/* // =============== Breadcrumb Section Begin  =============== */}
                {/* // ========================================================  */}
                <div className="breacrumb-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-text">
                                    <a href="#"><i className="fa fa-home"></i> Home</a>
                                    <span>Login</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* // ======================================================== */}
                {/* // =============== Breadcrumb Form Section end  =============== */}
                {/* // ========================================================  */}









                {/* // ======================================================== */}
                {/* // =============== Footer =============== */}
                {/* // ========================================================  */}
                <Footer></Footer>


            </div>
        );
    }
}


export default SignIn;