import axios from "axios";
import Config from "./Config";

export const insertComment = (data) => {
  //   let formdata = new FormData();
  //   formdata.set("userid", data.userId);
  //   formdata.set("username", data.username);
  //   formdata.set("produtid", data.produtid);
  //   formdata.set("comment", data.comment);
  //   formdata.set("rating", data.ratings);
  //   formdata.set("created_at", data.Date);

  return new Promise((resolve, reject) => {
    return axios
      .post(`${Config.host}${Config.port}/comment/insert`, data)
      .then((result) => {
        resolve({ code: 200, message: result.data.message });
      })
      .catch((err) => {
        reject({ code: 0, error: err });
      });
  });
};

export const getAllComments = () => {
  return new Promise((resolve, reject) => {
    return axios
      .get(`${Config.host}${Config.port}/comment/getall`)
      .then((result) => {
        if (result.data.code == 200) {
          resolve(result.data.data);
        } else {
          resolve([]);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
