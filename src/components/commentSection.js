import React from "react";
class CommentSection extends React.Component {
  render() {
    const item = this.props;
    return (
      <div
        className="card"
        style={{
          padding: "20px",
        }}
      >
        <div className="row">
          <div className="col-6">
            <div
              className="card"
              style={{
                padding: "20px",
              }}
            >
              <htmlForm
                className="py-2  px-3"
                method="POST"
                onSubmit={(e) => this.onhtmlFormSubmit(e)}
              >
                <h6 className="htmlForm-label py-2">Full Name</h6>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Full Name"
                  className="htmlForm-control"
                />
                <br></br>
                <div className="rate">
                  <h6>Rate our Product</h6>
                  <input type="radio" id="star5" name="rate" value="5" />
                  <label htmlFor="star5" title="text">
                    5 stars
                  </label>
                  <input type="radio" id="star4" name="rate" value="4" />
                  <label htmlFor="star4" title="text">
                    4 stars
                  </label>
                  <input type="radio" id="star3" name="rate" value="3" />
                  <label htmlFor="star3" title="text">
                    3 stars
                  </label>
                  <input type="radio" id="star2" name="rate" value="2" />
                  <label htmlFor="star2" title="text">
                    2 stars
                  </label>
                  <input type="radio" id="star1" name="rate" value="1" />
                  <label htmlFor="star1" title="text">
                    1 star
                  </label>
                </div>
                <br></br>
                <div className="htmlForm-group">
                  <h6>Comment</h6>
                  <textarea
                    className="htmlForm-control"
                    id="examplehtmlFormControlTextarea1"
                    rows="3"
                    placeholder="Describe your experience"
                    style={{
                      width: "100%",
                    }}
                  ></textarea>
                </div>
                <div className="d-flex">
                  <button
                    className="px-4 btn btn-dark  btn-sm bold-normal"
                    type="submit"
                  >
                    Post Comment
                  </button>
                </div>
              </htmlForm>
            </div>
          </div>
          <div className="col-6">
            <h6>Ratings and reviews</h6>
            <br></br>
            <div className="row">
              {/* Rating Average Displays here */}
              <div className="col">
                <center>
                  <h1>5.0</h1>
                </center>
              </div>
              {/* Rating with progressbar */}
              <div
                className="col"
                style={{
                  float: "left",
                }}
              >
                <div
                  className="progress"
                  style={{
                    height: "6px",
                    marginBottom: "5px",
                  }}
                >
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: "100%",
                    }}
                  ></div>
                </div>
                <div
                  className="progress"
                  style={{
                    height: "6px",
                    marginBottom: "5px",
                  }}
                >
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: "75%",
                    }}
                  ></div>
                </div>
                <div
                  className="progress"
                  style={{
                    height: "6px",
                    marginBottom: "5px",
                  }}
                >
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: "20%",
                    }}
                  ></div>
                </div>
                <div
                  className="progress"
                  style={{
                    height: "6px",
                    marginBottom: "5px",
                  }}
                >
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: "10%",
                    }}
                  ></div>
                </div>
                <div
                  className="progress"
                  style={{
                    height: "6px",
                    marginBottom: "5px",
                  }}
                >
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: "0%",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentSection;
