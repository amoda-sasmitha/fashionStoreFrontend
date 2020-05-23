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

export const updateOrder = (data) => {
    
    console.log(data);
    
    return new Promise( (resolve,reject) => {
        return axios.patch(`${Config.host}${Config.port}/order/update/${data.id}` , data)
            .then( result => {
                    console.log(result.data)
                    resolve({code : 200 , message : result.data.message })
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}

export const getOrderById = id => {
    console.log(id);

    return new Promise( (resolve,reject) => {
        return axios.get(`${Config.host}${Config.port}/order/getOrder/${id}`)
            .then( result => {
               if(result.data.code == 200){
                    resolve(result.data.data)
               }else{
                reject({error : 'not found'})
               }
            })
            .catch( err => {
                reject(err)
            })
    })
}

export const deleteOrder = id => {

    return new Promise( (resolve,reject) => {
        return axios.delete(`${Config.host}${Config.port}/order/delete/${id}`)
            .then( result => {
                    resolve({code : 200 , message : result.data.message })
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}

export const getOrdersByUserId = id => {
    
    return new Promise( (resolve,reject) => {
        return axios.get(`${Config.host}${Config.port}/order/get/${id}`)
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

export const getAllProducts = () => {
    return new Promise( (resolve,reject) => {
        return axios.get(`${Config.host}${Config.port}/product/getall`)
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