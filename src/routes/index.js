
import Home from '../views/home';
import Category from '../views/products/category';

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
    }
];

export default indexRoutes;