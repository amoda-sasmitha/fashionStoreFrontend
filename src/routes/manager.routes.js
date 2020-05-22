
import AllUsers from '../views/allusers/allusers'


import AddProducts from '../views/admin/admin.add.products'
import Dashboard from '../views/admin/admin.dashboard'
import UpdateProducts from '../views/admin/admin.update.products'

// import UserManagment from '../views/admin/admin.users'
import StockManager from "../views/admin/stockmanager/stockmanager";
import ManagersOffers from "../views/admin/stockmanager/managers.offers"
import allOrders from "../views/orders/allOrders"
import moreDetails from "../views/orders/moreDetails"


import NewsLetter from '../views/admin/admin.newsletter'
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
        path: "/admin/dashboard",
        name: "dashboard",
        component: Dashboard,
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
    {
        path: "/manager/newsletter",
        name: "manager_newsetter",
        component: NewsLetter,
        exact: true,
    },
    {
        path: "/manager/orders",
        name: "manager_orders",
        component: allOrders,
        exact: true,
    },
    {
        path: "/manager/orders/getOrder/:id",
        name: "manager_orders_update",
        component: moreDetails,
        exact: true,
    },
];

export default managerRoutes;
