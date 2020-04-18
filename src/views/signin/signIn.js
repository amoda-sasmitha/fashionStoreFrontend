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
        this.savepassword = this.savepassword.bind(this);
        this.state = {
            // user login details
            uEmail: '',
            uPass: '',
            uSavePass: false,
            loading: false,
            isChecked: false


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

    // save password  start ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    savepassword() {
        this.setState({
            isChecked: !this.state.isChecked
        })
        console.log(this.state.isChecked);


    }
    // save  password  end ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||



    // submit login  start ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

    async  onLogin(e) {
        e.preventDefault()
        var uEmail = this.state.uEmail;
        var uPass = this.state.uPass;
        if (uEmail != null && uPass != null) {
            await this.setState({ loading: true })
            var status = await C_User.userSignIn(uEmail, uPass)

            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            console.log(status);

            switch (status) {
                // user not found
                case 401:
                    await this.setState({
                        loading: false
                    });
                    await C_Config.showAlert(
                        "No account associated to email. Please sign up"
                    );
                    await window.location.replace("/signup");
                    return -1;
                // Invalid Password
                case 403:
                    await this.setState({
                        loading: false
                    });
                    await C_Config.showAlert("Invalid password");
                    return -1;
                // network error
                case 600:
                    await this.setState({
                        loading: false
                    });
                    C_Config.showAlert("Please check your network connection", "Oops!");
                    return -1;

                default:
                    break;
            }

            //   set user details
            var curretUser = status;
            var keepMesignedIn = this.state.isChecked;
            if (keepMesignedIn == false) {
                keepMesignedIn = false
            } else {
                keepMesignedIn = true
            }

            await console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            await console.log("User Details");
            await console.log(curretUser);


            C_User.setCookies(
                curretUser.token,
                curretUser.fname,
                curretUser.lname,
                curretUser.email,
                curretUser.createdat,
                curretUser.createdat,
                keepMesignedIn
            )
            console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            console.log(keepMesignedIn);

            await this.setState({ loading: false })
            // await window.location.replace("/");
        } else {
            C_Config.showAlert(
                "Please fill user name and password correctly"
            );
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
                                        <div className="group-input gi-check">
                                            <div className="gi-more">
                                                <label >
                                                    Save Password
                                                        <input type="checkbox" name="keepMesignedIn" onChange={this.savepassword} />
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