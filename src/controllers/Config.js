// import confirm alerts
import { confirmAlert } from "react-confirm-alert";

class Config {
    constructor() {
    //backend server details
      // this.host = "http://3.19.240.108";
      this.host = "http://127.0.0.1";
      this.port = ":4000";
    }
  
    // alert show
    async showAlert(_msg, _title) {
      await confirmAlert({
        title: _title || "Alert",
        message: _msg,
        buttons: [
          {
            label: "Ok"
          }
        ]
      });
  
      return 0;
    }

    setImage(url){
      return `${this.host}${this.port}/${url.replace("/","\\" )}`
    }
  
    
  }
  
  var obj = new Config();
  export default obj;
  
