import React, { Component } from "react";
import Config from "../controllers/Config";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { insertComment } from "../controllers/Comments";
import { getProductById } from "../controllers/Products";
import StarRatingComponent from "../../node_modules/react-star-rating-component";
class CommentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      comment: "",
      ratings: "",
      userId: "5eaee2f5c8aa252450f5e8c4",
      produtid: "2020",
    };
  }

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
      username: this.state.username,
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
    return (
      <div>
        <form method="POST" onSubmit={(e) => this.onSubmit(e)}>
          <label>
            Name:
            <input
              name="username"
              value={this.state.username}
              onChange={(e) => this.handleChange(e)}
            />
          </label>
          <label>
            Email:
            <input
              name="comment"
              value={this.state.comment}
              onChange={(e) => this.handleChange(e)}
            />
          </label>
          <label>
            <StarRatingComponent
              name="ratings"
              starCount={5}
              value={this.state.ratings}
              onStarClick={this.onStarClick.bind(this)}
              onChange={(e) => this.handleChange(e)}
            />
          </label>
          {/* <button onClick={(e) => this.onSubmit(e)}>Send</button> */}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default CommentSection;
