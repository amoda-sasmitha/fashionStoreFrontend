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

export const insertCategory = (files , data) => {
    let formdata = new FormData();
    formdata.set("name" , data.name );
    formdata.set("banner_title" , data.banner_title );
    formdata.set("banne_subtitle" , data.banne_subtitle );
    formdata.append("photos" , files);

    return new Promise( (resolve,reject) => {
        return axios.post(`${Config.host}${Config.port}/category/insert` , formdata)
            .then( result => {
                    resolve({code : 200 , message : result.data.message })
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}

export const updateCategory = (files , data , newImage ) => {
    let formdata = new FormData();
    formdata.set("name" , data.name );
    formdata.set("banner_title" , data.banner_title );
    formdata.set("banne_subtitle" , data.banne_subtitle );
    if(newImage){
        formdata.append("photos" , files);
    }
    return new Promise( (resolve,reject) => {
        return axios.patch(`${Config.host}${Config.port}/category/update/${data._id}` , formdata)
            .then( result => {
                    resolve({code : 200 , message : result.data.message })
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}

export const deleteCategory = id => {

    return new Promise( (resolve,reject) => {
        return axios.delete(`${Config.host}${Config.port}/category/delete/${id}`)
            .then( result => {
                    resolve({code : 200 , message : result.data.message })
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}