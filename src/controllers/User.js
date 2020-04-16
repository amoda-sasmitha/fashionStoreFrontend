
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
            addUser:"/user/adduser"

        };
    }




    // ======================================================== 
    // =============== Sign Up      begins here =============== 
    // ======================================================== 
    async Signup(uFname, uLname, uEmail, uPass) {
        var _salt = this.generateSalt(20);
        var hashedPass = Crypto.SHA256(_salt + uPass).toString();
        var createdDateandTime =  new Date().toLocaleString();
        var requestData = {
            firstname: uFname,
            lastname: uLname,
            useremail: uEmail,
            password: hashedPass,
            salt: _salt,
            created_at:createdDateandTime
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
}


var UserObject = new User();
export default UserObject;