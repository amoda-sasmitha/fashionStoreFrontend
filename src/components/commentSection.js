/*  eslint-disable */
import React, { Component } from "react";
import Config from "../controllers/Config";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { insertComment, getAllComments } from "../controllers/Comments";
import { getProductById } from "../controllers/Products";
import StarRatingComponent from "../../node_modules/react-star-rating-component";
class CommentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // username: "",
      comment: "",
      ratings: "",
      userId: "5eaee2f5c8aa252450f5e8c4",
      produtid: "",
      AllComments: [],
    };
  }
  componentDidMount() {
    this.loadComments();
  }

  loadComments = () => {
    getAllComments(this.state.produtid)
      .then((result) => {
        console.log(result);
        this.setState({ AllComments: result });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onSubmit = (e) => {
    e.preventDefault();
    // const form = {
    //   userId: this.state.userId,
    //   username: this.state.username,
    //   produtid: this.state.produtid,
    //   comment: this.state.comment,
    //   ratings: this.state.ratings,
    //   Date: new Date().toLocaleString(),
    // };

    // console.log(form);

    insertComment({
      userId: this.state.userId,
      //username: this.state.username,
      produtid: this.state.produtid,
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
    const { AllComments } = this.state;
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
                {/* <label>
            Name:
            <input
              name="username"
              value={this.state.username}
              onChange={(e) => this.handleChange(e)}
            />
          </label> */}
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
                    style={{
                      width: "100%",
                    }}
                    starCount={5}
                    value={this.state.ratings}
                    onStarClick={this.onStarClick.bind(this)}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                {/* <button onClick={(e) => this.onSubmit(e)}>Send</button> */}
                <button type="submit" class="btn btn-dark">
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="col-6">
            <br></br>
            <h6>Comments and Ratings</h6>
            {AllComments.map((item) => this.renderAllComments(item))}
          </div>
        </div>
      </div>
    );
  }
  renderAllComments = (item) => {
    return (
      <p>
        {item.comment} {item.rating}
      </p>
    );
  };
}

export default CommentSection;
