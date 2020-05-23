
import React from "react";
import MainNavbar from "../../components/MainNavbar";
import Footer from "../../components/Footer";
import M_Manager from '../../controllers/Manager'
import Config from "../../controllers/Config";
import {Link} from "react-router-dom";
class Offers extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      offers: [],
    }
  }

  componentDidMount(){
    this.getAllOffers()
  }

  getAllOffers(){
    M_Manager.getAllOffersDetails()
       .then( result => { 
           console.log(result.data);
           this.setState({
               offers : result.data.sort( (a, b) => b.size - a.size )
           })
       })
       .catch( err => {
           console.log(err);
           Config.setErrorToast(" Somthing Went Wrong!"); 
       })
   }

  render() {
    const { offers} = this.state;
    return (
      <div className="wrapper">
        <MainNavbar active="offers"></MainNavbar>
        <div className="container-fluid px-5">
          <h4 className="text-dark font-weight-bold mt-3">Latest Offers</h4>
          <div className="row " >
            { offers.map( offer => (
              <div className={`col-md-${offer.size} col-12 p-2  my-2`} >
              <div className="card  rounded-custom shadow bg-light py-5 border-0 child"
                  style={{ backgroundImage : `url('${Config.setImage(offer.banner_image)}')` ,  backgroundSize : 'cover' }} >
                
                {offer.size && offer.size == 6 && <div className="py-4 px-4">
                  <h5 >Up to {offer.discount}%</h5>
                  <h4 className="font-weight-bold pb-2">{offer.title}</h4>
                  <h5>{offer.subtitle}</h5>
                  <a href="#" className="primary-btn mt-2">Shop Now</a>
                </div>}

                {offer.size && offer.size == 12 && <center><div className="py-4 px-4">
                  <h5 >Up to {offer.discount}%</h5>
                  <h2 className="font-weight-bold pb-2">{offer.title}</h2>
                  <h4>{offer.subtitle}</h4>
                  <Link to={`/offers/details/${offer._id}`}>
                          <label className="primary-btn  mt-2 click">Shop Now</label>
                  </Link>
                </div>
                </center>
                }
              </div>
            </div>) )}
          </div>
        </div>
          <Footer></Footer>
      </div>
    );
  }
}

export default Offers;
