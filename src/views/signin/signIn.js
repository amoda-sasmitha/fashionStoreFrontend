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
            // user login details
            uEmail: '',
            uPass: '',
            uSavePass: false,


        };



    }
    // ======================================================== 
    // =============== Functions        Start   =============== 
    // ======================================================== 

    // -----------------form filling functions ----------------- 
    // email start  ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    onChangeuEmail(e) {
        this.setState({
            uEmail: e.target.value
        })
    }
    // email end  ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

    // password  start ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    onChangeuPass(e) {
        this.setState({
            uPass: e.target.value
        })
    }

    // password  end ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||



    // submit login  start ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

    async  onLogin(e) {
        e.preventDefault()

        var uEmail = this.state.uEmail;
        var uPass = this.state.uPass;

        if (uEmail != null && uPass != null) {

            var status = await C_User.userSignIn(uEmail, uPass)
            switch (status) {
                // user not found
                case 404:
                    await C_Config.showAlert(
                        "No account associated to email. Please sign up"
                    );
                    window.location.replace("/signup");
                    return -1;

                // Invalid Password
                case 400:
                    await C_Config.showAlert("Invalid password");
                    this.setState({
                        loading: false
                    });
                    return -1;

                // network error
                case 600:
                    C_Config.showAlert("Please check your network connection", "Oops!");
                    this.setState({
                        loading: false
                    });
                    return -1;

                default:
                    break;
            }



            //   set user details
            var curretUser = status;

            console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            console.log("User Details");
            console.log(curretUser);
            console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

        }

    }


    // submit login  end ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

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
                                    <Link to="/" ><i className="fa fa-home"></i> Home</Link>
                                    <span>Sign In</span>
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
                                            <label for="username">Email *</label>
                                            <input type="email" name="uEmail"
                                                pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,}$"
                                                placeholder="johndoe@gmail.com"
                                                onChange={(e) => this.onChangeuEmail(e)} required />
                                        </div>
                                        <div className="group-input">
                                            <label for="pass">Password *</label>
                                            <input type="password" id="pass" required name="uPass" onChange={(e) => this.onChangeuPass(e)} />
                                        </div>
                                        <div className="group-input gi-check">
                                            <div className="gi-more">
                                                <label for="save-pass">
                                                    Save Password
                                                        <input type="checkbox" id="save-pass" />
                                                    <span className="checkmark"></span>
                                                </label>
                                                <a href="#" className="forget-pass">Forget your Password</a>
                                            </div>
                                        </div>
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


export default SignIn;