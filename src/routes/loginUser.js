
// import myaccount
import MyAccount from '../views/myaccount/myaccount'

let loginUserRoutes = [
  // my account  route
  {
    path: "/myaccount",
    name: "MyAccount",
    component: MyAccount,
    exact: true,
  },
];

export default loginUserRoutes;
