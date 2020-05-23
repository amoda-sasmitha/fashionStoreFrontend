// import myaccount

import MyAccount from "../views/myaccount/myaccount";
import Cart from "../views/products/cart";
import Order from "../views/orders/addOrder";
import Wishlist from "../views/products/wishlist";

import MyOrders from "../views/orders/myOrders";

import COD from '../views/Payments/cod'
import Online from '../views/Payments/online' 

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
    path: "/wishlist",
    name: "Wishlist",
    component: Wishlist,
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
  },
  {
    path: "/cod",
    name: "Cash_on_deliver",
    component: COD,
    exact: true,
  },
  {
    path: "/online",
    name: "Online_Payment",
    component: Online,
    exact: true,
  },
];

export default loginUserRoutes;
