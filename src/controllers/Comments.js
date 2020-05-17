import axios from "axios";
import Config from "./Config";

export const insertComment = (files, data) => {
  let formdata = new FormData();
  formdata.set("username", data.username);
  formdata.set("rating", data.rating);

  formdata.set("comment", data.comment);

  console.log(files);

  return new Promise((resolve, reject) => {
    return axios
      .post(`${Config.host}${Config.port}/comments/insert`, formdata)
      .then((result) => {
        resolve({ code: 200, message: result.data.message });
      })
      .catch((err) => {
        reject({ code: 0, error: err });
      });
  });
};
