import React from 'react';
import MainNavbar from '../../components/MainNavbar';
import ProductItem from '../../components/ProductItem';
import Footer from '../../components/Footer';
import {  Modal } from 'react-bootstrap'
import { getAllProductByCategory } from '../../controllers/Products'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEye, faCircle, faWindowClose , faPlus, faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'
class Category extends React.Component {
 
constructor(props){
     super(props);
     this.state = {
        filter_menu_expand : false,
        category : props.match.params.id,
        products : [],
        brands : [],
        tags : [] ,
        loading : true ,
        selected_brands : [],
        selected_size : '',
        selected_tags : [],

     }
 }

componentDidMount(){
    window.scrollTo(0, 0);
    this.loadProducts();
    
}

loadProducts = () => {
    this.setState({loading : true})
    getAllProductByCategory(this.state.category)
        .then( result => {
            console.log(result);
            this.setState({
                loading : false ,
                products : result,
                brands : [ ...new Set(result.map(item => item.brand))],
                tags : [
                   ...new Set(
                       result.reduce( 
                           (acc , current) => [...acc , ...current.tags.map(item => item.label) ] 
                       ,[])
                   )
                ]
            });
        })
        .catch ( err => {
            console.log(err);
            this.setState({loading : false})
        })
  }

 toggleFilterMenu = () => this.setState({filter_menu_expand : !this.state.filter_menu_expand});

  render(){
    const {filter_menu_expand , products , brands , category , loading} = this.state;
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
                                            { products.length> 0 &&<li>
                                                <h5 className="text-dark font-weight-bold mt-2 mr-2">{category}
                                                <span className="small text-muted mx-2">
                                                    {("0" + products.length).slice(-2)} results found.</span>
                                                </h5>
                                            </li>}
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
                                        </ul>
                                    </nav>
                                </div>         
                            </div>
                        </div>
                        <div className="product-list">
                            <div className="row">
                               {                          
                                   this.filter( products)
                                   .map( (item,key) => (
                                     <ProductItem 
                                        key={key} 
                                        {...item}>
                                    </ProductItem>  
                                   ))
                               }
                               {
                                   !loading && products.length == 0 && <this.NoItemFound/> 
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

  NoItemFound = () => (
    <div className="col-12">
        <div className="card shadow-sm border py-4">
            <img src="images/default/no_result.png" className="rounded mx-auto d-block" width={110}/>
            <h5 className="mx-auto text-dark"><b>Sorry</b> , No results found for "{this.state.category}"</h5>
            <h6 className="mx-auto text-dark mt-1">change route and try again</h6>
        </div>
    </div>
  );

  FilterModel = () => (
    <div  className={`dropdown-menu border-0 p-0 mt-2 shadow-sm  ${this.state.filter_menu_expand && 'show'}` }>
        <div className="container px-0 filter-widget-border">
            <div className="row bg-white rounded-0 m-0 w-100 p-2 ">
                <div className="filter-widget  col-md-4 col-sm-6 col-12">
                    <this.renderBrand/>
                </div> 
                <div className="filter-widget col-md-4 col-sm-6 col-12">
                    <this.renderTags/>
                </div>
                <div className="filter-widget col-md-4 col-sm-6 col-12">
                    <this.renderSizes/>  
                </div>
            </div>
        </div>
    </div>
  );

  FilterItems = () => (
    <>
    <div className="filter-widget filter-widget-border col-lg-12  col-sm-12 ">
        <this.renderBrand/>
    </div> 
    <div className="filter-widget filter-widget-border  col-lg-12  col-sm-12">
        <this.renderSizes/>  
    </div>
    <div className="filter-widget filter-widget-border  col-lg-12  col-sm-12">
        <this.renderTags/>
    </div>
    </>
  );

  renderBrand = () => {
      const { selected_brands} = this.state;
    return(
        <>    
        <h4 className="fw-title">Brand</h4>
        <div className="fw-brand-check">
            { this.state.brands.map( (item , i)  => (
                <div key={i} className="bc-item" onClick={ () => this.clickBrand(item) }>
                    <label htmlFor="bc-calvin-2">
                        <FontAwesomeIcon 
                            icon={ selected_brands.includes(item) ? faCheckSquare : faSquare} 
                            className={ selected_brands.includes(item) ? 
                                    'text-success mx-2' : 'text-white border mx-2' } />
                        {item.toUpperCase()}
                        
                    </label>
                </div>
                ))
            }
        </div>
        </>
    );
 }

  renderTags = () => (
    <>    
   <h4 className="fw-title">Tags</h4>
        <div className="fw-tags">
        { this.state.tags.map( (item , i) => (
             <label 
                key={i} 
                onClick={ () => this.clickTag(item) }
                className={this.state.selected_tags.includes(item) ? 
                "bg-secondary text-white click" : "click"}>
                    {item}
            </label>
            ))
        }
    </div>
    </>
  );

  renderSizes = () => (
    <>    
   <h4 className="fw-title">Size</h4>
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
    </>
  );



  clickBrand = brand => {
      let {selected_brands} = this.state;
      if(selected_brands.includes(brand)){
          this.setState({selected_brands : selected_brands.filter( i => i != brand )})
      }else{
        this.setState({ selected_brands : [ ...selected_brands , brand] })
      }
  }

  clickTag = tag => {
      let {selected_tags} = this.state;
      if(selected_tags.includes(tag)){
          this.setState({selected_tags : selected_tags.filter( i => i != tag )})
      }else{
        this.setState({ selected_tags : [ ...selected_tags , tag] })
      }
  }


  filter = products => {
     const { selected_brands , selected_size , selected_tags} = this.state;
     let filtered_products = products;
     
     if(selected_brands.length > 0 ){
        filtered_products =  products.filter( item => selected_brands.includes(item.brand ));
     }

     if(selected_tags.length > 0 ){
        filtered_products =  filtered_products.filter( item => {
            return item.tags.some( i => selected_tags.includes(i.label) )
        }) 
     }

     if(selected_size !== ''){
        filtered_products = filtered_products.filter(item => {
            return item.sizes.some( size => size.value == selected_size )
        })
     }

     return filtered_products;
  }



}
export default Category;

        
           
       