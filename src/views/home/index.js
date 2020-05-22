      /*  eslint-disable */
import { connect } from 'react-redux';
import React from 'react';
import MainNavbar from '../../components/MainNavbar';
import MainSlider from '../../components/MainSlider';
import Footer from '../../components/Footer';
import { getAllCategories , insertCategory , updateCategory , deleteCategory } from '../../controllers/Category'
import Config from "../../controllers/Config";
import moment from 'moment'
import {Link} from "react-router-dom";
import {getCategories} from '../../actions/cartActions'
import M_Manager from '../../controllers/Manager'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories : [],
      offers : [],
    }
}

 componentDidMount(){
  console.log(this.props.isAuthed);
  this.loadCategories();
  this.getAllOffers()
  this.props.getCategories && this.props.getCategories();

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

getAllOffers(){
  M_Manager.getAllOffersDetails()
     .then( result => { 
         console.log(result.data);
         this.setState({
             offers : result.data.splice(-3)
         })
     })
     .catch( err => {
         console.log(err);
         Config.setErrorToast(" Somthing Went Wrong!"); 
     })
 }
  

  render(){
    const {categories , offers} = this.state;
    window.scrollTo(0, 0)
    return(
    <div className="wrapper" >
        <MainNavbar isAuthed = {this.props.isAuthed}    ></MainNavbar>
        <MainSlider></MainSlider>
        { offers.length > 0 && 
        <>
        <h4 className="pt-3 pb-1 px-lg-5 px-2 text-dark  font-weight-bold">Latest Offers</h4>
        <section className=" pb-3">
          <div className="container-fluid px-lg-5" >
            <div className="row justify-content-center" >
          
              { offers.map( offer => (
              <div className={`col-md-4 col-12 p-2  my-2`} >
              <div className="card  rounded-custom shadow bg-light py-5 border-0 child"
                  style={{ backgroundImage : `url('${Config.setImage(offer.banner_image)}')` ,  backgroundSize : 'cover' }} >
                
                 <div className={`py-4 px-4`}
                  style={{backgroundColor : offer.size == 12 ? 'rgba(255,255,255,0.4)' : 'unset'}}
                 >
                  <h5 >Up to {offer.discount}%</h5>
                  <h4 className="font-weight-bold pb-2">{offer.title}</h4>
                  <h5>{offer.subtitle}</h5>
                  <Link to={`/offers/details/${offer._id}`}>
                          <label className="primary-btn  mt-2 click">Shop Now</label>
                  </Link>
                </div>
              </div>
            </div>) )}
             
            </div>
          </div>
          </section></> }
          { categories.length > 0 &&
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
         </section>}
        <Footer></Footer>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  cart : state.cart || {} ,
});

const mapDispatchToProps = {
  getCategories
};

export default connect(mapStateToProps , mapDispatchToProps)(Home);
