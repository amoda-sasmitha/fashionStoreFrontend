import React, { Component } from 'react';
import { Link } from "react-router-dom";


class Adminlogin extends Component {
    constructor() {
        super();
        this.state = {

        };

        

    }

    

    render() {
        return (
            <div className="wrapper">
           
            {/* // ======================================================== */}
            {/* // =============== Nav Bar =============== */}
            {/* // ========================================================  */}
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
                                
                                <span>Admin Sign In Area</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* // ======================================================== */}
            {/* // =============== Breadcrumb Form Section end  =============== */}
            {/* // ========================================================  */}


            {/* // ======================================================== */}
            {/* // =============== Login Section Begin  =============== */}
            {/* // ========================================================  */}
            <div className="register-login-section spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="login-form">
                                <h2>Sign In</h2>
                                <form onSubmit={(e) => { this.onLogin(e) }}>
                                    <div className="group-input">
                                        <label >Email *</label>
                                        <input type="email" name="uEmail"
                                            pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,}$"
                                            placeholder="johndoe@gmail.com"
                                            onChange={(e) => this.onChangeuEmail(e)} required />
                                    </div>
                                    <div className="group-input">
                                        <label >Password *</label>
                                        <input type="password" id="pass" required name="uPass" onChange={(e) => this.onChangeuPass(e)} />
                                    </div>
                                    {/* <div className="group-input gi-check">
                                        <div className="gi-more">
                                            <label >
                                                Save Password
                                                    <input type="checkbox" name="keepMesignedIn" onChange={this.savepassword} />
                                                <span className="checkmark"></span>
                                            </label>
                                            <a href="#" className="forget-pass">Forget your Password</a>
                                        </div>
                                    </div> */}
                                    <button type="submit" className="site-btn login-btn">Sign In</button>
                                </form>
                                <div className="switch-login">
                                    <Link to="/signup" className="or-login">Or Sign Up</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button onClick={()=> this.checkUserBrowser()}>chceck browse </button>
            {/* // ======================================================== */}
            {/* // =============== Register Form Section End  =============== */}
            {/* // ========================================================  */}

            {/* // ======================================================== */}
            {/* // =============== Footer =============== */}
            {/* // ========================================================  */}


        </div>
        );
    }
}


export default Adminlogin;