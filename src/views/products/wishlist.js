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
import { getWishlist } from "../../actions/wishlistAction";

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
                  <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                    <div className="table-responsive px-2">
                      <table className="table table-stripped">
                        <thead>
                          <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {wishlist &&
                            wishlist.map((item) =>
                              this.renderProductTableItem(item)
                            )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {wishlist.length == 0 && !loading && <this.NoItemFound />}
              </div>
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
      <tr key={item._id}>
        <td>
          <img
            src={Config.setImage(product.images[0])}
            height={60}
            className="mr-2 my-2"
          />
          {product.images && product.images.length > 1 && (
            <img
              src={Config.setImage(product.images[1])}
              height={60}
              className="mr-2 my-2"
            />
          )}
        </td>
        <td>
          <Link to={`/product/${product._id}`}>
            <h5 className="form-label-table my-2">
              {product.name} -{" "}
              <span className="text-muted">{product.category_name}</span>
            </h5>
          </Link>
        </td>
        <td>
          <h5 className="form-label-table my-2">LKR {product.price}</h5>
        </td>

        <td>
          <button
            className="btn btn-outline-secondary btn-sm px-2 mr-2  my-2"
            //onClick={() => this.onClickDelete(item)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </td>
      </tr>
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(wishlist));
