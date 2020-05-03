import React, { Component } from 'react';
// import rect router
import { Link ,Redirect  } from "react-router-dom";
//import navbar
import MainNavbar from '../../components/MainNavbar';
// import footer
import Footer from '../../components/Footer';
//import passsowrd
import ReactPasswordStrength from 'react-password-strength'
import 'react-password-strength/dist/style.css'
// import loading 
import Loading from '../../components/loading'
// import controller
import C_User from '../../controllers/User'
// import config 
import C_Config from '../../controllers/Config'

// import style
import './signup.css'
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.onChangeuPass = this.onChangeuPass.bind(this);
        this.state = {
            // user register form details
            uFname: '',
            uLname: '',
            uEmail: '',
            uPass: '',
            uConPass: '',
            passwordMatch: true,
            loading: false,
        };
       
        
    }


componentWillMount(){
    console.log(this.props);
    
}
    // ======================================================== 
    // =============== Functions        Start   =============== 
    // ======================================================== 

    // -----------------form filling functions ----------------- 
    // fname
    onChangeuFname(e) {
        this.setState({
            uFname: e.target.value
        })
    }
    // lname
    onChangeuLname(e) {
        this.setState({
            uLname: e.target.value
        })
    }
    // fname
    onChangeuEmail(e) {
        this.setState({
            uEmail: e.target.value
        })
    }
    // pwd
    onChangeuPass(e) {
        this.setState({
            uPass: e.target.value
        })
    }
    // conpwd
    onChangeuConPass(e) {
        this.setState({
            uConPass: e.target.value
        }, () => {
            this.checkPasswordMatch()
        })
    }
    //password match
    async  checkPasswordMatch() {
        if (this.state.uPass != this.state.uConPass) {
            await this.setState({
                passwordMatch: false
            })
        } else {
            await this.setState({
                passwordMatch: true
            })
        }

        // console.log("Pass", this.state.uPass);
        // console.log("Con Pass", this.state.uConPass);
        // console.log("Con Pass", this.state.passwordMatch);

    }


    // check all  fields are ok

    checkAllFields() {
        var Errors = 0;
        if (this.state.uFname === null || this.state.uFname === undefined) { console.log("Fname"); Errors++ }
        else if (this.state.uLname === null || this.state.uLname === undefined) { console.log("Lname"); Errors++ }
        else if (this.state.uEmail === null || this.state.uEmail === undefined) { console.log("Email"); Errors++ }
        else if (this.state.uPass === null || this.state.uPass === undefined) { console.log("Password"); Errors++ }

        if (Errors > 0) {
            C_Config.showAlert("Please Fill Correctly");
            return false
        }

        else
            return true
    }

    //user register form submit
    async onRegister(e) {
        e.preventDefault()
        await this.setState({ loading: true })

        if (this.state.passwordMatch != true) {
            C_Config.showAlert("Password and Confirm Passwords not match");
        }

        if (this.checkAllFields() === false) {

        } else if (this.state.passwordMatch === true && this.checkAllFields() != false) {
            // user details 
            var uFname = this.state.uFname
            var uLname = this.state.uLname
            var uEmail = this.state.uEmail
            var uPass = this.state.uPass
            // add news user details to signup functions
            var status = await C_User.Signup(uFname, uLname, uEmail, uPass)
            //   do actions according to responxe
            switch (status) {
                // success
                case 201:
                    await C_Config.showAlert("Please check your email", "Done!");
                  
                    this.props.history.push('/signin')

                    await this.setState({ loading: false })
                    // reset form
                    await this.setState({
                        uFname: '',
                        uLname: '',
                        uEmail: '',
                        uPass: '',
                        uConPass: '',
                        passwordMatch: true,
                    })
                    return 0;

                // Alredy have an account
                case 403:
                    await C_Config.showAlert(
                        "Alredy have an account associated to this email. Please signin to continue"
                    );
                   await  this.props.history.push('/signin')
                    await this.setState({ loading: false })
                    // reset form
                    await this.setState({
                        uFname: '',
                        uLname: '',
                        uEmail: '',
                        uPass: '',
                        uConPass: '',
                        passwordMatch: true,
                    })
                    return 0;

                // network error
                case 600:
                    C_Config.showAlert("Please check your network connection", "Oops!");
                    await this.setState({ loading: false })
                    break;

                default:
                    C_Config.showAlert("Somthing went wrong. Please try again", "Oops!");
                    await this.setState({ loading: false })
                    break;
            }
           
            // reset form
            await this.setState({
                uFname: '',
                uLname: '',
                uEmail: '',
                uPass: '',
                uConPass: '',
                passwordMatch: false,
            })
            await this.setState({ loading: false })
        }
    }

    // ======================================================== 
    // =============== Functions        End    =============== 
    // ======================================================== 

    render() {
        return (
            <div className="wrapper" >
                {this.state.loading ? <Loading /> : null}
                {/* // ======================================================== */}
                {/* // =============== Nav Bar =============== */}
                {/* // ========================================================  */}
                <MainNavbar></MainNavbar>
                {/* // ======================================================== */}
                {/* // ===============  Register Section Begin  =============== */}
                {/* // ========================================================  */}

                {/* // ======================================================== */}
                {/* // ===============  Breadcrumb Section Begin =============== */}
                {/* // ========================================================  */}
                <div className="breacrumb-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-text">
                                    <Link to="/" ><i className="fa fa-home"></i> Home</Link>
                                    <span>Sign Up</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* // ======================================================== */}
                {/* // ===============  Breadcrumb Section Begin =============== */}
                {/* // ========================================================  */}

                <div className="register-login-section spad">
                    <div className="container">
                        <div className="row">
                            <center>
                                <div className="col-lg-8">
                                    <div className="register-form">
                                        <h2>Sign Up</h2>
                                        <form onSubmit={(e) => { this.onRegister(e) }} className="row">
                                            <div className="group-input col-md-6">
                                                <label style={{ textAlign: 'left' }} >First Name *</label>
                                                <input type="text" name="uFname" required placeholder="John" value={this.state.uFname} onChange={(e) => this.onChangeuFname(e)} />
                                            </div>
                                            <div className="group-input col-md-6">
                                                <label style={{ textAlign: 'left' }} >Last Name *</label>
                                                <input type="text" placeholder="Doe" name="uLname" value={this.state.uLname} required onChange={(e) => this.onChangeuLname(e)} />
                                            </div>
                                            <div className="group-input col-md-12">
                                                <label style={{ textAlign: 'left' }}>Email *</label>
                                                <input
                                                    name="email"
                                                    type="email"
                                                    pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,}$"
                                                    placeholder="johndoe@gmail.com" name="uEmail" value={this.state.uEmail} required onChange={(e) => this.onChangeuEmail(e)} />
                                            </div>
                                            <div className="group-input col-md-6 SignUp_div_no_bt_mg">
                                                <label style={{ textAlign: 'left' }} >Password *</label>
                                                {/* <input type="text"  required /> */}
                                                {/* <ReactPasswordStrength
                                                
                                                    className="SignUp_passowrd_stregth"
                                                    style={{ display: 'none' }}
                                                    minLength={10}
                                                    minScore={4}
                                                    ref={ref => this.reactPasswordStrengthInput = ref}
                                                    scoreWords={['weak', 'okay', 'good', 'strong', 'stronger']}
                                                    inputProps={{ name: "uPass", autoComplete: "off"   }}
                                                    changeCallback={this.changeCallback}    
                                                    onChange={this.handleChange}           
                                                  name="uPass"

                                                /> */}
                                                <input type="password" required name="uPass" value={this.state.uPass} onChange={(e) => this.onChangeuPass(e)} />
                                            </div>
                                            <div className="group-input col-md-6 SignUp_div_no_bt_mg">
                                                <label style={{ textAlign: 'left' }} >Confirm Password *</label>
                                                <input type="password" required name="uConPass" value={this.state.uConPass} onChange={(e) => this.onChangeuConPass(e)} />
                                            </div>
                                            <div className="group-input col-md-12">
                                                <p className="SignUp_password_not_match" style={{ display: this.state.passwordMatch === false ? 'block' : 'none' }}>Password and Confrim Password did not match</p>
                                            </div>
                                            <div className="group-input col-md-12">
                                                <center>
                                                    <button type="submit" className="site-btn register-btn">Sign Up</button>
                                                </center>
                                            </div>
                                        </form>
                                        <div className="switch-login">
                                            <Link to="/signin" className="or-login">Or Sign In</Link>
                                        </div>
                                    </div>
                                </div>
                            </center>
                        </div>
                    </div>
                </div>

                {/* // ======================================================== */}
                {/* // =============== Register Form Section End =============== */}
                {/* // ========================================================  */}
                {/* // ======================================================== */}
                {/* // =============== Partner Logo Section Begin =============== */}
                {/* // ========================================================  */}

                {/* <div className="partner-logo">
                        <div className="container">
                            <div className="logo-carousel owl-carousel">
                                <div className="logo-item">
                                    <div className="tablecell-inner">
                                        <img src="images/logo-carousel/logo-1.png" alt="" />
                                    </div>
                                </div>
                                <div className="logo-item">
                                    <div className="tablecell-inner">
                                        <img src="images/logo-carousel/logo-2.png" alt="" />
                                    </div>
                                </div>
                                <div className="logo-item">
                                    <div className="tablecell-inner">
                                        <img src="images/logo-carousel/logo-3.png" alt="" />
                                    </div>
                                </div>
                                <div className="logo-item">
                                    <div className="tablecell-inner">
                                        <img src="images/logo-carousel/logo-4.png" alt="" />
                                    </div>
                                </div>
                                <div className="logo-item">
                                    <div className="tablecell-inner">
                                        <img  src="images/logo-carousel/logo-5.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}


                {/* // ======================================================== */}
                {/* // =============== Partner Logo Section End =============== */}
                {/* // ========================================================  */}


                {/* // ======================================================== */}
                {/* // =============== Footer =============== */}
                {/* // ========================================================  */}
                <Footer></Footer>

            </div>
        );
    }
}


export default SignUp;