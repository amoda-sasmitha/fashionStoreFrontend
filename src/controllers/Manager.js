
// user class functions
// import Axios
import Axios from "axios";

// import config
import Config from "./Config";

// import hashmethod
import Crypto from "crypto-js";

// import cookies
import Cookies from "js-cookie";

import A_ADMIN from './Admin'
class User {
    constructor() {
        // user related apis
        this.api = {
            test: "/api/news/my",
            signin: "/manager/sign",
            getsalt: "/manager/g/salt",



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




































}
var UserObject = new User();
export default UserObject;