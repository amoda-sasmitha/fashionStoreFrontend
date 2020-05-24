/*  eslint-disable */
import React, { Component } from 'react';
import MainNavbar from '../../components/MainNavbar';
import Footer from '../../components/Footer';
import Config from "../../controllers/Config";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { insertOrder } from '../../controllers/Order'
import { string } from 'prop-types';
import {  cleartCart} from '../../actions/cartActions';
class Order  extends Component {
 
constructor(props){
     super(props);
     this.state = {
        loading : true,
        errors : {},
        amount : '',
        username : this.props.auth.user.fname + " " + this.props.auth.user.lname,
        addressLine1: '',
        addressLine2: '',
        province: '',
        postalCode: '',
        deliveryAddress: '',
        userId: '5eaee2f5c8aa252450f5e8c4',
     }
}

componentDidMount(){
    console.log()
}

formValueChange = (e) => {
    this.setState({[e.target.name] : e.target.value });
 }

 //on form submit
 onFormSubmit = (e) => {
    e.preventDefault();
    console.log("Submited Products: ", this.props.cart.cart);
    const filtered_products = this.props.cart.cart.map( item => {
        return {
            id : item.product.name,
            quantity : item.quantity,
            price : item.product.price,
            selected_size : item.selected_size,
            selected_color : item.selected_color ? item.selected_color : ""
        }
    })

    console.log("Product Array: ", filtered_products);
    
    console.log("User Details: ", this.props.auth.user);
    
    if(this.validate()){
        insertOrder({
            amount : Config.calcualte_total(this.props.cart.cart),
            userId : this.props.auth.user.id,
            userName: this.state.username, 
            deliveryAddress : `${this.state.addressLine1}, ${this.state.addressLine2}, ${this.state.province}, ${this.state.postalCode}`,
            products: filtered_products,
            
        }, this.props.auth.user.token)
        .then( result => {
            this.clearAll();
            this.props.cleartCart &&
            this.props.cleartCart(this.props.auth.user.id, this.props.auth.user.token )
            .then( result => {
               console.log("cleared")
            })
            .catch( err => {
              console.log(err)
            })
            Config.setToast(" Order Placed Successfully" );
            this.props.history.push("/");
        })
        .catch( err => {
            console.log(err);
            Config.setErrorToast("Somthing Went Wrong!");
           
        })
    }
}

render(){
    const { errors , amount, username, addressLine1, addressLine2, province, postalCode } = this.state;
    return (
      <div className="wrapper">
        <MainNavbar></MainNavbar>
        <section className="product-shop spad">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <form
                  className=" py-2  px-3"
                  method="POST"
                  onSubmit={(e) => this.onFormSubmit(e)}
                >
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="form-label py-2">Order Amount</h6>
                      <input
                        type="text"
                        name="amount"
                        value={Config.calcualte_total(this.props.cart.cart)}
                        onChange={(e) => this.formValueChange(e)}
                        placeholder="Amount"
                        className="form-control"
                        readOnly
                      />
                    </div>

                    <div className="col-md-6">
                      <h6 className="form-label py-2">User Name</h6>
                      <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => this.formValueChange(e)}
                        placeholder="User Name"
                        className="form-control"
                        readOnly
                      />
                    </div>

                    <div className="col-md-12">
                      <h6 className="form-label py-2">Delivery Address</h6>
                      <input
                        type="text"
                        name="addressLine1"
                        value={addressLine1}
                        onChange={(e) => this.formValueChange(e)}
                        placeholder="Address Line one"
                        className="form-control"
                      />
                      {errors.addressLine1 &&
                        errors.addressLine1.length > 0 && (
                          <h4 className="small text-danger mt-2 font-weight-bold mb-0">
                            {errors.addressLine1}
                          </h4>
                        )}
                    </div>

                    <div className="col-md-12 mt-3">
                      <input
                        type="text"
                        name="addressLine2"
                        value={addressLine2}
                        onChange={(e) => this.formValueChange(e)}
                        placeholder="Address Line two"
                        className="form-control"
                      />
                      {errors.addressLine2 &&
                        errors.addressLine2.length > 0 && (
                          <h4 className="small text-danger mt-2 font-weight-bold mb-0">
                            {errors.addressLine2}
                          </h4>
                        )}
                    </div>

                    <div className="col-md-8">
                      <h6 className="form-label py-2">Province</h6>
                      <input
                        type="text"
                        name="province"
                        value={province}
                        onChange={(e) => this.formValueChange(e)}
                        placeholder="Province"
                        className="form-control"
                      />
                      {errors.province && errors.province.length > 0 && (
                        <h4 className="small text-danger mt-2 font-weight-bold mb-0">
                          {errors.province}
                        </h4>
                      )}
                    </div>

                    <div className="col-md-4">
                      <h6 className="form-label py-2">Postal Code</h6>
                      <input
                        type="text"
                        name="postalCode"
                        value={postalCode}
                        onChange={(e) => this.formValueChange(e)}
                        placeholder="Postal Code"
                        className="form-control"
                      />
                      {errors.postalCode && errors.postalCode.length > 0 && (
                        <h4 className="small text-danger mt-2 font-weight-bold mb-0">
                          {errors.postalCode}
                        </h4>
                      )}
                    </div>

                    <div className="col-md-12 mt-2">
                      <div className="d-flex">
                        <button
                          className="px-4 btn btn-dark mt-2 btn-sm bold-normal"
                          type="submit"
                        >
                          Submit Order
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-4">
                <h6 className="form-label py-2">Order Details</h6>
                <div style={{overflow: "scroll", height: "400px"}}>
                    {this.props.cart.cart.map( item => this.renderOrderDetails(item) )}
                </div>
                <div className="proceed-checkout mt-3">
                    <ul>
                        <li className="subtotal">Sub-Total <span>LKR {Config.calculate_full_total(this.props.cart.cart)}</span></li>
                        <li className="subtotal">Discount <span>LKR {Config.calcualte_discount(this.props.cart.cart)}</span></li>
                        <li className="subtotal"><b>Total</b> <span>
                            LKR {Config.calcualte_total(this.props.cart.cart)}</span></li>
                    </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer></Footer>
      </div>
    );
}

validate = () => {
    console.log("validate work");
    
    let { errors , amount, username, addressLine1, addressLine2, province, postalCode } = this.state;     
    let count = 0;
    
    if( addressLine1.length == 0 ){
        errors.addressLine1 = "Address line one can not be empty"
        count++
    }else{
        errors.addressLine1 = "" 
    }

    if( addressLine2.length == 0 ){
        errors.addressLine2 = "Address line two can not be empty"
        count++
    }else{
        errors.addressLine2 = "" 
    }

    if( province.length == 0 ){
        errors.province = "Province can not be empty"
        count++
    }else{
        errors.province = "" 
    }

    if( postalCode.length == 0 ){
        errors.postalCode = "Postal Code can not be empty"
        count++
    }else{
        errors.postalCode = "" 
    }

    this.setState({errors});
    return count == 0;
}

clearAll = () => {
    this.setState({
        loading : true,
        errors : {},
        amount : '',
        username : '',
        addressLine1: '',
        addressLine2: '',
        province: '',
        postalCode: '',     
    });
}

renderOrderDetails = (item) => {
    console.log("Order item: ", item)
    return (
        <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">{item.product.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Price: {item.product.price}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Quantity: {item.quantity}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Color: {item.selected_color}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Size: {item.selected_size}</h6>
                </div>
            </div>
    );
}

}

const mapStateToProps = state => ({
    cart : state.cart || {} ,
    auth : state.auth || {} , 
  });
  
  const mapDispatchToProps = {
    cleartCart
  };
  
  export default connect(mapStateToProps , mapDispatchToProps)(withRouter(Order));

