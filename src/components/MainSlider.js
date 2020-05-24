      /*  eslint-disable */

import React from 'react';
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
class MainSlider extends React.Component {
  render(){
    return(
        <section className="hero-section">
            <div>
            <Carousel swipeable={true} 
                showIndicators={true}
                autoPlay={true}
                infiniteLoop={true}
                interval={3000}
                
                stopOnHover={false}
                transitionTime={1000}
                showArrows={false} >
                <div className="hero-slidshow_item shadow"  style={{ backgroundImage : `url('images/covers/cover1.png')` ,  backgroundSize : 'cover' }}>
                    <div className="container hero-padding">
                        <div className="row ">
                            <div className="col-sm-6 col-12 ">
                                <h1 className="font-weight-bold hero_title">Black Friday</h1>
                                <p className="hero_sub_title text-muted ">Thank God it's Black Friday. Black Friday Weekend Sale.What Are You Waiting For? 
                                Keep calm and keep shopping with us on black Friday weekend.
                                </p>
                                <Link to="/offers" className="primary-btn mt-2">Shop Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero-slidshow_item"  style={{ backgroundImage : `url('images/covers/cover5.png')` ,  backgroundSize : 'cover' }}>
                    <div className="container hero-padding">
                        <div className="row ">
                            <div className="col-sm-6 col-12">
                                <h1 className="font-weight-bold hero_title ">Summer Deals</h1>
                                <p className="hero_sub_title text-muted">Are you ready for the summer? Be sure not
                                 to fizzle when the summer starts to sizzle.
                                  Connect with the summer's lowest rates with the best deals. 
                                </p>
                                <Link to="/offers" className="primary-btn mt-2">Shop Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero-slidshow_item"  style={{ backgroundImage : `url('images/covers/cover4.png')` ,  backgroundSize : 'cover' }}>
                    <div className="container hero-padding">
                        <div className="row ">
                            <div className="col-sm-6 col-12">
                                <h1 className="font-weight-bold hero_title">Shop By the Trend</h1>
                                <p className="hero_sub_title text-muted">
                                Rediscover a great shopping tradition. Transforming shopping into an experience. 
                                 Check out our exclusive collection and enrich your shopping list wisely.  </p>
                                <Link to="/offers" className="primary-btn mt-2">Shop Now</Link>
                            </div>
                        </div>
                    </div>
                </div> 
                </Carousel>
            </div>
        </section> 
    );
  }
}
export default MainSlider;
