
import Home from '../views/home';
import Category from '../views/products/category';

// import SignUp
import SignUp from '../views/signup/signUp'

// import sign in 
import SignIn from '../views/signin/signIn'


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
    // sign up route
    {
      path: "/signup",
      name: "SignUp",
      component: SignUp,
      exact: true,
    },
    // sign up route
    {
      path: "/signin",
      name: "SignIn",
      component: SignIn,
      exact: true,
    }
];

export default indexRoutes;