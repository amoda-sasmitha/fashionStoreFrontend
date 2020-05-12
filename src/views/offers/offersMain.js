      /*  eslint-disable */

import React from "react";
import MainNavbar from "../../components/MainNavbar";
import Footer from "../../components/Footer";

class Offers extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <MainNavbar></MainNavbar>

        {/*============================================ Main header start here ============================================================ */}
        <div className="container-fluid px-lg-5">
          <div className="row">
            {/* main big offer banner start here. This is the banner for manger's banner add part */}
            <div className="col-8">
              <section className="hero-section">
                <div className="hero-items owl-carousel">
                  <div
                    className="item hero-slidshow_item shadow"
                    style={{
                      backgroundImage: `url('images/covers/cover1.png')`,
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="container hero-padding">
                      <div className="row ">
                        <div className="col-sm-6 col-12 ">
                          <h1 className="font-weight-bold hero_title">
                            Black friday
                          </h1>
                          <p className="hero_sub_title text-muted ">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore
                          </p>
                          <a href="#" className="primary-btn mt-2">
                            Shop Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="item hero-slidshow_item"
                    style={{
                      backgroundImage: `url('images/covers/cover5.png')`,
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="container hero-padding">
                      <div className="row ">
                        <div className="col-sm-6 col-12">
                          <h1 className="font-weight-bold hero_title ">
                            Summer Deals
                          </h1>
                          <p className="hero_sub_title text-muted">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore
                          </p>
                          <a href="#" className="primary-btn mt-2">
                            Shop Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            {/* main big offer banner ends here. */}
            {/* s5de 6ffer banners start here.*/}
            <div className="col-4">
              <div
                className="item hero-slidshow_item shadow"
                style={{
                  backgroundImage: `url('images/covers/offerside01.png')`,
                  backgroundSize: "cover",
                  height: "50%",
                }}
              ></div>

              <div
                className="item hero-slidshow_item shadow"
                style={{
                  backgroundImage: `url('images/covers/offerside02.png')`,
                  backgroundSize: "cover",
                  height: "50%",
                }}
              ></div>
            </div>
            {/* s5de 6ffer banners ends here.*/}
          </div>
        </div>
        {/* =================================================Main header ends here ===========================================================*/}
        {/* =================================================Long banner start here ===========================================================*/}
        <div
          class="container-fluid px-lg-5"
          style={{
            backgroundImage: `url('images/covers/offerLong.png')`,
            backgroundSize: "cover",
            marginTop: "10px",
            padding: "20px",
          }}
        >
          <div class="row">
            <div class="col">
              <h5>Up to 65%</h5>
              <h4 className="font-weight-bold pb-2">Sunglasses</h4>
              <h5>Don't late,get Now!</h5>
              <a href="#" className="primary-btn mt-2">
                Shop Now
              </a>
            </div>
            <div
              class="col-6"
              style={{
                marginTop: "30px",
              }}
            >
              <center>
                <h4 className="font-weight-bold pb-2">
                  Sunglasses GANNA salli aran waren
                </h4>
                <h5 className="font-weight-bold pb-2">
                  Bolata sunglass aduwata denna apita pissu kiyala hithuwai
                </h5>
              </center>
            </div>
            <div class="col">3 of 3</div>
          </div>
        </div>
        {/* =================================================Long banner ends here ===========================================================*/}
        {/* =================================================4 section banner starts here ===========================================================*/}

        <div
          class="container-fluid px-lg-5"
          style={{
            padding: "20px",
          }}
        >
          <div class="row">
            <div class="col">
              {" "}
              <div
                className="card  rounded-custom shadow bg-light py-5 border-0 child"
                style={{
                  backgroundImage: `url('images/offers/offer02.png')`,
                  backgroundSize: "cover",
                }}
              >
                <div className="py-4 px-4">
                  <h5>Up to 65%</h5>
                  <h4 className="font-weight-bold pb-2">Sunglasses</h4>
                  <h5>Don't late,get Now!</h5>
                  <a href="#" className="primary-btn mt-2">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
            <div class="col">
              {" "}
              <div
                className="card  rounded-custom shadow bg-light py-5 border-0 child"
                style={{
                  backgroundImage: `url('images/offers/offer02.png')`,
                  backgroundSize: "cover",
                }}
              >
                <div className="py-4 px-4">
                  <h5>Up to 65%</h5>
                  <h4 className="font-weight-bold pb-2">Sunglasses</h4>
                  <h5>Don't late,get Now!</h5>
                  <a href="#" className="primary-btn mt-2">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
            <div class="col">
              {" "}
              <div
                className="card  rounded-custom shadow bg-light py-5 border-0 child"
                style={{
                  backgroundImage: `url('images/offers/offer02.png')`,
                  backgroundSize: "cover",
                }}
              >
                <div className="py-4 px-4">
                  <h5>Up to 65%</h5>
                  <h4 className="font-weight-bold pb-2">Sunglasses</h4>
                  <h5>Don't late,get Now!</h5>
                  <a href="#" className="primary-btn mt-2">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
            <div class="col">
              {" "}
              <div
                className="card  rounded-custom shadow bg-light py-5 border-0 child"
                style={{
                  backgroundImage: `url('images/offers/offer02.png')`,
                  backgroundSize: "cover",
                }}
              >
                <div className="py-4 px-4">
                  <h5>Up to 65%</h5>
                  <h4 className="font-weight-bold pb-2">Sunglasses</h4>
                  <h5>Don't late,get Now!</h5>
                  <a href="#" className="primary-btn mt-2">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* =================================================4 section banner starts here ===========================================================*/}
        <Footer></Footer>
      </div>
    );
  }
}

export default Offers;
