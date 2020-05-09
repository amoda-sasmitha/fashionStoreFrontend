import axios from "axios";
import Config from "./Config";

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

export const getAllProductByCategory = cateogry_name => {
    return new Promise( (resolve,reject) => {
        return axios.get(`${Config.host}${Config.port}/product/get/${cateogry_name}`)
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

export const getProductById = id => {
    return new Promise( (resolve,reject) => {
        return axios.get(`${Config.host}${Config.port}/product/getsingle/${id}`)
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




export const insertProduct = (files , data) => {
    let formdata = new FormData();
    formdata.set("name" , data.name );
    formdata.set("price" , data.price );
    formdata.set("description" , data.description );
    formdata.set("category" , JSON.stringify( data.category ) );
    formdata.set("brand" , data.brand );
    formdata.set("sizes" , JSON.stringify( data.sizes) );
    formdata.set("tags" , JSON.stringify( data.tags ) );
    formdata.set("colors" , JSON.stringify( data.colors) );
    formdata.set("added_by" , data.added_by );
    console.log(files);
    for (let i = 0; i < files.length; i++) {
        formdata.append("photos" , files[i]);    
    }
    

    return new Promise( (resolve,reject) => {
        return axios.post(`${Config.host}${Config.port}/product/insert` , formdata)
            .then( result => {
                    resolve({code : 200 , message : result.data.message })
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}