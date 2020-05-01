import React from 'react';
import MainNavbar from '../../components/MainNavbar';
import MainSlider from '../../components/MainSlider';
import Footer from '../../components/Footer';

class Home extends React.Component {
  
  render(){
    return(
    <div className="wrapper" >
        <MainNavbar></MainNavbar>
        <MainSlider></MainSlider>
        <h4 className="pt-3 pb-1 px-lg-5 px-2 text-dark  font-weight-bold">Limited Offers</h4>
        <section className=" pb-3">
          <div className="container-fluid px-lg-5" >
            <div className="row justify-content-center" >
              <div className="col-md-4 col-sm-6 col-12 p-2 parent" >
                <div className="card  rounded-custom shadow bg-light py-5 border-0 child"
                   style={{ backgroundImage : `url('images/offers/offer02.png')` ,  backgroundSize : 'cover' }} >
                  <div className="py-4 px-4">
                    <h5 >Up to 65%</h5>
                    <h4 className="font-weight-bold pb-2">Sunglasses</h4>
                    <h5>Don't late,get Now!</h5>
                    <a href="#" className="primary-btn mt-2">Shop Now</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-12 p-2 parent" >
                <div className="card rounded-custom  shadow bg-light py-5 border-0 child" 
                style={{ backgroundImage : `url('images/offers/offer03.png')` ,  backgroundSize : 'cover' }} >
                <div className="py-4 px-4">
                    <h5 >Up to 35%</h5>
                    <h4 className="font-weight-bold pb-2">Hand Bags</h4>
                    <h5>Mega Sale!</h5>
                    <a href="#" className="primary-btn mt-2">Shop Now</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-12 col-12  p-2 parent" >
                <div className="card  rounded-custom shadow bg-light py-5 border-0 child"
                style={{ backgroundImage : `url('images/offers/offer01.png')` ,  backgroundSize : 'cover' }} >
                <div className="py-4 px-4">
                    <h5 >Up to 65%</h5>
                    <h4 className="font-weight-bold pb-2">Trendy Dresses</h4>
                    <h5>Don't late,get Now!</h5>
                    <a href="#" className="primary-btn mt-2">Shop Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="w-100 py-5 mt-5" ></div>
        <Footer></Footer>
    </div>
    );
  }
}
export default Home;
