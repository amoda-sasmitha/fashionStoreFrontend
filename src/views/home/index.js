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
        <div className="w-100 py-5 mt-5" ></div>
        <Footer></Footer>
    </div>
    );
  }
}
export default Home;
