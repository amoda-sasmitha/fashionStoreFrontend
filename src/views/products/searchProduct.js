import React, { Component } from "react";
import MainNavbar from "../../components/MainNavbar";
import CategorySection from "../../components/Category";
import Footer from "../../components/Footer";
import { getProductBySearch } from "../../controllers/Products";

class SearchProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: props.match.params.search,
      products: [],
      brands: [],
      tags: [],
      loading: true,
      
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.loadProducts(this.props.match.params.search);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.match.params.search) {
      if(nextProps.match.params.search !== this.state.search){
          this.setState({search : nextProps.match.params.search});
          this.loadProducts(nextProps.match.params.search);
          console.log(nextProps.match.params.search);
      }
    }
  }

  loadProducts = (search) => {
    this.setState({ loading: true });
    getProductBySearch(search)
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
      search,
      loading,
    } = this.state;
    return (
      <div className="wrapper">
        <MainNavbar></MainNavbar>
        <CategorySection
          products={products}
          brands={brands}
          tags={tags}
          type={search}
          loading={loading}
        />
        <Footer></Footer>
      </div>
    );
  }
}
export default SearchProduct;
