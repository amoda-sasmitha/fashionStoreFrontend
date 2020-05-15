
import AllUsers from '../views/allusers/allusers'


import AddProducts from '../views/admin/admin.add.products'
import UpdateProducts from '../views/admin/admin.update.products'

// import UserManagment from '../views/admin/admin.users'
import StockManager from "../views/admin/stockmanager/stockmanager";
import ManagersOffers from "../views/admin/stockmanager/managers.offers"

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
        path: "/admin/products/update/:id",
        name: "admin_product_update",
        component: UpdateProducts,
        exact: true,
    },
    {
        path: "/manager/stock",
        name: "manager_stock_manager",
        component: StockManager,
        exact: true,
    },
    {
        path: "/manager/offers",
        name: "manager_offers",
        component: ManagersOffers,
        exact: true,
    },

];

export default managerRoutes;
