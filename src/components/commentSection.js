/*  eslint-disable */
import React, { Component } from "react";
import Config from "../controllers/Config";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import User from "../controllers/User";
import {
  insertComment,
  getCommentByUserId,
  calculateAverageRating,
  getCommentByProductId,
} from "../controllers/Comments";
import moment from "moment";
import { getProductById } from "../controllers/Products";
import StarRatingComponent from "../../node_modules/react-star-rating-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenAlt } from "@fortawesome/free-solid-svg-icons";
import commentEditBox from "./commentEditBox";
import { components } from "react-select";
class CommentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      ratings: "",
      filterComments: [],
      show: true,
      commentToEdit: "",
      ratingToEdit: "",
    };
    this.toggleEditComment = this.toggleEditComment.bind(this);
  }
  componentDidMount() {
    this.loadCommentByProductId();
    //this.loadCommentToEdit();
  }

  loadCommentByProductId = () => {
    console.log("ID : ", this.props.proid);
    getCommentByProductId(this.props.proid)
      .then((result) => {
        this.setState({ filterComments: result });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //========This function is for edit user's comment. but only it will display when the user login==========
  // loadCommentToEdit = () => {
  //   console.log("ID : ", this.props.uid);
  //   getCommentByUserId(this.props.uid)
  //     .then((result) => {
  //       this.setState({
  //         commentToEdit: result.comment,
  //         ratingToEdit: result.rating,

  //         loading: false,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       this.setState({ loading: false });
  //     });
  // };
  //=========================function ends================================

  toggleEditComment = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  };

  onSubmit = (e) => {
    e.preventDefault();

    insertComment({
      userid: this.props.uid,
      produtid: this.props.proid,
      produt_name: this.props.proName,
      comment: this.state.comment,
      rating: this.state.ratings,
    })
      .then((result) => {
        Config.setToast("Comment Added successfully");
      })
      .catch((err) => {
        console.log(err);
        Config.setErrorToast("Something went wrong!");
      });
  };

  onStarClick(nextValue, prevValue, name) {
    this.setState({ ratings: nextValue });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { filterComments } = this.state;
    const number = filterComments.length;

    let rating_count = [0, 0, 0, 0, 0];

    filterComments.forEach((item) => {
      rating_count[item.rating - 1] = rating_count[item.rating - 1] + 1;
    });
    // console.log("five ", rating_count);

    let total_count = rating_count.reduce(
      (acc, current, index) => acc + current * (index + 1),
      0
    );

    let cal = total_count / filterComments.length;
    let five = 0;
    let four = 0,
      three = 0,
      two = 0,
      one = 0;
    filterComments.find((item) => {
      if (item.rating == 5) {
        five = rating_count[item.rating - 1];
      } else if (item.rating == 4) {
        four = rating_count[7 - item.rating];
      } else if (item.rating == 3) {
        three = rating_count[5 - item.rating];
      } else if (item.rating == 2) {
        two = rating_count[3 - item.rating];
      } else if (item.rating == 1) {
        one = rating_count[1 - item.rating];
      }
      // rating_count[item.rating - 1] = rating_count[item.rating - 1] + 1;
    });
    let fiveBar = (five / number) * 100;

    let fourBar = (four / number) * 100;
    let threeBar = (three / number) * 100;
    let twoBar = (two / number) * 100;
    let oneBar = (one / number) * 100;
    console.log("number", number);
    console.log("five", five);
    console.log("fivebar", fiveBar);

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <br></br>
            <div
              className="card"
              style={{
                padding: "20px",
              }}
            >
              <form method="POST" onSubmit={(e) => this.onSubmit(e)}>
                <div>
                  <h6>Describe your experience:</h6>
                  <input
                    name="comment"
                    className="form-control"
                    value={this.state.comment}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>

                <div>
                  <StarRatingComponent
                    name="ratings"
                    starCount={5}
                    value={this.state.ratings}
                    onStarClick={this.onStarClick.bind(this)}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>

                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
                {/* <p>{this.props.uid}</p> */}
              </form>
            </div>
          </div>
          <div className="col-6">
            <br></br>
            <h6 className="text-secondary pt-1">Comments and Ratings</h6>
            <br></br>
            <div className="row">
              <div className="col-4">
                <center>
                  <h1>{cal.toFixed(1)}</h1>
                  <StarRatingComponent
                    name="ratings"
                    starCount={5}
                    value={cal}
                  />
                  <br></br>
                  <h6
                    style={{
                      marginTop: "-10px",
                    }}
                  >
                    {number} Total
                  </h6>
                </center>
              </div>
              <div
                className="col-8"
                style={{
                  marginTop: "15px",
                }}
              >
                {/* progress bar for rating 5 */}

                <div
                  className="progress"
                  style={{
                    height: "8px",
                    marginTop: "5px",
                  }}
                >
                  <div
                    className="progress-bar"
                    style={{
                      width: fiveBar + "%",
                      backgroundColor: "#1abc9c",
                    }}
                  ></div>
                </div>
                {/* progress bar for rating 4*/}
                <div
                  className="progress"
                  style={{
                    height: "8px",
                    marginTop: "5px",
                  }}
                >
                  <div
                    className="progress-bar"
                    style={{
                      width: fourBar + "%",
                      backgroundColor: "#1abc9c",
                    }}
                  ></div>
                </div>
                {/* progress bar for rating 3 */}
                <div
                  className="progress"
                  style={{
                    height: "8px",
                    marginTop: "5px",
                  }}
                >
                  <div
                    className="progress-bar"
                    style={{
                      width: threeBar + "%",
                      backgroundColor: "#1abc9c",
                    }}
                  ></div>
                </div>
                {/* progress bar for rating 2 */}
                <div
                  className="progress"
                  style={{
                    height: "8px",
                    marginTop: "5px",
                  }}
                >
                  <div
                    className="progress-bar"
                    style={{
                      width: twoBar + "%",
                      backgroundColor: "#1abc9c",
                    }}
                  ></div>
                </div>
                {/* progress bar for rating 1 */}
                <div
                  className="progress"
                  style={{
                    height: "8px",
                    marginTop: "5px",
                  }}
                >
                  <div
                    className="progress-bar"
                    style={{
                      width: oneBar + "%",
                      backgroundColor: "#1abc9c",
                    }}
                  ></div>
                </div>
              </div>
              <br></br>
            </div>
            <hr></hr>

            {filterComments.map((item) => this.renderAllComments(item))}
          </div>
        </div>
      </div>
    );
  }

  // CalculateAverage = (item) => {
  //   const { filterComments } = this.state;
  //   let rating_count = [0, 0, 0, 0, 0];

  //   filterComments.forEach((item) => {
  //     rating_count[item.rating - 1] = rating_count[item.rating - 1] + 1;
  //   });
  //   console.log("five ", rating_count);

  //   let total_count = rating_count.reduce(
  //     (acc, current, index) => acc + current * (index + 1),
  //     0
  //   );

  //   let cal = total_count / filterComments.length;
  //   console.log("tttt ", cal);
  // };

  renderAllComments = (item) => {
    return (
      <div className="row">
        <div className="col-4">
          <center>
            <StarRatingComponent
              name="ratings"
              starCount={5}
              value={item.rating}
            />
          </center>
        </div>
        <div className="col-8">
          <span className="text-danger small font-weight-bold">
            {moment(new Date(item.created_at)).format("YYYY MMM DD")}
          </span>
          {item.username}
          <br></br>
          {item.comment}
          <hr></hr>
        </div>
      </div>
    );
  };

  renderRating = (item) => {
    return <p>{item.rating}</p>;
  };
}

export default CommentSection;
