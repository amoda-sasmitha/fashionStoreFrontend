      /*  eslint-disable */

import React from 'react';
import Config from "../controllers/Config";
import {Link} from 'react-router-dom'
class ProductItem extends React.Component {


  render(){
    const item = this.props;
    return(
        <div className="col-lg-4 col-md-4 col-6">
        <div className="product-item">
                <div className="pi-pic border rounded-lg">
                    <img src={Config.setImage(item.images[0])} alt={item.name} className="rounded-lg "/>
                    <div className="icon">
                        <i className="icon_heart_alt"></i>
                    </div>
                    <ul className="mb-2" >
                        <li className="w-icon active"><span href="#">Cart</span></li>
                        <Link to={`/product/${item._id}`}>
                        <li className="quick-view z-icon"><span >View Item</span></li>
                        </Link>
                    </ul>
                </div>
                <div className="pi-text">
                <div className="catagory-name">{item.brand}</div>
                    <a href="#">
                     <h5>{item.name}</h5>
                    </a>
                    <div className="product-price">
                        {`LKR ${item.price}`}
                     { item.discount && <span>{item.discount}</span> }
                    </div>
                </div>
            </div>
        </div>
    );
    }


}
export default ProductItem;

