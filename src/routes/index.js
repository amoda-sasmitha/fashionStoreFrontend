import Home from "../views/home";
import Category from "../views/products/category";
import Offers from "../views/offers/offersMain";

// import SignUp
import SignUp from '../views/signup/signUp'


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
    // sign up route
    {
      path: "/sign",
      name: "SignIn",
      component: SignUp,
      exact: true,
    }

];

export default indexRoutes;
