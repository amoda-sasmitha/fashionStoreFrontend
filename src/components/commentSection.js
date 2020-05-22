/*  eslint-disable */
import React, { Component } from "react";
import Config from "../controllers/Config";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import User from "../controllers/User";
import {
  insertComment,
  getAllComments,
  getCommentByProductId,
} from "../controllers/Comments";
import moment from "moment";
import { getProductById } from "../controllers/Products";
import StarRatingComponent from "../../node_modules/react-star-rating-component";
class CommentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      ratings: "",
      filterComments: [],
      overallRating: "",
      averageRate: "",
    };
  }
  componentDidMount() {
    this.loadCommentByProductId();
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

  onSubmit = (e) => {
    e.preventDefault();

    insertComment({
      userid: this.props.uid,
      //username: this.props.auth.user.username,
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
    const { filterComments, averageRate } = this.state;
    const number = filterComments.length;
    const rate = this.state.ratings;

    return (
      <div class="container">
        <div class="row">
          <div class="col">
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

                <button type="submit" class="btn btn-dark">
                  Submit
                </button>
                {/* <p>{this.props.uid}</p> */}
              </form>
            </div>
          </div>
          <div className="col-6">
            <br></br>
            <h6 className="text-secondary pt-1">
              Comments and Ratings ( {number} Total )
            </h6>

            <div class="row">
              {filterComments.map((item) => this.CalculateAverage(item))}
              <br></br>
            </div>
            {filterComments.map((item) => this.renderAllComments(item))}
            {/* {this.loadCommentByProductId().map((item) =>
              this.renderAllComments(item)
            )} */}
          </div>
        </div>
      </div>
    );
  }

  CalculateAverage = (item) => {
    const { overallRating, filterComments } = this.state;
    const number = filterComments.length;
    // let ave = (overallRating * number + item.rating) / (number + 1);
    let five = 0,
      four = 0,
      three = 0,
      two = 0,
      one = 0;
    // console.log("rating : " + number);
    if (this.props.proid == item.produtid) {
      for (var i = 1; i < filterComments.length; i++) {
        if (item.rating == 5) {
          five = five + 1;
          console.log("five" + item.rating);
        }
        // else if (item.rating == 4) {
        //   four = four + 1;
        //   console.log("four" + four);
        // } else if (item.rating == 3) {
        //   three = three + 1;
        //   console.log("three" + three);
        // } else if (item.rating == 2) {
        //   two = two + 1;
        //   console.log("three" + two);
        // } else if (item.rating == 1) {
        //   one = one + 1;
        //   console.log("three" + one);
        // }
      }
    }
    return (
      <div>
        <li>{five}</li>
        <br></br>
        {/* {four} */}
      </div>
    );
    // if (active_category == "All") {
    //   return products;
    // } else {
    //   return products.filter((p) => p.category_name == active_category);
    // }
  };

  renderAllComments = (item) => {
    return (
      <div class="row">
        <div class="col-4">
          <center>
            <StarRatingComponent
              name="ratings"
              starCount={5}
              value={item.rating}
            />
          </center>
        </div>
        <div class="col-8">
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
