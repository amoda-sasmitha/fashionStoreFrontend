
// user class functions 
// import Axios 
import Axios from "axios";

// import config
import Config from "./Config";

// import hashmethod
import Crypto from "crypto-js";

// import cookies 
import Cookies from "js-cookie";

import C_Config from '../controllers/Config'

class User {
    constructor() {
        // user related apis
        this.api = {
            test: "/api/news/my",
            addUser: "/user/adduser",
            signin: "/user/signin",
            getsalt: "/user/getsalt",
            resetPassoword: '/user/reset/user/pw',
            profilepic: "/user/u/pp/up",
            getSpecificUser: "/user/u/my/user",
            chengeusername: "/user/u/my/uname"

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
    async userSignIn(email, password, keepMesignedIn) {
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
            keepme: keepMesignedIn
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
    // ===============   Reset Password              start here  ===============================================================================================================
    // ======================================================== ================================================================================================================

    async resetPassoword(password) {
        console.log("BEFORE HAS", password);


        var token = this.getToken();
        var _salt = this.generateSalt(20);
        var hashedPass = Crypto.SHA256(_salt + password).toString();
        var _id = this.getId()




        var requestData = {
            userEmail: this.getEmail(),
            userId: _id,
            newHashedPass: hashedPass,
            newSalt: _salt,
            token: token
        }

        var resp = 201;

        await Axios.post(
            `${Config.host}${Config.port}${this.api.resetPassoword}`,
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

    // ======================================================= ================================================================================================================
    // ===============   Reset Password              end  here  ===============================================================================================================
    // ======================================================== ================================================================================================================















    // ======================================================= ================================================================================================================
    // ===============   set cookies when user login  start here ===============================================================================================================
    // ======================================================== ================================================================================================================

    setCookies(token, fname, lname, email, createdat, lastSignin, id, persist) {
        var secureState = false;
        var sign = true;
        var type = "user"
        if (persist) {
            Cookies.set("cNf", btoa(lname), { expires: 30, secure: secureState });
            Cookies.set("cNl", btoa(fname), { expires: 30, secure: secureState });
            Cookies.set("cM", btoa(email), { expires: 30, secure: secureState });
            Cookies.set("cTok", token, { expires: 30, secure: secureState });
            Cookies.set("cCre", btoa(createdat), { expires: 30, secure: secureState });
            Cookies.set("cLsi", btoa(lastSignin), { expires: 30, secure: secureState });
            Cookies.set("cId", btoa(id), { expires: 30, secure: secureState });
            Cookies.set("type", type, { expires: 30, secure: secureState });
            Cookies.set("sin", btoa(sign), { expires: 30, secure: secureState });
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
    // ===============   sign out        start      ==============================================================================================================
    // ======================================================== ================================================================================================================
    signOut() {




        Cookies.remove("cId");
        Cookies.remove("cM");
        Cookies.remove("sin");
        Cookies.remove("cTok");
        Cookies.remove("cNf");
        Cookies.remove("cCre");
        Cookies.remove("cNl");
        Cookies.remove("cLsi");
        Cookies.remove("type");
        C_Config.showAlert("Sucessfully logout")
        setTimeout(() => {
            window.location.replace("/");
        }, 2000)
        // window.location.replace("/");
    }

    // ======================================================= ================================================================================================================
    // ===============   sign out      end        ==============================================================================================================
    // ======================================================== ================================================================================================================


    // ======================================================= ================================================================================================================
    // ===============  get user details from cookies  start here =============================================================================================================
    // ======================================================== ================================================================================================================

    // get token
    getToken() {
        if (Cookies.get("cTok") != null || Cookies.get("cTok") != undefined) {

            return Cookies.get("cTok");
        }
        return false;
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

        if (Cookies.get("cM") != null || Cookies.get("cM") != undefined) {
            return atob(Cookies.get("cM"));
        }
        return false;

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


    // ======================================================= ================================================================================================================
    // ===============  get user details from cookies  end   here =============================================================================================================
    // ======================================================== ================================================================================================================



    // ======================================================= ================================================================================================================
    // ===============   Upload profile picture  ===============================================================================================================
    // ======================================================== ================================================================================================================
    async uploadProfilePic(file) {
        var requestData = new FormData();
        requestData.set("uId", this.getId())
        requestData.set("uEmail", this.getEmail())
        requestData.append("photos", file)

        var resp = 500;

        //   await  console.log(requestData.get('photos'));


        await Axios.post(
            `${Config.host}${Config.port}${this.api.profilepic}`,
            requestData,

        )
            .then((Response) => {
                resp = Response.status;
            })
            .catch((err) => {
                console.error(err);

                try {
                    resp = err.response.status;
                } catch (error) {
                    resp = 600;
                }
            });

        console.log(resp);

        return resp;

    }



    // ======================================================= ================================================================================================================
    // ===============  get specific user  ===============================================================================================================
    // ======================================================== ================================================================================================================

    async getSpecificUser() {
        var requestData = {
            uEmail: this.getEmail(),
            token: this.getToken()
        }
        var resp = 500;
        var userData = {};
        //   await  console.log(requestData.get('photos'));


        await Axios.post(
            `${Config.host}${Config.port}${this.api.getSpecificUser}`,
            requestData,

        )
            .then((Response) => {
                resp = Response.status;
                userData = Response.data
            })
            .catch((err) => {
                console.error(err);

                try {
                    resp = err.response.status;
                } catch (error) {
                    resp = 600;
                }
            });

        console.log(resp);

        var user = {
            res: resp,
            data: userData
        }


        return user;


    }
    // ======================================================= ================================================================================================================
    // ===============  change user name      ===============================================================================================================
    // ======================================================== ================================================================================================================

    async changeUsernameFunction(fname, lname) {

        var requestData = {
            fname: fname,
            lname: lname,
            uEmail: this.getEmail(),
            token: this.getToken()
        }

        var resp = 500;



        await Axios.post(
            `${Config.host}${Config.port}${this.api.chengeusername}`,
            requestData,

        )
            .then((Response) => {
                resp = Response.status;

            })
            .catch((err) => {
                console.error(err);

                try {
                    resp = err.response.status;
                } catch (error) {
                    resp = 600;
                }
            });

        console.log(resp);


        return resp;

    }



}
var UserObject = new User();
export default UserObject;