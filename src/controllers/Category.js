import axios from "axios";
import Config from "./Config";

export const getAllCategories = () => {
    return new Promise( (resolve,reject) => {
        return axios.get(`${Config.host}${Config.port}/category/getall`)
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