import React, { Component } from "react";
import MainNavbar from "../../components/MainNavbar";
import CategorySection from "../../components/Category";
import Footer from "../../components/Footer";
import { getProductByOffer } from "../../controllers/Products";

class OffersDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      products: [],
      brands: [],
      tags: [],
      loading: true,
      name : "",
      
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.loadProducts(this.props.match.params.id);
  }


  loadProducts = (id) => {
    this.setState({ loading: true });
    getProductByOffer(id)
      .then((result) => {

        this.setState({
          loading: false,
          name : result.title,
          products: result.products ,
          brands: [...new Set(result.products.map((item) => item.brand))],
          tags: [
            ...new Set(
                result.products.reduce(
                (acc, current) => [
                  ...acc,
                  ...current.tags.map((item) => item.label),
                ],
                []
              )
            ),
          ],
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

 

  render() {
    const {
      products,
      brands,
      tags,
      id,
      name,
      loading,
    } = this.state;
    return (
      <div className="wrapper">
        <MainNavbar></MainNavbar>
        <CategorySection
          products={products}
          brands={brands}
          tags={tags}
          type={name}
          loading={loading}
        />
        <Footer></Footer>
      </div>
    );
  }
}
export default OffersDetails;
