import React from "react";
import MainNavbar from "../../components/MainNavbar";
import Footer from "../../components/Footer";
import Config from "../../controllers/Config";
class Wishlist extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <MainNavbar></MainNavbar>
        <section className="product-shop spad">
          <div className="container">
            <div className="row justify-content-center ">
              {/* ----------------------------------------------------------- */}
              <div className="col-12">
                <div className="d-flex">
                  <h4 className="font-weight-bold pb-2">Shopping Cart</h4>
                  {this.state.loading && (
                    <div
                      className="spinner-border text-dark spinner-border-sm mx-2 mt-1"
                      role="status"
                    ></div>
                  )}
                </div>
                {cart.length > 0 && (
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
                          {cart.map((item) =>
                            this.renderProductTableItem(item)
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {cart.length == 0 && <this.NoItemFound />}
              </div>
            </div>
            {cart.length > 0 && (
              <div className="row pt-3">
                <div className="col-lg-4">
                  <div className="cart-buttons">
                    <label
                      onClick={this.goback}
                      className="primary-btn continue-shop click"
                    >
                      Continue shopping
                    </label>
                    <label
                      onClick={this.clearCart}
                      className="primary-btn up-cart click"
                    >
                      Clear cart
                    </label>
                  </div>
                </div>
                <div className="col-lg-4 offset-lg-4">
                  <div className="proceed-checkout">
                    <ul>
                      <li className="subtotal">
                        Discount <span>LKR 0.00</span>
                      </li>
                      <li className="subtotal">
                        <b>Total</b>{" "}
                        <span>LKR {Config.calcualte_total(cart)}</span>
                      </li>
                    </ul>
                    <a href="#" className="proceed-btn">
                      PROCEED TO CHECK OUT
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        <Footer></Footer>
      </div>
    );
  }
}
export default Wishlist;
