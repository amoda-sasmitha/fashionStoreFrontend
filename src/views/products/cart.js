/*  eslint-disable */
import React, { Component } from 'react';
import { Link , withRouter} from "react-router-dom";
import { connect} from 'react-redux'
import MainNavbar from "../../components/MainNavbar";
import Footer from "../../components/Footer";
import Config from "../../controllers/Config";
import moment from 'moment'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTrash , faPlus , faMinus} from '@fortawesome/free-solid-svg-icons'
import { getCart , updateCartItem , deleteCartItem , cleartCart} from '../../actions/cartActions';

class Cart extends Component {

    constructor(props){
        super(props);  
        this.state = {
            loading : true,
        } 
    }

    componentDidMount(){
        this.props.getCart && 
        this.props.getCart()
        .then(result => {
            this.setState({loading: false});
        })
        .catch(err => {
            console.log(err);
            this.setState({loading: false});
        })
    }

    changeQuantity = (item, is_increment) => {
        if(!is_increment && item.quantity == 1){
            Config.setToast("Can't Decrement less than one!")
        }else{
            let qty =  parseInt(item.quantity);
            this.props.updateCartItem &&
            this.props.updateCartItem({
                id : item._id,
                quantity : is_increment ? qty + 1 : qty - 1
            })
            .then( result => {
                Config.setToast(`One ${item.product.name} ${is_increment ? 'Added':'Removed'} to Cart`)
            })
        }
    }

    onClickDelete = item => {
        Config.setDeleteConfirmAlert(
            null,
            `Are You Sure You Want to Delete ${item.product.name} ?`,
            () => {
                this.props.deleteCartItem &&
                this.props.deleteCartItem(item._id)
                .then( result => {
                    Config.setToast("Item Deleted Successfully!")
                })
                .catch( err => {
                    Config.setErrorToast("Something Went Wrong!") 
                })
            },
            () => {}
        )
    }

    goback = () => {
        this.props.history.goBack();
    }

    clearCart = () => {
        Config.setDeleteConfirmAlert(
            null,
            `Are You Sure You Want to Clear Cart ?`,
            () => {
                this.props.cleartCart &&
                this.props.cleartCart()
                .then( result => {
                    Config.setToast("Cart Cleared Successfully!")
                })
                .catch( err => {
                    Config.setErrorToast("Something Went Wrong!") 
                })
            },
            () => {}
        )
    }
     
    render(){
        const cart = this.props.cart.cart;
        return(
            <div className="wrapper" >
            <MainNavbar></MainNavbar>
            <section className="product-shop spad">
                <div className="container">
                    <div className="row justify-content-center ">
                        {/* ----------------------------------------------------------- */}
                        <div className="col-12">
                            <div className="d-flex">
                            <h4 className="font-weight-bold pb-2">Shopping Cart 
                            </h4>
                            {this.state.loading &&
                            <div className="spinner-border text-dark spinner-border-sm mx-2 mt-1" role="status">
                            </div> }
                            </div>
                            { cart.length > 0 && 
                            <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                                <div className="table-responsive px-2">
                                    <table className="table table-stripped">
                                    <thead>
                                        <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Product</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { cart.map( item => this.renderProductTableItem(item) )}                                      
                                    </tbody>
                                    </table>
                                </div>
                            </div>}
                            { cart.length == 0 && 
                                <this.NoItemFound/>
                            }
                        </div>
                    </div>
                    { cart.length > 0 && <div className="row pt-3">
                        <div className="col-lg-4">
                            <div className="cart-buttons">
                                <label 
                                onClick={this.goback}
                                className="primary-btn continue-shop click">Continue shopping</label>
                                <label 
                                onClick={this.clearCart}
                                 className="primary-btn up-cart click">Clear cart</label>
                            </div>
                        </div>
                        <div className="col-lg-4 offset-lg-4">
                            <div className="proceed-checkout">
                                <ul>
                                    <li className="subtotal">Discount <span>LKR 0.00</span></li>
                                    <li className="subtotal"><b>Total</b> <span>
                                        LKR {Config.calcualte_total(cart)}</span></li>
                                </ul>
                                <a href="#" className="proceed-btn">PROCEED TO CHECK OUT</a>
                            </div>
                        </div>
                    </div>}
                </div>
            </section>
            <Footer></Footer>
            </div>
        )
    }


    renderProductTableItem = item => {
        const product = item.product;
        let total = parseFloat(product.price) * parseFloat(item.quantity)
        return(
            <tr key={product._id} >
                <td>
                    <img src={Config.setImage(product.images[0])} height={60} className="mr-2 my-2"/>
                </td>
                <td>
                    <h5 className="form-label-table my-2">{product.name} - <span className="text-muted">
                        {product.category_name}</span></h5>
                    <span className="mr-2 border border-muted px-2 text-muted">
                        Size {item.selected_size}
                    </span>
                    { item.selected_color && <span className="mr-2 border border-muted px-2 text-muted">
                        {item.selected_color}
                    </span>   }

                </td>
                <td>
                    <h5 className="form-label-table my-2">LKR {product.price}</h5>
                </td>
                <td>
                    <h5 className="form-label-table  my-2">
                    <span 
                     onClick={() => this.changeQuantity(item , false)}
                    className="mx-2 border border-muted px-2 py-1 text-muted click">
                    <FontAwesomeIcon icon={faMinus} />
                    </span>
                        <span>{ ("0"+ item.quantity).slice(-2)}</span> 
                    <span 
                    onClick={() => this.changeQuantity(item , true)}
                    className="mx-2 border border-muted px-2  py-1 text-muted click">
                    <FontAwesomeIcon icon={faPlus} /> 
                    </span>   
                    </h5>
                </td>
                <td>
                    <h5 className="form-label-table  my-2">LKR {(Math.round(total * 100) / 100).toFixed(2)}</h5>
                </td>
                <td>
                    <button className="btn btn-outline-secondary btn-sm px-2 mr-2  my-2"
                    onClick={() => this.onClickDelete(item) }>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </td>
            </tr>
        );
    }

    NoItemFound = () => (

          <div className="card shadow-sm border mt-2 py-4">
            <img
              src="images/default/no_result.png"
              className="rounded mx-auto d-block"
              width={110}
            />
            <h5 className="mx-auto text-dark">
              <b>Sorry</b> , You Cart is Empty !"
            </h5>
          </div>
      );

  
}

const mapStateToProps = state => ({
    cart : state.cart || {} ,
  });
  
  const mapDispatchToProps = {
    getCart,
    updateCartItem,
    deleteCartItem,
    cleartCart
  };

export default connect(
    mapStateToProps , 
    mapDispatchToProps)
    (withRouter(Cart));
