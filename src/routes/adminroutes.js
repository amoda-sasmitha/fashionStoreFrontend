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


// admin components 

import AdminLogin from '../views/admin/adminlogin'
import AdminCategory from '../views/admin/admin.category'

import AdminManager from '../views/admin/admin.managers'



let adminRoutes = [
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

  // all users
  {
    path: "/all",
    name: "AllUsers",
    component: AllUsers,
    exact: true,
  },  // admin path ---------------------------------------------------------------------------------
  {
    path: "/admin",
    name: "Adminlogin",
    component: AdminLogin,
    exact: true,
  },
  {
    path: "/admin/category",
    name: "admin_category",
    component: AdminCategory,
    exact: true,
  },
  {
    path: "/admin/managers",
    name: "admin_manager",
    component: AdminManager,
    exact: true,
  },
  {
    path: "/*",
    name: "Adminlogin",
    component: AdminLogin,
    exact: true,
  }

];

export default adminRoutes;
