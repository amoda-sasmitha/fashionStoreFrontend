import Home from "../views/home";
import Category from "../views/products/category";
import Offers from "../views/offers/offersMain";

// import SignUp
import SignUp from '../views/signup/signUp'

// import sign in 
import SignIn from '../views/signin/signIn'

// admin components 
import AdminLogin from '../views/admin/adminlogin'

// managers signin

import ManagerSignIn from '../views/admin/stockmanager/managers.signin'

//single product page
import singleProduct from '../views/products/singleProduct'
import SingleProduct from "../views/products/singleProduct";

let indexRoutes = [

  {
    path: "/",
    name: "Home",
    component: Home,
    exact: true,
  },
  {
    path: "/categories/:id",
    name: "Category",
    component: Category,
    exact: true,
  },
  {
    path: "/product/:id",
    name: "Product",
    component: SingleProduct,
    exact: true,
  },
  {
    path: "/offers",
    name: "Offers",
    component: Offers,
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
    path: "/*",
    name: "SignIn",
    component: SignIn,
  },
  

];

export default indexRoutes;
