import React from 'react';

class ProductItem extends React.Component {

     

  render(){
    const item = this.props;
    return(
        <div className="col-lg-4 col-md-4 col-6">
        <div className="product-item">
                <div className="pi-pic">
                    <img src={item.image} alt={item.name} className="rounded-lg "/>
                    <div className="icon">
                        <i className="icon_heart_alt"></i>
                    </div>
                    <ul className="mb-2" >
                        <li className="w-icon active"><a href="#">Cart</a></li>
                        <li className="quick-view z-icon"><a href="#">Quick View</a></li>
                    </ul>
                </div>
                <div className="pi-text">
                <div className="catagory-name">{item.type}</div>
                    <a href="#">
                     <h5>{item.name}</h5>
                    </a>
                    <div className="product-price">
                        {item.price}
                     { item.discount && <span>{item.discount}</span> }
                    </div>
                </div>
            </div>
        </div>
    );
}
}
export default ProductItem;

