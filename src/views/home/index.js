import React from 'react';
import MainNavbar from '../../components/MainNavbar';
import MainSlider from '../../components/MainSlider';
import Footer from '../../components/Footer';
import { getAllCategories , insertCategory , updateCategory , deleteCategory } from '../../controllers/Category'
import Config from "../../controllers/Config";
import moment from 'moment'
import {Link} from "react-router-dom";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories : [],
    }


}

 componentWillMount(){
  console.log(this.props.isAuthed);
  this.loadCategories();

 }

 loadCategories = () => {
  getAllCategories()
      .then( result => {
          console.log(result);
          this.setState({categories : result});
      })
      .catch ( err => {
          console.log(err);
      })
}
  

  render(){
    const {categories} = this.state;
    window.scrollTo(0, 0)
    return(
    <div className="wrapper" >
        <MainNavbar isAuthed = {this.props.isAuthed}    ></MainNavbar>
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
         <section className=" pb-3">
         <h4 className="pt-3 pb-1 px-lg-5 px-2 text-dark  font-weight-bold">Shop in Categories</h4>
         <div className="container-fluid px-lg-5" >
            <div className="row" >
              { categories.map( category => {
                return(
                  <div key={category._id} className="col-md-6 col-sm-6 col-12 p-2" >
                    <div className="card shadow bg-light py-5 border-0 category-height"
                      style={{ backgroundImage : `url('${Config.setImage(category.banner_image)}')` ,  backgroundSize : 'cover' }} >
                      <div className="py-4 px-4">
                        <h5 className="font-weight-bold mb-0 text-dark">- {category.name} -</h5>
                        <h4 className="font-weight-bold pb-1">{category.banner_title}</h4>
                        <h5>{category.banne_subtitle}</h5>
                         <Link to={`/categories/${category.name}`}>
                          <label className="primary-btn bg-dark mt-2 click">Shop Now</label>
                        </Link>
                    </div>
                  </div>
                </div>
                );
              })
              }
            </div>
          </div>   
         </section>
        <Footer></Footer>
    </div>
    );
  }
}
export default Home;
