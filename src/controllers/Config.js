// import confirm alerts
import { confirmAlert } from "react-confirm-alert";
import { toast } from 'react-toastify';
class Config {
    constructor() {
    //backend server details
      // this.host = "http://3.19.240.108";
      this.host = "http://127.0.0.1";
      // this.host = "http://52.170.158.52";
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
      return `${this.host}${this.port}/${url.replace(/\\/g, '/')}`
    }

    setToast(msg){
      toast( msg, {
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
    }

    setErrorToast(msg){
      toast.error( msg, {
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
    }

  calcualte_total = cart => {
      let sum = cart.reduce( ( acc , current ) => {
          let total = parseFloat(current.product.price) * parseFloat(current.quantity)
          if(current.product.discount && current.product.discount > 0 && current.product.discount < 100 ){
            let discount =  parseFloat(current.product.discount);
            total = total - ( total * discount / 100 )
        }
          return acc + total
      } , 0)
      return (Math.round(sum * 100) / 100).toFixed(2);
  }

  calculate_full_total = cart => {
      let sum = cart.reduce( ( acc , current ) => {
          let total = parseFloat(current.product.price) * parseFloat(current.quantity)
          return acc + total
      } , 0)
      return (Math.round(sum * 100) / 100).toFixed(2);
  }

  calcualte_discount = cart => {
      let sum = cart.reduce( ( acc , current ) => {
          let total = 0;
          if(current.product.discount && current.product.discount > 0 && current.product.discount < 100 ){
            total = parseFloat(current.product.price) * parseFloat(current.quantity)
            let discount =  parseFloat(current.product.discount);
            total = total * discount / 100
          }
          return acc + total
      } , 0)
      
      return (Math.round(sum * 100) / 100).toFixed(2);
  }

  setDiscountedPrice = (price , discount) =>{
    let value =  parseFloat(price) - ( parseFloat(price) * parseFloat(discount) / 100)
    return (Math.round(value * 100) / 100).toFixed(2);
  }

    setDeleteConfirmAlert(title , msg , confirm , cancel ){
      confirmAlert({
        title: title,
        message: msg,
        buttons: [
          {
            label: 'Yes',
            onClick: () => confirm()
          },
          {
            label: 'No',
            onClick: () => cancel()
          }
        ]
      });
    }
  
    
  }
  
  var obj = new Config();
  export default obj;
  
