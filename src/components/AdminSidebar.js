/*  eslint-disable */
import React from "react";
import { SignOut } from "../actions/authActions";
import "../asserts/commoncss/sidebar.css";
import { Link , withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

    faUser,
    faEnvelopeSquare,
    faBars,
    faTags,
    faBarcode,
    faClipboardCheck,
    faGift,
    faPlusSquare,
    faTachometerAlt,
  faComment,
  faHome,
  faUserSecret,
  faUsers,
  faSuitcase,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";


class AdminSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      side_bar_toggle: false,
    };
  }

  signoutuser = () => {
    const role = this.props.auth.user.type;
    const isadmin = (role && role == "admin") ? true : false
    this.props.SignOut && this.props.SignOut();
  
    this.props.history.push(isadmin ? "/admin" : "/manager" );
  };

    render() {
        const {side_bar_toggle} = this.state;
        const {active} = this.props;
        const role = this.props.auth.user.type;
        const isadmin = (role && role == "admin") ? true : false
        return (
            <>
                <nav className="navbar navbar-dark bg-dark py-0 shadow-sm  fixed-top">
                    <span className="navbar-brand mb-0 h6 text-light ml-2">Fashi Dashboard
        <FontAwesomeIcon
            onClick={() => this.setState({side_bar_toggle: !this.state.side_bar_toggle})}
            icon={faBars} className="ml-4 click show-icon"></FontAwesomeIcon>
                    </span>
                </nav>

                <div className={`sidebar_wrap sidebar-top ${side_bar_toggle ? 'sidebar_active' : ''}`}>
                    <div className="sidebar-header pb-4 pt-2">
                        <div className="d-flex px-4">
                            <img src="images/default/user2.jpg" className="rounded-circle sidebar-image my-auto"></img>
                            <div className="my-auto">
                                <h6 style={{lineHeight: '12px', fontWeight: 600}}
                                    className={`text-white mb-0 mt-1`}>{role && role.length > 1 && 
                                    role[0].toUpperCase() + role.substring(1)} </h6>
                                <span className="small text-light ">{this.props.auth.user.email}</span>
                            </div>
                        </div>
                    </div>
                    <ul className="sidebar">
                        <li className="listitem" className={`listitem ${active == 'dashboard' && 'active_category'}`}>
                            <Link to="/admin/dashboard">
                                <h6 className={`categorylink px-2 ${active == 'dashboard' && 'active_category'}`}>
                                    <FontAwesomeIcon icon={faTachometerAlt} className="mx-3 sidebar-icon"></FontAwesomeIcon>Dashboard
                                </h6></Link>
                        </li>
                        <li className="listitem" className={`listitem`}>
                            <Link to="/">
                                <h6 className={`categorylink px-2`}>
                                    <FontAwesomeIcon icon={faHome} className="mx-3 sidebar-icon"></FontAwesomeIcon>Go Home
                                </h6></Link>
                        </li>
                        { isadmin && 
                        <li className="listitem" className={`listitem ${active == 'users' && 'active_category'}`}>
                            <Link to="/admin/user/managment">
                                <h6 className="categorylink px-2">
                                    <FontAwesomeIcon icon={faUser} className="mx-3 sidebar-icon"></FontAwesomeIcon> Users
                                </h6></Link>
                        </li>}
                        { isadmin && 
                        <li className="listitem" className={`listitem ${active == 'managers' && 'active_category'}`}>
                            <Link to="/admin/managers">
                                <h6 className="categorylink px-2">
                                    <FontAwesomeIcon icon={faUsers} className="mx-3 sidebar-icon"></FontAwesomeIcon>Managers
                                </h6></Link>
                        </li>}
                        { isadmin && 
                        <Link to="/admin/category">
                            <li className={`listitem ${active == 'categories' && 'active_category'}`}>
                                <h6 className={`categorylink px-2 ${active == 'categories' && 'active_category'}`}>
                                    <FontAwesomeIcon icon={faTags} className="mx-3 sidebar-icon"></FontAwesomeIcon>Categories
                                </h6>
                            </li>
                        </Link>}
                        <Link to="/admin/products/add">
                            <li className={`listitem ${active == 'add_products' && 'active_category'}`}>
                                <h6 className={`categorylink px-2 ${active == 'add_products' && 'active_category'}`}>
                                    <FontAwesomeIcon icon={faPlusSquare} className="mx-3 sidebar-icon"></FontAwesomeIcon> Add Products
                                </h6>
                            </li>
                        </Link>
                        <Link to="/admin/products">
                            <li className={`listitem ${active == 'products' && 'active_category'}`}>
                                <h6 className={`categorylink px-2 ${active == 'products' && 'active_category'}`}>
                                    <FontAwesomeIcon icon={faBarcode} className="mx-3 sidebar-icon"></FontAwesomeIcon>Products
                                </h6>
                            </li>
                        </Link>
                            
            { isadmin && 
            <Link to="/manager/newsletter">
              <li
                className="listitem"
                className={`listitem ${
                  active == "newsletters" && "active_category"
                }`}
              >
                <h6
                  className={`categorylink px-2 ${
                    active == "newsletters" && "active_category"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faSuitcase}
                    className="mx-3 sidebar-icon"
                  ></FontAwesomeIcon>
                  Subscribers
                </h6>
              </li>
              </Link> }
            <Link to="/manager/orders">
              <li className="listitem">
                <h6 className="categorylink px-2">
                  <FontAwesomeIcon
                    icon={faClipboardCheck}
                    className="mx-3 sidebar-icon"
                  ></FontAwesomeIcon>
                  Orders
                </h6>
              </li>
            </Link>
            <Link to="/manager/offers">
              <li
                className="listitem"
                className={`listitem ${
                  active == "offers" && "active_category"
                }`}
              >
                <h6
                  className={`categorylink px-2 ${
                    active == "offers" && "active_category"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faGift}
                    className="mx-3 sidebar-icon"
                  ></FontAwesomeIcon>
                  Offers
                </h6>
              </li>
            </Link>
            { isadmin && 
            <Link to="/admin/comments">
              <li className="listitem">
                <h6 className="categorylink px-2">
                  <FontAwesomeIcon
                    icon={faComment}
                    className="mx-3 sidebar-icon"
                  ></FontAwesomeIcon>
                  Comments
                </h6>
              </li>
            </Link>}
            <li 
            onClick={() => this.signoutuser()}
            className={`listitem click`}>
                <h6 className={`categorylink px-2 `}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="mx-3 sidebar-icon"></FontAwesomeIcon>Logout
                </h6>
              </li>
          </ul>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth || {},
});

const mapDispatchToProps = {
  SignOut,
};


export default connect(mapStateToProps , mapDispatchToProps )(withRouter(AdminSidebar));
