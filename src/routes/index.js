import Home from "../views/home";
import Category from "../views/products/category";
import Offers from "../views/offers/offersMain";

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
];

export default indexRoutes;
