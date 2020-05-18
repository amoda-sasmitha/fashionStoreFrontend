import { GET, GET_WISHLIST } from "./types";
import axios from "axios";
import Config from "../controllers/Config";
import User from "../controllers/User";

export const addtoWishlist = (product_id, user_id) => {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      axios
        .post(`${Config.host}${Config.port}/wishlist/insert`, {
          userid: user_id,
          product_id: product_id,
        })
        .then((result) => {
          // console.log( "API" , result.data);
          dispatch(getWishlist(user_id));
          return resolve({
            type: "success",
            message: "Item Added Successfully",
          });
        })
        .catch((error) => {
          console.log(error);
          reject({ type: "failed", message: "failed" });
          console.log("menna meke thamai failed kiyala enne");
        });
    }).catch((err) => {
      throw err;
    });
};

export const getWishlist = (userid) => {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      axios
        .get(`${Config.host}${Config.port}/wishlist/get/${userid}`)
        .then((result) => {
          console.log("API", result.data);
          dispatch({ type: GET_WISHLIST, payload: result.data.data });
          return resolve({
            type: "success",
            message: "get wishlist Successfully",
          });
        })
        .catch((error) => {
          console.log(error);
          reject({ type: "failed", message: "failed" });
        });
    }).catch((err) => {
      throw err;
    });
};
