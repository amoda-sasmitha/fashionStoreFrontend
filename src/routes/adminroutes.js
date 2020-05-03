
import AllUsers from '../views/allusers/allusers'

import AdminCategory from '../views/admin/admin.category'
import AdminManager from '../views/admin/admin.managers'
import AddProducts from '../views/admin/admin.add.products'




let adminRoutes = [
  {
    path: "/all",
    name: "AllUsers",
    component: AllUsers,
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
    path: "/admin/products/add",
    name: "admin_product_add",
    component: AddProducts,
    exact: true,
  }
];

export default adminRoutes;
