import axios from "axios";
import Config from "./Config";

export const insertComment = (data) => {
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
      .get(`${Config.host}${Config.port}/comment/GetAll`)
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
export const getCommentByProductId = (id) => {
  return new Promise((resolve, reject) => {
    return axios
      .get(`${Config.host}${Config.port}/comment/GetComByProId/${id}`)
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

export const deleteComment = (id) => {
  return new Promise((resolve, reject) => {
    return axios
      .delete(`${Config.host}${Config.port}/comment/delete/${id}`)
      .then((result) => {
        resolve({ code: 200, message: result.data.message });
      })
      .catch((err) => {
        reject({ code: 0, error: err });
      });
  });
};
