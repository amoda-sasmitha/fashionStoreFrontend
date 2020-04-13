import React from 'react';
import MainNavbar from '../../components/MainNavbar';
import ProductItem from '../../components/ProductItem';
import Footer from '../../components/Footer';
import {  Modal } from 'react-bootstrap'

class Category extends React.Component {
 
constructor(props){
     super(props);
     this.state = {
        filter_menu_expand : false,
     }
 }

 toggleFilterMenu = () => this.setState({filter_menu_expand : !this.state.filter_menu_expand});

  render(){
    const {filter_menu_expand} = this.state;
    return(
    <div className="wrapper" >
        <MainNavbar></MainNavbar>
        <section className="product-shop spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-12 order-2 order-lg-1 produts-sidebar-filter">
                        <div className="row d-none d-lg-block" >
                        <this.FilterItems/>  
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-12 order-1 order-lg-2">
                        <div className="product-show-option">
                            <div className="row">
                                <div className="col-12 ">
                                    <nav className="navbar p-0">
                                        <ul className="category-list">
                                            <li className="dropdown megamenu btn btn-sm px-4 filterbutton  d-lg-none"
                                                >
                                                <span id="megamenux" 
                                                    href="" 
                                                    onClick={this.toggleFilterMenu}
                                                    className="">
                                                        Filter
                                                </span>
                                                <this.FilterModel/>  
                                            </li>
                                            <li>
                                            <select className="sorting">
                                                <option value="">Default Sorting</option>
                                            </select>
                                            </li>
                                            <li>
                                            <select className="sorting">
                                                <option value="">10</option>
                                            </select>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>         
                            </div>
                        </div>
                        <div className="product-list">
                            <div className="row">
                               {
                                   data.map( (item,key) => (
                                     <ProductItem 
                                        key={key} 
                                        {...item}>
                                    </ProductItem>  
                                   ))
                               }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer></Footer>
    </div>
    );
  }

  FilterModel = () => (
    <div  className={`dropdown-menu border-0 p-0 mt-2 shadow-sm  ${this.state.filter_menu_expand && 'show'}` }>
        <div className="container px-0 filter-widget-border">
            <div className="row bg-white rounded-0 m-0 w-100 p-2 ">
                <div className="filter-widget  col-md-4 col-sm-6 col-12">
                <h4 className="fw-title">Brand</h4>
                <div className="fw-brand-check">
                    <div className="bc-item">
                        <label for="bc-calvin-2">
                            Calvin Klein
                            <input type="checkbox" id="bc-calvin-2"/>
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className="bc-item">
                        <label for="bc-diesel-2">
                            Diesel
                            <input type="checkbox" id="bc-diesel-2"/>
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className="bc-item">
                        <label for="bc-polo-2">
                            Polo
                            <input type="checkbox" id="bc-polo-2"/>
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className="bc-item">
                        <label for="bc-tommy-2">
                            Tommy Hilfiger
                            <input type="checkbox" id="bc-tommy-2"/>
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
                </div> 
                <div className="filter-widget col-md-4 col-sm-6 col-12">
                    <h4 className="fw-title">Tags</h4>
                    <div className="fw-tags">
                        <a href="#">Towel</a>
                        <a href="#">Shoes</a>
                        <a href="#">Coat</a>
                        <a href="#">Dresses</a>
                        <a href="#">Trousers</a>
                        <a href="#">Men's hats</a>
                        <a href="#">Backpack</a>
                    </div>
                </div>
                <div className="filter-widget col-md-4 col-sm-6 col-12">
                    <h4 className="fw-title">Size</h4>
                    <div className="fw-size-choose">
                        <div className="sc-item">
                            <input type="radio" id="s-size"/>
                            <label for="s-size">s</label>
                        </div>
                        <div className="sc-item">
                            <input type="radio" id="m-size"/>
                            <label for="m-size">m</label>
                        </div>
                        <div className="sc-item">
                            <input type="radio" id="l-size"/>
                            <label for="l-size">l</label>
                        </div>
                        <div className="sc-item">
                            <input type="radio" id="xs-size"/>
                            <label for="xs-size">xs</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );

  FilterItems = () => (
    <>
    <div className="filter-widget filter-widget-border col-lg-12  col-sm-12 ">
        <h4 className="fw-title">Brand</h4>
        <div className="fw-brand-check">
            <div className="bc-item">
                <label for="bc-calvin">
                    Calvin Klein
                    <input type="checkbox" id="bc-calvin"/>
                    <span className="checkmark"></span>
                </label>
            </div>
            <div className="bc-item">
                <label for="bc-diesel">
                    Diesel
                    <input type="checkbox" id="bc-diesel"/>
                    <span className="checkmark"></span>
                </label>
            </div>
            <div className="bc-item">
                <label for="bc-polo">
                    Polo
                    <input type="checkbox" id="bc-polo"/>
                    <span className="checkmark"></span>
                </label>
            </div>
            <div className="bc-item">
                <label for="bc-tommy">
                    Tommy Hilfiger
                    <input type="checkbox" id="bc-tommy"/>
                    <span className="checkmark"></span>
                </label>
            </div>
        </div>
    </div> 
    <div className="filter-widget filter-widget-border  col-lg-12  col-sm-12">
        <h4 className="fw-title">Price</h4>
        <div className="filter-range-wrap mb-0">
            <div className="range-slider">
                <div className="price-input">
                    <input type="text" id="minamount" value="0.00"/>
                    <input type="text" id="maxamount" value="2500"/>
                </div>
            </div>
        </div>
        <a href="#" className="filter-btn mt-0">Filter</a>
    </div>
    <div className="filter-widget filter-widget-border  col-lg-12  col-sm-12">
        <h4 className="fw-title">Size</h4>
        <div className="fw-size-choose">
            <div className="sc-item">
                <input type="radio" id="s-size"/>
                <label for="s-size">s</label>
            </div>
            <div className="sc-item">
                <input type="radio" id="m-size"/>
                <label for="m-size">m</label>
            </div>
            <div className="sc-item">
                <input type="radio" id="l-size"/>
                <label for="l-size">l</label>
            </div>
            <div className="sc-item">
                <input type="radio" id="xs-size"/>
                <label for="xs-size">xs</label>
            </div>
        </div>
    </div>
    <div className="filter-widget filter-widget-border  col-lg-12  col-sm-12">
        <h4 className="fw-title">Tags</h4>
        <div className="fw-tags">
            <a href="#">Towel</a>
            <a href="#">Shoes</a>
            <a href="#">Coat</a>
            <a href="#">Dresses</a>
            <a href="#">Trousers</a>
            <a href="#">Men's hats</a>
            <a href="#">Backpack</a>
        </div>
    </div>
    </>
  );

}
export default Category;

const data = [
    {
     id : 1 ,
     type : 'Coat',
     image : '/images/products/product-2.jpg',
     name : 'Guangzhou sweater',
     price : 'LKR 2450.00',
    },
    {
     id : 2 ,
     type : 'Coat',
     image : '/images/products/product-4.jpg',
     name : 'Microfiber Wool Scarf',
     price : 'LKR 3700.00',
    },
    {
     id : 3 ,
     type : 'Shoes',
     image : '/images/products/product-3.jpg',
     name : 'Guahou shoes',
     price : 'LKR 5050.00',
    },
    {
     id : 4 ,
     type : 'Hats',
     image : '/images/products/man-4.jpg',
     name : 'Men\'s Painted Hat',
     price : 'LKR 5450.00',
    },
    {
     id : 5 ,
     type : 'Shoes',
     image : '/images/products/man-3.jpg',
     name : 'Converse Shoes',
     price : 'LKR 1300.00',
    },
    {
     id : 6 ,
     type : 'Bag',
     image : '/images/products/women-4.jpg',
     name : 'Gxneon Towel',
     price : 'LKR 1400.00',
    },
]