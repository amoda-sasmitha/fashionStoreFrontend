import React, { Component } from 'react';
import MainNavbar from "../../components/MainNavbar";
import Footer from "../../components/Footer";
import {Link} from 'react-router-dom'

import codImg from '../../asserts/Images/cod.jpg'

class COD extends Component {
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
                            <center><img src={codImg} className="img-fluid" style={{width:'40%'}} />
                            <h3 className="p-3 m-2">Your Order is Successfully  Placed. We will contact you</h3>
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


export default COD;