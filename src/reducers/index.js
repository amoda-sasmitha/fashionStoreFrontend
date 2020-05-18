import { combineReducers } from "redux";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducers from "./userReducers";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";

const persistconfig = {
  key: "root",
  storage,
  whitelist: ["cart", "auth", "wishlist"],
};

const rootReducer = combineReducers({
  users: userReducers,
  auth: authReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
});

export const root = (state, action) =>
  rootReducer(action.type === "USER_LOGOUT" ? undefined : state, action);

export default persistReducer(persistconfig, root);
