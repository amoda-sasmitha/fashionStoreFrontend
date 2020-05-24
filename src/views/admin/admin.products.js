/*  eslint-disable */
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import "../../asserts/commoncss/sidebar.css";
import Config from "../../controllers/Config";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenAlt,
  faEye,
  faPlus,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { getAllProducts, deleteProduct } from "../../controllers/Products";
import { getAllCategories } from "../../controllers/Category";
import { connect } from "react-redux";

class AdminProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      active_category: "All",
      categories: ["All"],
    };
  }

  componentDidMount() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts = () => {
    getAllProducts()
      .then((result) => {
        console.log(result);
        this.setState({ products: result });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  loadCategories = () => {
    getAllCategories()
      .then((result) => {
        this.setState({
          categories: [...this.state.categories, ...result.map((c) => c.name)],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { products, categories, active_category } = this.state;

    return (
      <div className="bg-light wd-wrapper">
        <AdminSidebar active={"products"} />
        <div className="wrapper-wx">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h5 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                  Product Categories
                </h5>
              </div>
              {/* ----------------------------------------------------------- */}
              <div className="col-12">
                <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                  <h5 className="text-dark bold-normal py-2 px-2 mb-0 mt-2">
                    {categories.map((c, i) => {
                      return (
                        <span
                          key={i}
                          onClick={() => this.setState({ active_category: c })}
                          className={`badge mx-2 px-2 ${
                            active_category == c
                              ? "badge-info click"
                              : "border text-muted click"
                          }`}
                        >
                          {c}
                        </span>
                      );
                    })}
                  </h5>
                  {/* <input 
                                //style={focus:border : none}
                                    placeholder="Search Products"
                                    className="form-control mb-2 border-0"
                                    type="text"
                                /> */}
                  <div className="table-responsive px-2 pt-2">
                    <table className="table table-stripped">
                      <thead>
                        <tr>
                          <th scope="col">Images</th>
                          <th scope="col">Name</th>
                          <th scope="col">Category</th>
                          <th scope="col">Price</th>
                          <th scope="col">Created At</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.filterByCategory().map((item) =>
                          this.renderProductTableItem(item)
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  filterByCategory = () => {
    const { active_category, products } = this.state;
    if (active_category == "All") {
      return products;
    } else {
      return products.filter((p) => p.category_name == active_category);
    }
  };

  renderProductTableItem = (item) => {
    return (
      <tr key={item._id}>
        <td>
          <img
            src={Config.setImage(item.images[0])}
            height={60}
            className="mr-2"
          />
          {item.images.length > 1 && (
            <img src={Config.setImage(item.images[1])} height={60} />
          )}
        </td>
        <td>
          <h6 className="form-label mb-2">{item.name}</h6>
          {item.sizes.map((size, i) => (
            <span key={i} className="mr-2 border border-muted px-2 text-muted">
              {size.label}
            </span>
          ))}
        </td>
        <td>
          <h6 className="">{item.category_name}</h6>
        </td>
        <td>
          <h6 className="form-label ">LKR {item.price}</h6>
        </td>
        <td>{moment(new Date(item.created_at)).format("YYYY MMM DD")}</td>
        <td>
          <button
            onClick={() => this.onClickView(item)}
            className="btn btn-success btn-sm px-2 mr-2"
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
          <button
            className="btn btn-secondary btn-sm px-2 mr-2"
            onClick={() => this.onClickUpdate(item)}
          >
            <FontAwesomeIcon icon={faPenAlt} />
          </button>
          <button
            className="btn btn-danger btn-sm px-2 mr-2"
            onClick={() => this.onClickDelete(item)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </td>
      </tr>
    );
  };

  onClickView = (item) => {
    this.props.history.push(`/product/${item._id}`);
  };

  onClickUpdate = (item) => {
    this.props.history.push(`/admin/products/update/${item._id}`);
  };

  onClickDelete = (item) => {
    Config.setDeleteConfirmAlert(
      "",
      "Are you sure you want to delete this Product ?",
      () => this.clickDeleteProduct(item._id),
      () => {}
    );
  };

  clickDeleteProduct = (id) => {
    console.log(id);
    deleteProduct(id, this.props.auth.user.token, this.props.auth.user.type)
      .then((result) => {
        this.loadProducts();
        Config.setToast(" Product Deleted Successfully");
      })
      .catch((err) => {
        console.log(err);
        Config.setErrorToast(" Somthing Went Wrong!");
      });
  };
}
const mapStateToProps = state => ({
  auth: state.auth || {},
});
export default  connect(mapStateToProps)(withRouter(AdminProduct));
