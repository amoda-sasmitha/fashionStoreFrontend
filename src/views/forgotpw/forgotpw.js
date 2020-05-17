import React, { Component } from 'react';
import { Link } from "react-router-dom";



class ForgotPassword extends Component {
    constructor() {
        super();
        this.state = {
            uPass:'',
            uConPass:''
        };
    }

    formFill = (e) =>{
        this.setState({ [e.target.name]: e.target.value })
    }


    render() {
        return (
            <div>
                <div className="register-login-section spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3">
                                <div className="login-form">
                                    <h2>Forgot Password</h2>
                                    <form onSubmit={(e) => { this.onLogin(e) }}>
                                        <div className="group-input">
                                            <label >New Password *</label>
                                            <input type="password" id="pass" required name="uPass" onChange={(e) => this.formFill(e)}  required/>

                                        </div>
                                        <div className="group-input">
                                            <label >Confirm Password *</label>
                                            <input type="password" id="pass" required name="uConPass" onChange={(e) => this.formFill(e)} required />
                                        </div>
                                        <div className="group-input gi-check">
                                            <div className="gi-more">
                                              
                                                {/* <a href="#" className="forget-pass">Forget your Password</a> */}
                                            </div>
                                        </div>
                                        <button type="submit" className="site-btn login-btn">Reset</button>
                                    </form>
                                    {/* <div className="switch-login">
                                        <Link to="/signup" className="or-login">Or Sign Up</Link>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}


export default ForgotPassword;