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
      name: " ",
      email: " ",
      ratings: " ",
    };
  }
  onStarClick(nextValue, prevValue, name) {
    this.setState({ ratings: nextValue });
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const form = {
      name: this.state.name,
      email: this.state.email,
      ratings: this.state.ratings,
      Date: new Date().toLocaleString(),
      ProductId: getProductById,
    };
    {
      /* -----------you would send data to API to get results, I used database for ease, this also clears the form on submit----------------*/
    }
    console.log(form);
    this.setState({
      name: "",
      email: "",
      ratings: "",
    });
  };

  render() {
    return (
      <div>
        <form>
          <label>
            Name:
            <input
              name="name"
              value={this.state.name}
              onChange={(e) => this.handleChange(e)}
            />
          </label>
          <label>
            Email:
            <input
              name="email"
              value={this.state.email}
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
          <button onClick={(e) => this.onSubmit(e)}>Send</button>
        </form>
      </div>
    );
  }
}

export default CommentSection;
