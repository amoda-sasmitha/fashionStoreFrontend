
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
            addUser: "/user/adduser",
            signin: "/user/signin",
            getsalt: "/user/getsalt"

        };
    }
    // ======================================================== ================================================================================================================
    // =============== Sign Up      begins here =============== ================================================================================================================
    // ======================================================== ================================================================================================================
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
    // ======================================================== ================================================================================================================
    // =============== Sign Up      end    here =============== ================================================================================================================
    // ======================================================== ================================================================================================================

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
    async userSignIn(email, password) {
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
    // ===============   set cookies when user login  start here ===============================================================================================================
    // ======================================================== ================================================================================================================

    setCookies(token, fname, lname, email, createdat, lastSignin, persist) {
        var secureState = false;

        if (persist) {
            Cookies.set("cNf", btoa(lname), { expires: 30, secure: secureState });
            Cookies.set("cNl", btoa(fname), { expires: 30, secure: secureState });
            Cookies.set("cM", btoa(email), { expires: 30, secure: secureState });
            Cookies.set("cTok", token, { expires: 30, secure: secureState });
            Cookies.set("cCre", btoa(createdat), { expires: 30, secure: secureState });
            Cookies.set("cLsi", btoa(lastSignin), { expires: 30, secure: secureState });
        } else {
            Cookies.set("cNf", btoa(lname), { secure: secureState });
            Cookies.set("cNl", btoa(fname), { secure: secureState });
            Cookies.set("cM", btoa(email), { secure: secureState });
            Cookies.set("cTok", token, { secure: secureState });
            Cookies.set("cCre", btoa(createdat), { secure: secureState });
            Cookies.set("cLsi", btoa(lastSignin), { secure: secureState });
        }
    }

    // ======================================================= ================================================================================================================
    // ===============   set cookies when user login  end here ===============================================================================================================
    // ======================================================== ================================================================================================================

    // ======================================================= ================================================================================================================
    // ===============   chekc signed in start here               ==============================================================================================================
    // ======================================================== ================================================================================================================
    checkSignedIn() {
        if (
            Cookies.get("cN") === undefined ||
            Cookies.get("cM") === undefined ||
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
    getName() {
        return atob(Cookies.get("cNf"));
    }
    // get lname
    getName() {
        return atob(Cookies.get("cNl"));
    }
    // get email
    getEmail() {
        return atob(Cookies.get("cM"));
    }
    // get created at
    getEmail() {
        return atob(Cookies.get("cCre"));
    }
    // get last sign in 
    getEmail() {
        return atob(Cookies.get("cLsi"));
    }


    // ======================================================= ================================================================================================================
    // ===============  get user details from cookies  end   here =============================================================================================================
    // ======================================================== ================================================================================================================
}


var UserObject = new User();
export default UserObject;