
// import myaccount
import MyAccount from '../views/myaccount/myaccount'
import Cart from '../views/products/cart'

let loginUserRoutes = [
  // my account  route
  {
    path: "/myaccount",
    name: "MyAccount",
    component: MyAccount,
    exact: true,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    exact: true,
  },
];

export default loginUserRoutes;
