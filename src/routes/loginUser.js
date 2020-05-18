
// import myaccount
import MyAccount from '../views/myaccount/myaccount'
import Cart from '../views/products/cart'
import Order from '../views/orders/addOrder'
import MyOrders from '../views/orders/myOrders'

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
  {
    path: "/order",
    name: "Order",
    component: Order,
    exact: true,
  },
  {
    path: "/myOrders",
    name: "My Orders",
    component: MyOrders,
    exact: true,
  }
];

export default loginUserRoutes;
