
// user class functions
// import Axios
import Axios from "axios";

// import config
import Config from "./Config";

// import hashmethod
import Crypto from "crypto-js";

// import cookies
// import Cookies from "js-cookie";

import A_ADMIN from './Admin'
class User {
    constructor() {
        // user related apis
        this.api = {
            test: "/api/news/my",
            signin: "/manager/sign",
            getsalt: "/manager/g/salt",
            addOffer :"/offer/insert",
            getAllOffers : "/offer/getall"



        };
    }

    // ======================================================== ================================================================================================================
    // ===============   Sign In ============================== ================================================================================================================
    // ======================================================== ================================================================================================================
    async managerSignIn(email, password, keepMesignedIn, userBrowser) {
        //=============================== first get slat for specific user start  =====================================
        var requestData_salt = {
            uEmail: email
        };
        var resp = 600;
        var userSalt = "";
        await Axios.post(
            `${Config.host}${Config.port}${this.api.getsalt}`,
            requestData_salt
        )
            .then(Response => {
                resp = Response.status;
                userSalt = Response.data._user_salt;
            })
            .catch(err => {
                console.error(err);
                try {
                    resp = err.response.status;
                } catch (error) {
                    resp = 600;
                }
            });

        if (resp !== 200) {
            return resp;
        }
        //=============================== first get slat for specific user end    =====================================
        //=============================== hashed user passowrd          start     =====================================
        var hashedPass = Crypto.SHA256(userSalt + password).toString();

        console.log("salt _______", userSalt);

        //=============================== hashed user passowrd          end       =====================================
        //=============================== after get salt and hashed password then user sign request sent start       =====================================
        var requestData = {
            uEmail: email,
            uPass: hashedPass,
            keepme: keepMesignedIn,
            userBrowser : userBrowser
        };
        console.log("Sign inf dta");
        console.log(requestData);
        var userData = {};
        var resp = 600;
        await Axios.post(
            `${Config.host}${Config.port}${this.api.signin}`,
            requestData
        )
            .then(Response => {
                resp = Response.status;
                userData = Response.data.userData
            })
            .catch(err => {
                console.error(err);
                try {
                    console.error(err);
                    resp = err.response.status;
                } catch (error) {
                    console.log(error);

                    resp = 600;
                }
            });

        if (resp === 200) {
            return userData;
        }
        return resp;
    }
    //=============================== after get salt and hashed password then user sign request sent end       =====================================



    addOffers(title, stitle, discount, size, products, file, token, type){
        let formdata = new FormData();
        formdata.set("token" , A_ADMIN.getToken() );
        formdata.set("type" , A_ADMIN.getType() );
        formdata.set("title" ,title );
        formdata.set("subtitle" , stitle );
        formdata.set("discount" , discount );
        formdata.set("size" , size );
        formdata.set("product_list" , JSON.stringify( products ) );
        formdata.set("token" , token );
        formdata.set("type" , type);
        formdata.append("photos" , file[0]);    
        console.log(file);
        var resp = 600;

        console.log(formdata);
        
        return new Promise( (resolve,reject) => {
            return Axios.post(`${Config.host}${Config.port}${this.api.addOffer}` , formdata)
                .then( result => {
                    console.log(result);
                    
                        resolve({code : 200 , message : result.data.message })
                })
                .catch( err => {
                    console.log(err);
                    
                    reject({ code : 0 , error : err})
                })
        })

    }

    getAllOffersDetails(){
        return new Promise( (resolve,reject) => {
            return Axios.get(`${Config.host}${Config.port}${this.api.getAllOffers}` )
                .then( result => {
                    
                    
                        resolve({code : 200 , data : result.data.data })
                })
                .catch( err => {
                    console.log(err);
                    
                    reject({ code : 0 , error : err})
                })
        })
    }

    deleteOfferWithProducts = (id , product_list, token, type ) => {
    return new Promise( (resolve,reject) => {
        return Axios.delete(`${Config.host}${Config.port}/offer/delete/${id}` ,{
           data : { product_list : product_list, token : token , type: type }
        })
            .then( result => {
                    resolve({code : 200 , message : result.data.message })
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}





























}
var UserObject = new User();
export default UserObject;