import React, { Component } from "react";
import MainNavbar from "../../components/MainNavbar";
import Footer from "../../components/Footer";
import { getProductById } from "../../controllers/Products";
import Config from "../../controllers/Config";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ReactHtmlParser from "react-html-parser";
import User from "../../controllers/User";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addtocart, updateCartItem } from "../../actions/cartActions";
import { addtoWishlist } from "../../actions/wishlistAction";
import CommentSection from "../../components/commentSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_size: "",
      selected_color: "",
      product: {},
      quantity: 1,
      id: props.match.params.id,
      loading: true,
      errors: {},
    };
  }

  componentDidMount() {
    this.loadProducts();
    console.log(this.props);
  }

  loadProducts = () => {
    this.setState({ loading: true });
    getProductById(this.state.id)
      .then((result) => {
        console.log(result);
        this.setState({
          loading: false,
          product: result,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  addtoCart = () => {
    const { product, selected_color, selected_size, quantity } = this.state;
    const cart = this.props.cart.cart;
    if (this.props.auth.isAuthenticated) {
      if (this.validate()) {
        let index = this.checkInCart();
        if (index == -1) {
          //insert to redux store and database
          this.props
            .addtocart(
              {
                product_id: product._id,
                quantity: quantity,
                selected_color: selected_color,
                selected_size: selected_size,
              },
              this.props.auth.user.id
            )
            .then((result) => {
              Config.setToast(`${product.name} Added to Cart`);
              this.props.history.push("/cart");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          //update item in redux store and database
          let item = cart[index];
          this.props
            .updateCartItem(
              {
                id: item._id,
                quantity: parseInt(quantity) + parseInt(item.quantity),
              },
              this.props.auth.user.id
            )
            .then((result) => {
              Config.setToast(`Update Quantity in ${product.name}`);
              this.props.history.push("/cart");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    } else {
      this.props.history.push("/signin");
    }
  };

  addtoWishlist = () => {
    const { product } = this.state;
    const wishlist = this.props.wishlist.wishlist;

    if (this.props.auth.isAuthenticated) {
      let index = this.checkInWishlist();
      if (index == -1) {
        //insert to redux store and database
        this.props
          .addtoWishlist(product._id, this.props.auth.user.id)
          .then((result) => {
            Config.setToast(`${product.name} Added to wishlist`);
            this.props.history.push("/wishlist");
          })
          .catch((err) => {
            console.log(err);
            console.log("methanata pss wenne. error rka : " + err);
          });
      } else {
        alert("already in");
        //this.props.deleteitem
        //config toast => item remove
      }
    } else {
      this.props.history.push("/signin");
    }
  };

  checkInCart = () => {
    const { product, selected_color, selected_size, quantity } = this.state;
    const cart = this.props.cart.cart;
    return cart.findIndex((item) => {
      if (item.product._id == product._id) {
        if (item.selected_size == selected_size) {
          if (item.selected_color) {
            if (item.selected_color == selected_color) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        }
      }
      return false;
    });
  };
  checkInWishlist = () => {
    const { product } = this.state;
    const wishlist = this.props.wishlist.wishlist;
    return wishlist.findIndex((item) => {
      if (item.product._id == product._id) {
        return true;
      } else {
        return false;
      }
    });
  };

  validate = () => {
    const { product, selected_color, selected_size, quantity } = this.state;
    let errors = {};
    let count = 0;
    if (product.colors && product.colors.length > 0) {
      if (selected_color == "") {
        count++;
        errors.color = true;
      } else {
        errors.color = false;
      }
    } else {
      errors.size = false;
    }

    if (selected_size == "") {
      count++;
      errors.size = true;
    } else {
      errors.size = false;
    }

    console.log(errors);
    this.setState({ errors });
    return count == 0;
  };

  render() {
    const { quantity, product, loading, selected_color, errors } = this.state;
    return (
      <div className="wrapper">
        <MainNavbar></MainNavbar>
        <section className="product-shop spad">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-4">
                <div className="pl-4 pb-2">
                  <Carousel swipeable={true} showArrows={false}>
                    {product.images &&
                      product.images.map((item, index) => {
                        return <img key={index} src={Config.setImage(item)} />;
                      })}
                  </Carousel>
                </div>
              </div>
              <div className="col-md-8">
                <div className="product-details card  px-4 py-2">
                  <div className="pd-title">
                    <span>{product.brand}</span>
                    <h4
                      className="mt-1"
                      style={{ fontWeight: 500, fontSize: "1.35rem" }}
                      className="text-dark"
                    >
                      {product.name}
                      <FontAwesomeIcon
                        icon={faHeart}
                        onClick={this.addtoWishlist}
                        className={`mx-2  ${
                          this.checkInWishlist() == -1
                            ? "text-muted"
                            : "text-danger"
                        } click`}
                      />
                    </h4>
                  </div>
                  <div className="pd-desc mt-2">
                    <h5>
                      <b>LKR {product.price}</b>
                      {product.discount && <span>{product.discount}</span>}
                    </h5>
                  </div>
                  {product.colors && product.colors.length > 0 && (
                    <div className="pd-color">
                      <h6 className="text-secondary pt-1">Avaiable Colors</h6>
                      <div className="pd-color-choose">
                        {product.colors &&
                          product.colors.map((item, index) => {
                            return (
                              <div
                                key={index}
                                onClick={() =>
                                  this.setState({ selected_color: item.name })
                                }
                                className={`cc-item border px-2 pt-1 
                                                            ${
                                                              selected_color ==
                                                              item.name
                                                                ? "bg-secondary"
                                                                : ""
                                                            }`}
                              >
                                <label
                                  style={{ backgroundColor: item.code }}
                                  className="border"
                                ></label>
                              </div>
                            );
                          })}
                      </div>
                      <br></br>
                      {errors.color && (
                        <span className="text-danger small font-weight-bold">
                          Please Select A Color
                        </span>
                      )}
                    </div>
                  )}
                  <div className="pd-size-choose">
                    <this.renderSizes />
                    {errors.size && (
                      <span className="text-danger small font-weight-bold">
                        Please Select A Size
                      </span>
                    )}
                  </div>
                  <div className="quantity">
                    <div className="pro-qty">
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) =>
                          this.setState({
                            quantity:
                              e.target.value == 0
                                ? this.state.quantity
                                : e.target.value,
                          })
                        }
                      />
                    </div>
                    <span
                      onClick={this.addtoCart}
                      className="primary-btn pd-cart click"
                    >
                      Add To Cart
                    </span>
                  </div>
                  <ul className="pd-tags">
                    <li>
                      <span>CATEGORIES</span>: {product.category_name}
                    </li>
                    <li>
                      <span>TAGS</span>:{" "}
                      {product.tags &&
                        product.tags.map((item) => `${item.value},`)}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row px-4">
              <div className="mt-2 col-12">
                <div className="tab-item">
                  <ul className="nav" role="tablist">
                    <li>
                      <a
                        className="active"
                        data-toggle="tab"
                        href="#tab-1"
                        role="tab"
                      >
                        DESCRIPTION
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#tab-2" role="tab">
                        Introduction
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#tab-3" role="tab">
                        Customer Reviews
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="tab-item-content">
                  <div className="tab-content">
                    <div
                      className="tab-pane fade-in active"
                      id="tab-1"
                      role="tabpanel"
                    >
                      <div className="pt-3">
                        <div className="row">
                          <div className="col-lg-12">
                            {ReactHtmlParser(product.description)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="tab-2" role="tabpanel">
                      <div className="row">
                        <div className="pt-3 col-12">
                          <h5 className="font-weight-bold py-2">
                            Introduction
                          </h5>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in{" "}
                          </p>
                          <h5 className="font-weight-bold py-2">Features</h5>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* sss */}
                    <div className="tab-pane fade" id="tab-3" role="tabpanel">
                      <CommentSection key={product.id}></CommentSection>
                    </div>
                    {/* ssss */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer></Footer>
      </div>
    );
  }

  renderSizes = () => {
    return (
      <div className="fw-tags">
        <div className="fw-size-choose">
          {this.state.product.sizes &&
            this.state.product.sizes.map((item, i) => (
              <div
                key={i}
                onClick={() =>
                  this.setState({
                    selected_size:
                      this.state.selected_size == item.value ? "" : item.value,
                  })
                }
                className="sc-item"
              >
                <label
                  className={
                    this.state.selected_size === item.value
                      ? "bg-secondary text-white pt-0"
                      : "pt-0"
                  }
                >
                  {item.value}
                </label>
              </div>
            ))}
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => ({
  cart: state.cart || {},
  auth: state.auth || {},
  wishlist: state.wishlist || {},
});

const mapDispatchToProps = {
  addtocart,
  updateCartItem,
  addtoWishlist,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SingleProduct));
