/*  eslint-disable */
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MainNavbar from "../../components/MainNavbar";
import Footer from "../../components/Footer";
import Config from "../../controllers/Config";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import {
  getWishlist,
  deleteWishlistItem,
  clearWishlist,
} from "../../actions/wishlistAction";

class wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getWishlist &&
      this.props
        .getWishlist(this.props.auth.user.id)
        .then((result) => {
          this.setState({ loading: false });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ loading: false });
        });
  }

  onClickDelete = (item) => {
    Config.setDeleteConfirmAlert(
      null,
      `Are You Sure You Want to Delete ${item.product.name} ?`,
      () => {
        this.props.deleteWishlistItem &&
          this.props
            .deleteWishlistItem(item._id, this.props.auth.user.id)
            .then((result) => {
              Config.setToast("Item Deleted Successfully!");
            })
            .catch((err) => {
              Config.setErrorToast("Something Went Wrong!");
            });
      },
      () => {}
    );
  };

  clearWishlistNow = () => {
    Config.setDeleteConfirmAlert(
      null,
      `Are You Sure You Want to Clear Cart ?`,
      () => {
        this.props.clearWishlist &&
          this.props
            .clearWishlist(this.props.auth.user.id)
            .then((result) => {
              Config.setToast("wishlist Cleared Successfully!");
            })
            .catch((err) => {
              Config.setErrorToast("Something Went Wrong!");
            });
      },
      () => {}
    );
  };

  render() {
    const { loading } = this.state;
    const wishlist = this.props.wishlist.wishlist;
    console.log(wishlist);
    return (
      <div className="wrapper">
        <MainNavbar></MainNavbar>
        <section className="product-shop spad">
          <div className="container">
            <div className="row justify-content-center ">
              {/* ----------------------------------------------------------- */}
              <div className="col-12">
                <div className="d-flex">
                  <h4 className="font-weight-bold pb-2">Your wishlist</h4>
                  {this.state.loading && (
                    <div
                      className="spinner-border text-dark spinner-border-sm mx-2 mt-1"
                      role="status"
                    ></div>
                  )}
                </div>
                {wishlist.length > 0 && (
                  <div className="product-list">
                    <div className="row">
                      {wishlist &&
                        wishlist.map((item) =>
                          this.renderProductTableItem(item)
                        )}
                    </div>
                  </div>
                )}
                {wishlist.length == 0 && !loading && <this.NoItemFound />}
              </div>
            </div>
            <br></br>
            <div class="row">
              <div class="col"></div>
              <div class="col-6">
                <button
                  type="button"
                  onClick={this.clearWishlistNow}
                  class="form-control"
                >
                  Clear wishlist
                </button>
              </div>
              <div class="col"></div>
            </div>
          </div>
        </section>
        <Footer></Footer>
      </div>
    );
  }

  renderProductTableItem = (item) => {
    const product = item.product;

    return (
      <div className="col-lg-4 col-md-4 col-6">
        <div
          className="card"
          style={{
            paddingLeft: "20px",
          }}
        >
          <p key={item._id}>
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <img
                    src={Config.setImage(product.images[0])}
                    height={130}
                    className="mr-2 my-2"
                  />
                  {/* {product.images && product.images.length > 1 && (
                  <img
                    src={Config.setImage(product.images[1])}
                    height={150}
                    className="mr-2 my-2"
                  />1abc9c
                )} */}
                </div>
                <div class="col">
                  <button
                    style={{
                      float: "right",
                    }}
                    className="btn btn-outline-secondary btn-sm px-2 mr-2  my-2"
                    onClick={() => this.onClickDelete(item)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <br></br>
                  <br></br>
                  <h5 className="form-label-table my-2">LKR {product.price}</h5>
                  <h5 className="form-label-table my-2">
                    Category {product.category_name}
                  </h5>
                </div>
              </div>
              <p class="card-text">
                <Link to={`/product/${product._id}`}>
                  <h5
                    className="form-label-table my-2"
                    style={{
                      color: "#1abc9c",
                    }}
                  >
                    {product.name}
                    {/* -{" "} */}
                    {/* <span className="text-muted">{product.category_name}</span> */}
                  </h5>
                </Link>
              </p>
            </div>
          </p>
        </div>
      </div>
    );
  };

  NoItemFound = () => (
    <div className="card shadow-sm border mt-2 py-4">
      <img
        src="images/default/no_result.png"
        className="rounded mx-auto d-block"
        width={110}
      />
      <h5 className="mx-auto text-dark">
        <b>Sorry</b> , Your wishlist is Empty !"
      </h5>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth || {},
  wishlist: state.wishlist || {},
});

const mapDispatchToProps = {
  getWishlist,
  deleteWishlistItem,
  clearWishlist,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(wishlist));
