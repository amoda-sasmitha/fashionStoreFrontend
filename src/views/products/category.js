/*  eslint-disable */
import React, { Component } from "react";
import MainNavbar from "../../components/MainNavbar";
import CategorySection from "../../components/Category";
import Footer from "../../components/Footer";
import { getAllProductByCategory } from "../../controllers/Products";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: props.match.params.id,
      products: [],
      brands: [],
      tags: [],
      loading: true,
      
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.loadProducts(this.props.match.params.id);
  }

  
  componentWillReceiveProps(nextProps){
    if (nextProps.match.params.id) {
      if(nextProps.match.params.id !== this.state.id){
          this.setState({search : nextProps.match.params.id});
          this.loadProducts(nextProps.match.params.id);
          console.log(nextProps.match.params.id);
      }
    }
  }

  loadProducts = category => {
    this.setState({ loading: true });
    getAllProductByCategory(category)
      .then((result) => {
        console.log(result);
        this.setState({
          loading: false,
          products: result,
          brands: [...new Set(result.map((item) => item.brand))],
          tags: [
            ...new Set(
              result.reduce(
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
      category,
      loading,
    } = this.state;
    return (
      <div className="wrapper">
        <MainNavbar ></MainNavbar>
        <CategorySection
          products={products}
          brands={brands}
          tags={tags}
          type={this.props.match.params.id}
          loading={loading}
        />
        <Footer></Footer>
      </div>
    );
  }
}
export default Category;
