import React, { Component } from "react";
import MainNavbar from "../../components/MainNavbar";
import Footer from "../../components/Footer";
import Config from "../../controllers/Config";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenAlt,
  faEye,
  faPlus,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { string } from "prop-types";
import AdminSidebar from "../../components/AdminSidebar";
import moment from "moment";
import { getAllComments, deleteComment } from "../../controllers/Comments";

class allComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      AllComments: [],
    };
  }

  componentDidMount() {
    this.loadComments();
  }

  loadComments = () => {
    getAllComments()
      .then((result) => {
        console.log(result);
        this.setState({ AllComments: result });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   getStyle = (item) => {
  //     console.log("Get Style: ", item.deleteRequest);
  //     return {
  //       backgroundColor: item.deleteRequest ? "#ffa1a1" : "#FFFFFF",
  //     };
  //   };

  render() {
    const { AllComments } = this.state;
    return (
      <div className="bg-light wd-wrapper">
        <AdminSidebar active={"comments"} />
        <div className="wrapper-wx">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h5 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                  Comments and Ratings
                </h5>

                {/* ----------------------------------------------------------- */}
                <div className="col-12 px-0">
                  <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                    <div className="table-responsive px-2">
                      <table className="table table-stripped">
                        <thead>
                          <tr>
                            <th scope="col">Comment </th>
                            <th scope="col">Rating</th>
                            <th scope="col">produt Name</th>
                            <th scope="col">Date</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {AllComments.map((item) =>
                            this.renderAllComments(item)
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
      </div>
    );
  }

  renderAllComments = (item) => {
    return (
      <tr key={item._id}>
        <td>{item.comment}</td>
        <td>{item.rating}</td>
        <td>{item.produt_name}</td>
        {/* <td>{item.userid}</td> */}
        <td>{moment(new Date(item.created_at)).format("YYYY MMM DD")}</td>
        <td>
          {/* <button
            onClick={() => this.onClickView(item) }
            className="btn btn-success btn-sm px-2 mr-2"
          >
            <FontAwesomeIcon icon={faEye} />
          </button> */}

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
  onClickDelete = (item) => {
    Config.setDeleteConfirmAlert(
      "",
      "Are you sure you want to delete this Product ?",
      () => this.clickDeleteComment(item._id),
      () => {}
    );
  };
  clickDeleteComment = (id) => {
    console.log(id);
    deleteComment(id)
      .then((result) => {
        this.loadComments();
        Config.setToast(" Product Deleted Successfully");
      })
      .catch((err) => {
        console.log(err);
        Config.setErrorToast(" Somthing Went Wrong!");
      });
  };

  //   onClickView = (item) => {
  //     this.props.history.push(`/manager/orders/getOrder/${item._id}`);
  //   };
}

export default withRouter(allComments);
