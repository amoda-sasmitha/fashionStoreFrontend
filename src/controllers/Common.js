import axios from "axios";
import Config from "./Config";

export const getCounts = search => {
    return new Promise( (resolve,reject) => {
        return axios.get(`${Config.host}${Config.port}/common/counts`)
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

export const getRevenue = search => {
    return new Promise( (resolve,reject) => {
        return axios.get(`${Config.host}${Config.port}/common/revenue`)
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
export const getlatestComments  = count  => {
    return new Promise( (resolve,reject) => {
        return axios.get(`${Config.host}${Config.port}/common/latestcomments/${count}`)
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