import React from 'react';

class MainSlider extends React.Component {
  render(){
    return(
        <section className="hero-section">
            <div className="hero-items owl-carousel">
                <div className="item hero-slidshow_item shadow"  style={{ backgroundImage : `url('images/covers/cover1.png')` ,  backgroundSize : 'cover' }}>
                    <div className="container hero-padding">
                        <div className="row ">
                            <div className="col-sm-6 col-12 ">
                                <h1 className="font-weight-bold hero_title">Black friday</h1>
                                <p className="hero_sub_title text-muted ">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore</p>
                                <a href="#" className="primary-btn mt-2">Shop Now</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="item hero-slidshow_item"  style={{ backgroundImage : `url('images/covers/cover5.png')` ,  backgroundSize : 'cover' }}>
                    <div className="container hero-padding">
                        <div className="row ">
                            <div className="col-sm-6 col-12">
                                <h1 className="font-weight-bold hero_title ">Summer Deals</h1>
                                <p className="hero_sub_title text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore</p>
                                <a href="#" className="primary-btn mt-2">Shop Now</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="item hero-slidshow_item"  style={{ backgroundImage : `url('images/covers/cover4.png')` ,  backgroundSize : 'cover' }}>
                    <div className="container hero-padding">
                        <div className="row ">
                            <div className="col-sm-6 col-12">
                                <h1 className="font-weight-bold hero_title">Summer Deals</h1>
                                <p className="hero_sub_title text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore</p>
                                <a href="#" className="primary-btn mt-2">Shop Now</a>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </section> 
    );
  }
}
export default MainSlider;
