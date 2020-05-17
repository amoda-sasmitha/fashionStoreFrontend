import React from "react";
import StarRatings from "./react-star-ratings";
class CommentSection extends React.Component {
  changeRating(newRating, name) {
    this.setState({
      rating: newRating,
    });
  }
  render() {
    return (
      <section className="product-shop spad">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <form
                className=" py-2  px-3"
                method="POST"
                //onSubmit={(e) => this.onFormSubmit(e)}
              >
                <div className="row">
                  <div className="col-md-12">
                    <h6 className="form-label py-2">Username </h6>
                    <input
                      type="text"
                      name="addressLine1"
                      //value={addressLine1}
                      //onChange={(e) => this.formValueChange(e)}
                      placeholder="Address Line one"
                      className="form-control"
                    />
                    {/* {errors.addressLine1 && errors.addressLine1.length > 0 && ( */}
                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">
                      {/* {errors.addressLine1} */}
                    </h4>
                    {/* )} */}
                  </div>

                  <div className="col-md-12">
                    <StarRatings
                      //rating={this.state.rating}
                      starRatedColor="blue"
                      //changeRating={this.changeRating}
                      //numberOfStars={6}
                      name="rating"
                    />
                  </div>

                  <div className="col-md-12">
                    <br></br>
                    <h6 className="form-label py-2">Comment </h6>
                    <input
                      type="textarea"
                      name="addressLine2"
                      //value={addressLine2}
                      //onChange={(e) => this.formValueChange(e)}
                      placeholder="Address Line two"
                      className="form-control"
                    />
                    {/* {errors.addressLine2 && errors.addressLine2.length > 0 && ( */}
                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">
                      {/* {errors.addressLine2} */}
                    </h4>
                    {/* )} */}
                  </div>

                  <div className="col-md-12 mt-2">
                    <div className="d-flex">
                      <button
                        className="px-4 btn btn-dark  btn-sm bold-normal"
                        type="submit"
                      >
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-4">
              <h6 className="form-label py-2">Order Details</h6>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default CommentSection;
