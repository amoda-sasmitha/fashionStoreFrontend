/*  eslint-disable */

import React from 'react';
import Util from '../controllers/Util'
import Loading from '../components/loading'





// import rect router
import { Link } from "react-router-dom";
import C_Config from '../controllers/Config'






class Footer extends React.Component {
    constructor() {
        super();
        this.state = {

            loading: false,
            email: '',

        };
    }


        onEmailcganhe = (e) => {
            this.setState({
                email:e.target.value
            })
        }

        onSubscribe = (e) => {
            console.log("Workd");
            
            e.preventDefault()
            console.log(this.state.email);
            
           
            var email = this.state.email
            if (email.length > 0) {
                
                this.setState({
                    loading: true
                })
               return   Util.newsLetterSubscripton(email).then(result => {
                    C_Config.showAlert(
                        "Successfully Subscribe"
                    );
                    this.setState({
                        email:'',
                        loading: false
                    })
                }).catch(err => {
                    this.setState({
                        email:'',

                        loading: false
                    })
                        console.log(err);
                        C_Config.setErrorToast(
                            "Something went wrong"
                        );

                    })
                  
            }
            this.setState({
                email:'',

                loading: false
            })
        }
    

    render() {
        return (
            <footer className="footer-section">
                {this.state.loading ? <Loading /> : null}
                {/* <Link to="/signup" className="or-login">Or Sign Up</Link> */}
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="footer-left">
                                <div className="footer-logo">
                                   <img src="images/logo.png" alt="" />
                          
                                </div>
                                <ul>
                                    <li>Address: No 306/3A, Malabe,  SL</li>
                                    <li>Phone: (+94)71 123 4567</li>
                                    <li>Email: info@fashi.com</li>
                                </ul>
                                <div className="footer-social">
                                    <a href=""><i className="fa fa-facebook"></i></a>
                                    <a href=""><i className="fa fa-instagram"></i></a>
                                    <a href=""><i className="fa fa-twitter"></i></a>
                                    <a href=""><i className="fa fa-pinterest"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 offset-lg-1">
                            <div className="footer-widget">
                                <h5>Information</h5>
                                <ul>
                                    <li><Link to="/aboutus" >About Us</Link></li>
                                    <li><Link to="/contactus">Contact Us</Link></li>
                                    <li><Link to="/pp">Privacy Policies</Link></li>
                                    <li><Link to="/tos">Terms and Conditions</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <div className="footer-widget">
                                <h5></h5>
                                <ul>
                                    <br />
                                    
                                    <li><Link to="/" >Offers</Link></li>
                                    <li><Link to="/">Categories</Link></li>
                                    
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="newslatter-item">
                                <h5>Join Our Newsletter Now</h5>
                                <p>Get E-mail updates about our latest shop and special offers.</p>
                                <form  onSubmit={(e) => this.onSubscribe(e)} className="subscribe-form">
                                    <input value={this.state.email}  name="email" type="text" placeholder="Enter Your Mail" onChange={(e) => this.onEmailcganhe(e)} required />
                                    <button type="submit">Subscribe</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}
export default Footer;
