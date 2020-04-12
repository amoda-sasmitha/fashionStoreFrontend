import React from 'react';

class Footer extends React.Component {
  render(){
    return(
        <footer className="footer-section">
        <div className="container">
            <div className="row">
                <div className="col-lg-3">
                    <div className="footer-left">
                        <div className="footer-logo">
                            <a href="#"><img src="img/footer-logo.png" alt=""/></a>
                        </div>
                        <ul>
                            <li>Address: thama na</li>
                            <li>Phone: thama na</li>
                            <li>Email: thama na</li>
                        </ul>
                        <div className="footer-social">
                            <a href="#"><i className="fa fa-facebook"></i></a>
                            <a href="#"><i className="fa fa-instagram"></i></a>
                            <a href="#"><i className="fa fa-twitter"></i></a>
                            <a href="#"><i className="fa fa-pinterest"></i></a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 offset-lg-1">
                    <div className="footer-widget">
                        <h5>Information</h5>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Checkout</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">Serivius</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-2">
                    <div className="footer-widget">
                        <h5>My Account</h5>
                        <ul>
                            <li><a href="#">My Account</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">Shopping Cart</a></li>
                            <li><a href="#">Shop</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="newslatter-item">
                        <h5>Join Our Newsletter Now</h5>
                        <p>Get E-mail updates about our latest shop and special offers.</p>
                        <form action="#" className="subscribe-form">
                            <input type="text" placeholder="Enter Your Mail"/>
                            <button type="button">Subscribe</button>
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
