import axios from "axios";
import Config from "./Config";

export const insertOrder = (data) => {
    
    return new Promise( (resolve,reject) => {
        return axios.post(`${Config.host}${Config.port}/order/Insert` , { ...data,
            token: null })
            .then( result => {
                    resolve({code : 200 , message : result.data.message })
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}

export const getAllOrders = () => {
    return new Promise( (resolve,reject) => {
        return axios.get(`${Config.host}${Config.port}/order/GetAll`)
            .then( result => {
               if(result.data.code == 200){
                    resolve(result.data.data)
               }else{
                resolve([])
               }
            })
            .catch( err => {
                reject(err)
            })
    })
}