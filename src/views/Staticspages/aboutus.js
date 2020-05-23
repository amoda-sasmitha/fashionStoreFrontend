/*  eslint-disable */
import React, { Component } from 'react';
//import navbar
import MainNavbar from '../../components/MainNavbar';
// import footer
import Footer from '../../components/Footer';
import './common.css';
// import how from '../../Images/howrelax1.png'

import newimg from '../../asserts/Images/newnew.png'
import MainSlider from '../../components/MainSlider';

class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };



    }



    render() {
        return (
            <div className="wrapper">
                <MainNavbar active="aboutus" isAuthed={this.props.isAuthed}></MainNavbar>

                <div className="container">
                    <div className="row Abou_Div py-5">
                        <div className="col-md-12 mt-3">
                            <h5 className="bold-normal text-dark">About US</h5>
                        </div>
                        <div className="col-md-6">
                            <p style={{ lineHeight: '30px' }}>Welcome to Fashi, your number one source for all things your 
                            relax life. We're dedicated to giving you the very best of things, 


                            Founded in 2020 by Fashi , Fashi has come a long way from its beginnings in Sri Lanka. 
                            When Fashi first started out, 

                            we hope you enjoy our products as much as we enjoy offering them to you.
                             If you have any questions or comments, please don't hesitate to contact us. <br />


                        Sincerely, <br />

                        Fashi</p>
                        </div>
                        <div className="col-md-6">
                            {/* <MainSlider></MainSlider> */}
                            <div className="row">
                                {/* <div className="col-4  mt-3 mb-3 "  >
                                    <img src="https://res.cloudinary.com/dxqwnvudu/image/upload/v1587120985/FashionStore/emailtemplateImages/mains/offer01_nbnk2v.png" alt="" />
                                </div> */}
                                {/* <div className="col-4 mt-3 mb-3   "  >
                                    <img src="https://res.cloudinary.com/dxqwnvudu/image/upload/v1587120969/FashionStore/emailtemplateImages/mains/offer03_b4nq9n.png"  alt="" />
                                </div> */}
                                <div className="col-4 mt-3 mb-3   "  >
                                    <img src="https://res.cloudinary.com/dxqwnvudu/image/upload/v1587120874/FashionStore/emailtemplateImages/products/women-large_sszx5b.jpg"  alt="" />
                                </div>
                                <div className="col-4 mt-3 mb-3   "  >
                                    <img src="https://res.cloudinary.com/dxqwnvudu/image/upload/v1587120876/FashionStore/emailtemplateImages/products/man-large_ke7igc.jpg"  alt="" />
                                </div>
                                {/* <div className="col-4 mt-3 mb-3   "  >
                                    <img src="https://res.cloudinary.com/dxqwnvudu/image/upload/v1587120874/FashionStore/emailtemplateImages/products/women-2_cnyyq9.jpg"  alt="" />
                                </div> */}
                                <div className="col-4 mt-3 mb-3   "  >
                                <img src="https://res.cloudinary.com/dxqwnvudu/image/upload/v1587120978/FashionStore/emailtemplateImages/mains/offer02c_k5sojh.png" alt="" />                               
                                 </div>
  
                            </div>
                        </div>
                        <div className="col-md-12">
                            {/* <img  src={newimg} className="img-fluid"/>
                        <img  src={newimg} className="img-fluid"/> */}
                        </div>
                    </div>

                </div>

                {/* // ======================================================== */}
                {/* // =============== Footer =============== */}
                {/* // ========================================================  */}
                <Footer></Footer>


            </div>
        );
    }
}


export default AboutUs;