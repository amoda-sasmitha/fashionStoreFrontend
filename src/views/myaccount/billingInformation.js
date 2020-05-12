      /*  eslint-disable */

import React, { Component } from 'react';

import './UserInfo.css';
// import loading 
import Loading from '../../components/loading'
// import controller
import C_User from '../../controllers/User'
// import config 
import C_Config from '../../controllers/Config'
// import rect router
import { Link } from "react-router-dom";


class BillingInformation extends Component {
    constructor() {
        super();
        this.state = {

        };

        

    }

    

    render() {
        return (
            <div className="ISS_acc_page">
            {/* <Loader show={this.state.loading} /> */}
            {/*========================================================*/}
            {/*=============== Profile Picture And name ===============*/}
            {/*========================================================*/}
            
    
            <h1 className="IS_UI_title">Billing Information</h1>
    
            {/*========================================================*/}
            {/*=============== Billing Address   ===============*/}
            {/*========================================================*/}
            <div className="row pb-2 mb-3" >
              <div className="col-md-12 mb-2 mt-3 mb-4">
                <h5>Billing Addresses</h5>
              </div>
              <div className="col-md-6">
              <h6>Primary Billing Address</h6>
                <p className="mb-0">No 68/1,</p>
                <p className="mb-0">Uluvitike</p>
                <p className="mb-0">Galle</p>
                <p className="mb-0">80168</p>
                <p className="mb-0">Sri Lanka</p>
              </div>
              <div className="col-md-6">
              <h6>Latest Billing Address</h6>
                <p className="mb-0">No 68/1,</p>
                <p className="mb-0">Uluvitike</p>
                <p className="mb-0">Galle</p>
                <p className="mb-0">80168</p>
                <p className="mb-0">Sri Lanka</p>
              </div>

              <div className="col-md-12 mb-2 mt-3 mb-4">
                <br />
                <h5>Latest Bill Informations</h5>
                <br/>
              </div>
              <div className="col-md-6">
              <h6>Seller Details </h6>
                <p className="mb-0">No 68/1,</p>
                <p className="mb-0">Uluvitike</p>
                <p className="mb-0">Galle</p>
                <p className="mb-0">80168</p>
                <p className="mb-0">Sri Lanka</p>
              </div>
              <div className="col-md-6">
              <h6>About Order Details</h6>
                <p className="mb-0">No 68/1,</p>
                <p className="mb-0">Uluvitike</p>
                <p className="mb-0">Galle</p>
                <p className="mb-0">80168</p>
                <p className="mb-0">Sri Lanka</p>
              </div>
            </div>
           
          </div>
        );
    }
}


export default BillingInformation;