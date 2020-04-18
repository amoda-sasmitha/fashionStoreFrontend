
// user class functions 
// import Axios 
import Axios from "axios";

// import config
import Config from "./Config";

// import hashmethod
import Crypto from "crypto-js";

class User {
    constructor() {
        // user related apis
        this.api = {
            test: "/api/news/my",
            addUser: "/user/adduser",
            signin: "/user/signin",
            getsalt: "/user/getsalt"

        };
    }




    // ======================================================== 
    // =============== Sign Up      begins here =============== 
    // ======================================================== 
    async Signup(uFname, uLname, uEmail, uPass) {
        var _salt = this.generateSalt(20);
        var hashedPass = Crypto.SHA256(_salt + uPass).toString();
        var createdDateandTime = new Date().toLocaleString();
        var requestData = {
            firstname: uFname,
            lastname: uLname,
            useremail: uEmail,
            password: hashedPass,
            salt: _salt,
            created_at: createdDateandTime
        };

        var resp = 201;

        console.log("User Details +++++++++++++++++++++++++++++++");
        console.log(requestData);


        await Axios.post(
            `${Config.host}${Config.port}${this.api.addUser}`,
            requestData
        )
            .then(Response => {
                resp = Response.status;
            })
            .catch(err => {
                console.error(err);
                try {
                    resp = err.response.status;
                } catch (error) {
                    resp = 600;
                }
            });

        return resp;
    }
    // ======================================================== 
    // =============== Sign Up      end    here =============== 
    // ======================================================== 

    // ======================================================== 
    // ===============   Generate Salt  begins here =============== 
    // ======================================================== 

    generateSalt(len) {
        var randString = "";
        const cList =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < len; i++) {
            randString += cList.charAt(Math.floor(Math.random() * cList.length));
        }
        return randString;
    }
    // ======================================================== 
    // ===============   Generate Salt end  here    =============== 
    // ======================================================== 








    // ======================================================== 
    // ===============   Sign In               =============== 
    // ========================================================

    async userSignIn(email, password) {

    //=============================== first get slat for specific user start  =====================================
        var requestData_salt = {
             useremail: email
         }; 
         var resp = 600;
         var userSalt = "";
     
         await Axios.post(
           `${Config.host}${Config.port}${this.api.getsalt}`,
           requestData_salt
         )
           .then(Response => {
             resp = Response.status;
             userSalt = Response.data.salt;
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
    //=============================== hashed user passowrd          end       ===================================== 


        var hashedPass = Crypto.SHA256(password).toString();
        var requestData = {
            uEmail: email,
            uPass: hashedPass,
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
                    resp = err.Response.status;
                } catch (error) {
                    resp = 600;
                }
            });

        if (resp === 200) {
            return userData;
        }

        return resp;

    }
}


var UserObject = new User();
export default UserObject;