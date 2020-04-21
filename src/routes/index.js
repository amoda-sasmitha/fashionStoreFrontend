import Home from "../views/home";
import Category from "../views/products/category";
import Offers from "../views/offers/offersMain";

// import SignUp
import SignUp from '../views/signup/signUp'

// import sign in 
import SignIn from '../views/signin/signIn'

// import myaccount

import MyAccount from '../views/myaccount/myaccount'
import AllUsers from '../views/allusers/allusers'
let indexRoutes = [

  {
    path: "/",
    name: "Home",
    component: Home,
    exact: true,
  },
  {
    path: "/categories",
    name: "Category",
    component: Category,
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
    // my account  route
    {
      path: "/myaccount",
      name: "MyAccount",
      component: MyAccount,
      exact: true,
    },
    // all users
    {
      path: "/all",
      name: "AllUsers",
      component: AllUsers,
      exact: true,
    }

];

export default indexRoutes;
