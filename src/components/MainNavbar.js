import React from 'react';

class MainNavbar extends React.Component {
  render(){
    return(
        <header className="header-section">
        <div className="header-top">
            <div className="container">
                <div className="ht-left">
                    <div className="mail-service">
                        <i className=" fa fa-envelope"></i>
                       fashionstore@gmail.com
                    </div>
                    <div className="phone-service">
                        <i className=" fa fa-phone"></i>
                        +94 91 222 77 81
                    </div>
                </div>
                <div className="ht-right">
                    <a href="#" className="login-panel"><i className="fa fa-user"></i>Login</a>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="inner-header">
                <div className="row justify-content-center">
                    <div className="col-lg-2 col-md-2">
                        <div className="logo">
                            <a href="./index.html">
                                <img src="images/logo.png" alt=""/>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-7">
                        <div className="advanced-search">
                            <div className="input-group">
                                <input type="text" placeholder="What do you need?"/>
                                <button type="button">search</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 text-right col-md-3">
                        <ul className="nav-right">
                            <li className="heart-icon">
                                <a href="#">
                                    <i className="icon_heart_alt"></i>
                                    <span>1</span>
                                </a>
                            </li>
                            <li className="cart-icon">
                                <a href="#">
                                    <i className="icon_bag_alt"></i>
                                    <span>3</span>
                                </a>
                            </li>
                            <li className="cart-price">$150.00</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="nav-item">
            <div className="container">
               
                <nav className="nav-menu mobile-menu">
                    <ul>
                        <li className="active"><a href="#">Home</a></li>
                        <li ><a href="#">All Departments</a></li>
                        <li><a href="#">New Arivals</a></li>
                        <li><a href="#">Offers</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact Us</a></li>
                      
                    </ul>
                </nav>
                <div id="mobile-menu-wrap"></div>
            </div>
        </div>
    </header> 
    );
  }
}
export default MainNavbar;
