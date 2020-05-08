
import AllUsers from '../views/allusers/allusers'


import AddProducts from '../views/admin/admin.add.products'

import UserManagment from '../views/admin/admin.users'
import StockManager from "../views/admin/stockmanager/stockmanager";

let managerRoutes = [
    {
        path: "/all",
        name: "AllUsers",
        component: AllUsers,
        exact: true,
    },
    {
        path: "/admin/products/add",
        name: "admin_product_add",
        component: AddProducts,
        exact: true,
    },
    {
        path: "/manager/stock",
        name: "manager_stock_manager",
        component: StockManager,
        exact: true,
    }
];

export default managerRoutes;
