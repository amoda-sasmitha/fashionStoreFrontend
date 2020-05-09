import React from 'react';
import MainNavbar from '../../components/MainNavbar';
import Footer from '../../components/Footer';
import { getProductById} from '../../controllers/Products'
import Config from "../../controllers/Config";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEye, faCircle, faWindowClose , faPlus, faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ReactHtmlParser from 'react-html-parser';
class SingleProduct  extends React.Component {
 
constructor(props){
     super(props);
     this.state = {
        selected_size : '',
        product : {},
        quantity : 1 ,
        id : props.match.params.id,
        loading : true,
     }
}

componentDidMount(){
    this.loadProducts();
}

loadProducts = () => {
    this.setState({loading : true})
    getProductById(this.state.id)
        .then( result => {
            console.log(result);
            this.setState({
                loading : false ,
                product : result,
            });
        })
        .catch ( err => {
            console.log(err);
            this.setState({loading : false})
        })
  }

render(){
    const { quantity , product  , loading } = this.state;
    return(
        <div className="wrapper" >
        <MainNavbar></MainNavbar>
        <section className="product-shop spad">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="pl-4 pb-2">
                        <Carousel
                            swipeable={true}
                            showArrows={false}   
                        >
                            { product.images && product.images.map( item => {
                                return(
                                    <img src={Config.setImage(item)} />
                                );
                            })}  
                        </Carousel>
                        </div>
                    </div>
                    <div className="col-md-8">
                    <div className="product-details card  px-4 py-2">
                                <div className="pd-title">
                                    <span>{product.brand}</span>
                                    <h4 className="mt-1" style={{fontWeight : 500 , fontSize : '1.35rem'}}
                                     className="text-dark">{product.name}</h4>
                                </div>
                                <div className="pd-desc mt-2">
                                    <h5>
                                        <b>LKR {product.price}</b>
                                        {product.discount && <span>629.99</span>}
                                    </h5>
                                </div>
                                <div className="pd-color">
                                    <h6 className="text-secondary">Avaiable Colors</h6>
                                    <div className="pd-color-choose">
                                        <div className="cc-item">
                                            <label ></label>
                                        </div>
                                        <div className="cc-item">
                                            <label className="bg-primary"></label>
                                        </div>
                                        <div className="cc-item">
                                            <label className="bg-success"></label>
                                        </div>
                                    </div>
                                </div>
                                <div className="pd-size-choose">
                                <this.renderSizes/>  
                                </div>
                                <div className="quantity">
                                    <div className="pro-qty">
                                        <input type="number" value={quantity} 
                                        onChange={ e => this.setState({quantity : e.target.value}) }/>
                                    </div>
                                    <span  className="primary-btn pd-cart click">Add To Cart</span>
                                </div>
                                <ul className="pd-tags">
                                    <li><span>CATEGORIES</span>: {product.category_name}</li>
                                    <li><span>TAGS</span>: {product.tags && product.tags.map( item => `${item.value},`  )}</li>
                                </ul>
                        
                            </div>
                    </div>
                </div>
                <div className="row px-4" >
                <div className="mt-2 col-12">
                        <div className="tab-item">
                            <ul className="nav" role="tablist">
                                <li>
                                    <a className="active" data-toggle="tab" href="#tab-1" role="tab">DESCRIPTION</a>
                                </li>
                                <li>
                                    <a  data-toggle="tab" href="#tab-2" role="tab">Introduction</a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#tab-3" role="tab">Customer Reviews</a>
                                </li>
                            </ul>
                        </div>
                        <div className="tab-item-content">
                            <div className="tab-content">
                                <div className="tab-pane fade-in active" id="tab-1" role="tabpanel">
                                    <div className="pt-3">
                                        <div className="row">
                                            <div className="col-lg-12">
                                            { ReactHtmlParser(product.description) }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="tab-2" role="tabpanel">
                                    <div className="row">
                                    <div class="pt-3 col-12">
                                                <h5 className="font-weight-bold py-2">Introduction</h5>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                    aliquip ex ea commodo consequat. Duis aute irure dolor in </p>
                                                <h5 className="font-weight-bold py-2">Features</h5>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                    aliquip ex ea commodo consequat. Duis aute irure dolor in </p>
                                            </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="tab-3" role="tabpanel">
                                    <div className="customer-review-option">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* <Footer></Footer> */}
        </div>
    );
}

renderSizes = () => (
   
    <div className="fw-tags">
    <div className="fw-size-choose">
        { ['XS', 'S' , 'M' , 'L' , 'XL'].map( (item , i) => (
            <div
            key={i} 
            onClick={ () => this.setState({ selected_size : 
                    (this.state.selected_size == item ) ? '' : item }) } 
            className="sc-item">
                <label className={this.state.selected_size === item ? 
                    'bg-secondary text-white pt-0' : 'pt-0'}>
                    {item}
                </label>
            </div>
            ))
        }
    </div>
    </div>

  );

}

export default SingleProduct;
