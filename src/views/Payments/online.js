import React, { Component } from 'react';

import MainNavbar from "../../components/MainNavbar";
import Footer from "../../components/Footer";
import {Link} from 'react-router-dom'

import OnImg from '../../asserts/Images/online.png'
class Online extends Component {
    constructor() {
        super();
        this.state = {

        };



    }



    render() {
        return (
            <div className="wrapper">
                <MainNavbar ></MainNavbar>
                <div className="container-fluid px-5">
                    <div className="row">
                        <div className="col-md-12">
                            <center><img src={OnImg} className="img-fluid" />
                            <h3 className="p-3 m-2">Your Payment is Successfull</h3>
                            <Link to="/">
                          <label className="primary-btn  mt-2 click mb-4 p-3">Back to Home</label>
                         </Link>
                         </center>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}


export default Online;