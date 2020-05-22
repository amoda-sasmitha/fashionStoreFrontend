import Home from "../views/home";

import Category from "../views/products/category";

import searchProduct from "../views/products/searchProduct";
import Offers from "../views/offers/offersMain";
import OffersDetails from "../views/offers/offersDetails";

// import SignUp
import SignUp from '../views/signup/signUp'

// import sign in 
import SignIn from '../views/signin/signIn'

// admin components 
import AdminLogin from '../views/admin/adminlogin'

// managers signin

import ManagerSignIn from '../views/admin/stockmanager/managers.signin'

//single product page
import SingleProduct from "../views/products/singleProduct";


// statis page
import ContactUs from '../views/Staticspages/contactus'
import AboutUs from '../views/Staticspages/aboutus'
import TOS from '../views/Staticspages/tos'
import PP from '../views/Staticspages/pp'


import ResetPassword from '../views/forgotpw/forgotpw'




let indexRoutes = [

  {
    path: "/",
    name: "Home",
    component: Home,
    exact: true,
  },


  // sign up route
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    exact: true,
  },
  // sign in route
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
    exact: true,
  },
  {
    path: "/admin",
    name: "Adminlogin",
    component: AdminLogin,
    exact: true,
  },
  {
    path: "/manager",
    name: "ManagerSignin",
    component: ManagerSignIn,
    exact: true,
  },
  {
    path: "/offers",
    name: "Offers",
    component: Offers,
    exact: true,
  },
  {
    path: "/offers/details/:id",
    name: "OffersDetails",
    component: OffersDetails,
    exact: true,
  },
  {
    path: "/contactus",
    name: "Contact_Us",
    component: ContactUs,
    exact: true,
  },
  {
    path: "/aboutus",
    name: "AboutUs",
    component: AboutUs,
    exact: true,
  },
  {
    path: "/pp",
    name: "PP",
    component: PP,
    exact: true,
  },
  {
    path: "/resetpw",
    name: "ResetPW",
    component: ResetPassword,
    exact: true,
  },
  {
    path: "/tos",
    name: "TOS",
    component: TOS,
    exact: true,
  },
  {
    path: "/categories/:id",
    name: "Category",
    component: Category,
    exact: true,
  },
  {
    path: "/search/:search",
    name: "Search",
    component: searchProduct,
    exact: true,
  },
  {
    path: "/product/:id",
    name: "Product",
    component: SingleProduct,
    exact: true,
  },

  {
    path: "/*",
    name: "SignIn",
    component: SignIn,
  },
  

];

export default indexRoutes;
