
// user class functions 
// import Axios 
import Axios from "axios";

// import config
import Config from "./Config";

// import hashmethod
import Crypto from "crypto-js";

// import cookies 
import Cookies from "js-cookie";


class User {
    constructor() {
        // user related apis
        this.api = {
            test: "/api/news/my",
            signin: "/admin//sign",
            getsalt: "/admin/g/salt",
            addManager: "/manager/ad/s/m",
            getAllManagers: "/admin/g/all/man",
            getAllUsers: "/admin/g/all/users",
            getAllUserBrowserDetial: "/admin/g/all/users/logins",
            getAllUserTImeDetial: "/admin/g/all/users/time",
            getUserStats: "/admin/g/user/stat",
            getMonthBase: "/admin/g/user/months",
            deleteManager:"/admin/del/man",
            newStat:"/admin/g/test",
            getNewbrowser :"/admin/g/u/test"


        };
    }


    // ======================================================== ================================================================================================================
    // ===============   Generate Salt  begins here =============== =====================================================================================  =====================
    // ======================================================== ================================================================================================================
    generateSalt(len) {
        var randString = "";
        const cList =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < len; i++) {
            randString += cList.charAt(Math.floor(Math.random() * cList.length));
        }
        return randString;
    }
    // ======================================================== ================================================================================================================
    // ===============  Generate Salt end  here =============== ================================================================================================================
    // ======================================================== ================================================================================================================


    // ======================================================== ================================================================================================================
    // ===============   Sign In ============================== ================================================================================================================
    // ======================================================== ================================================================================================================
    async adminSignIn(email, password, keepMesignedIn, userBrowser) {
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
            userBrowser: userBrowser
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

    // ======================================================= ================================================================================================================
    // ===============   Sign In end here====================== ================================================================================================================
    // ======================================================== ================================================================================================================

    // ======================================================= ================================================================================================================
    // ===============   add manager start====================== ================================================================================================================
    // ======================================================== ================================================================================================================


    addManager = async (fname, lname, email, pw, token, type, id) => {
        var _salt = this.generateSalt(20);
        var hashedPass = Crypto.SHA256(_salt + pw).toString();
        var requestData = {
            firstname: fname,
            lastname: lname,
            useremail: email,
            password: hashedPass,
            salt: _salt,
            adminId: id,
            token: token,
            type: type,
            DePas: pw
        }
        var resp = 600;
        var userData = {}
        await Axios.post(
            `${Config.host}${Config.port}${this.api.addManager}`,
            requestData
        )
            .then(Response => {
                console.log(Response);

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
            return resp;
        }


        return resp;


    }



    // ======================================================= ================================================================================================================
    // ===============   add manager end====================== ================================================================================================================
    // ======================================================== ================================================================================================================


    getAllAdmins = (token, type) => {

        var requestData = {
            token: token,
            type: type
        }
        return new Promise((resolve, reject) => {
            return Axios.post(`${Config.host}${Config.port}${this.api.getAllManagers}`, requestData)
                .then(result => {
                    resolve({ code: 200, data: result.data })
                })
                .catch(err => {
                    reject({ code: 0, error: err })
                })
        })
    }

    getAllUsersAdmin = (token, type) => {

        var requestData = {
            token: token,
            type: type
        }
        return new Promise((resolve, reject) => {
            return Axios.post(`${Config.host}${Config.port}${this.api.getAllUsers}`, requestData)
                .then(result => {
                    resolve({ code: 200, data: result.data })
                })
                .catch(err => {
                    reject({ code: 0, error: err })
                })
        })
    }






    getUsersBrowsers = (token, type) => {

        var requestData = {
            token: token,
            type: type
        }
        return new Promise((resolve, reject) => {
            return Axios.post(`${Config.host}${Config.port}${this.api.getNewbrowser}`, requestData)
                .then(result => {
                    resolve({ code: 200, data: result.data })
                })
                .catch(err => {
                    reject({ code: 0, error: err })
                })
        })
    }


    getUserLastLogin = (token, type) => {

        var requestData = {
            token: token,
            type: type
        }
        return new Promise((resolve, reject) => {
            return Axios.post(`${Config.host}${Config.port}${this.api.getAllUserTImeDetial}`, requestData)
                .then(result => {
                    resolve({ code: 200, data: result.data })
                })
                .catch(err => {
                    reject({ code: 0, error: err })
                })
        })
    }


    getUserStats = (token, type) => {

        var requestData = {
            token: token,
            type: type
        }
        return new Promise((resolve, reject) => {
            return Axios.post(`${Config.host}${Config.port}${this.api.getUserStats}`, requestData)
                .then(result => {
                    resolve({ code: 200, data: result.data })
                })
                .catch(err => {
                    reject({ code: 0, error: err })
                })
        })
    }

    getUsageOfMonthBased = (token, type) => {

        var requestData = {
            token: token,
            type: type
        }
        return new Promise((resolve, reject) => {
            return Axios.post(`${Config.host}${Config.port}${this.api.getMonthBase}`, requestData)
                .then(result => {
                    resolve({ code: 200, data: result.data })
                })
                .catch(err => {
                    reject({ code: 0, error: err })
                })
        })
    }
    getUsageOfMonthBasedNew = (token, type) => {

        var requestData = {
            token: token,
            type: type
        }
        return new Promise((resolve, reject) => {
            return Axios.post(`${Config.host}${Config.port}${this.api.newStat}`, requestData)
                .then(result => {
                    resolve({ code: 200, data: result.data })
                })
                .catch(err => {
                    reject({ code: 0, error: err })
                })
        })
    }
    deleteManager = (email, token) => {

        var requestData = {
            managerEmail: email,
            token: token
        }
        return new Promise((resolve, reject) => {
            return Axios.post(`${Config.host}${Config.port}${this.api.deleteManager}`, requestData)
                .then(result => {
                    resolve({ code: 200, data: result.data })
                })
                .catch(err => {
                    reject({ code: 0, error: err })
                })
        })
    }

    




















    // ======================================================= ================================================================================================================
    // ===============   set cookies when user login  start here ===============================================================================================================
    // ======================================================== ================================================================================================================

    setCookies(token, fname, lname, email, createdat, lastSignin, id, persist, type) {
        var secureState = false;
        var sign = true;

        if (persist) {
            Cookies.set("cNf", btoa(lname), { expires: 30, secure: secureState });
            Cookies.set("cNl", btoa(fname), { expires: 30, secure: secureState });
            Cookies.set("cM", btoa(email), { expires: 30, secure: secureState });
            Cookies.set("cTok", token, { expires: 30, secure: secureState });
            Cookies.set("cCre", btoa(createdat), { expires: 30, secure: secureState });
            Cookies.set("cLsi", btoa(lastSignin), { expires: 30, secure: secureState });
            Cookies.set("cId", btoa(id), { expires: 30, secure: secureState });
            Cookies.set("sin", btoa(sign), { expires: 30, secure: secureState });
            Cookies.set("type", type, { expires: 30, secure: secureState });
        } else {
            Cookies.set("cNf", btoa(lname), { secure: secureState });
            Cookies.set("cNl", btoa(fname), { secure: secureState });
            Cookies.set("cM", btoa(email), { secure: secureState });
            Cookies.set("cTok", token, { secure: secureState });
            Cookies.set("cCre", btoa(createdat), { secure: secureState });
            Cookies.set("cLsi", btoa(lastSignin), { secure: secureState });
            Cookies.set("sin", btoa(sign), { secure: secureState });
            Cookies.set("cId", btoa(id), { secure: secureState });
            Cookies.set("type", type, { secure: secureState });

        }
    }


    // ======================================================= ================================================================================================================
    // ===============   chekc signed in start here               ==============================================================================================================
    // ======================================================== ================================================================================================================
    checkSignedIn() {
        if (
            Cookies.get("cId") === undefined ||
            Cookies.get("cM") === undefined ||
            Cookies.get("sin") === undefined ||
            Cookies.get("cTok") === undefined
        ) {
            return false;
        } else {


            return true;
        }
    }

    // ======================================================= ================================================================================================================
    // ===============   chekc signed in end   here               ==============================================================================================================
    // ======================================================== ================================================================================================================



    // ======================================================= ================================================================================================================
    // ===============  get user details from cookies  start here =============================================================================================================
    // ======================================================== ================================================================================================================

    // get token
    getToken() {
        return Cookies.get("cTok");
    }
    // get fname
    getLName() {
        return atob(Cookies.get("cNf"));
    }
    // get lname
    getFName() {
        return atob(Cookies.get("cNl"));
    }
    // get email
    getEmail() {
        return atob(Cookies.get("cM"));
    }
    // get created at
    getCreateDate() {
        return atob(Cookies.get("cCre"));
    }
    // get last sign in 
    getLastSignin() {
        return atob(Cookies.get("cLsi"));
    }
    // get id  
    getId() {
        return atob(Cookies.get("cId"));
    }
    // get id  
    getType() {
        return Cookies.get("type");
    }

}
var UserObject = new User();
export default UserObject;