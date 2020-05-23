import AllUsers from "../views/allusers/allusers";

import AdminCategory from "../views/admin/admin.category";
import AdminManager from "../views/admin/admin.managers";
import AddProducts from "../views/admin/admin.add.products";
import NewsLetter from '../views/admin/admin.newsletter'

import UserManagment from "../views/admin/admin.users";
import AdminCommets from "../views/admin/admin.comment";

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
    path: "/admin/user/managment",
    name: "admin_user_managment",
    component: UserManagment,
    exact: true,
  },
  {
    path: "/admin/comments",
    name: "admin_comments",
    component: AdminCommets,
    exact: true,
  },
  {
    path: "/manager/newsletter",
    name: "manager_newsetter",
    component: NewsLetter,
    exact: true,
},
];

export default adminRoutes;
