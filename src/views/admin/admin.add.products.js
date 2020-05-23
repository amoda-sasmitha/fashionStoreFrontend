      /*  eslint-disable */

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import AdminSidebar from '../../components/AdminSidebar'
import '../../asserts/commoncss/sidebar.css'
import '../../asserts/commoncss/admin.product.css'
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import Config from "../../controllers/Config";
import moment from 'moment'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEye, faCircle, faWindowClose , faPlus } from '@fortawesome/free-solid-svg-icons'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getAllCategories } from '../../controllers/Category'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import { insertProduct } from '../../controllers/Products'

const animatedComponents = makeAnimated();

class AddProducts extends Component {

    constructor(props){
        super(props);
        this.state = {
            name : '',
            price : '',
            discount : '0',
            description : '',
            brand : '',
            category : {},
            categories : [],
            sizes : [],
            tags : [],
            files : [] ,
            colors : [],
            color_name : '',
            color_code : '',
            errors : {} ,
        }
    }

    componentDidMount(){
        this.loadCategories();
    }

    onFormSubmit = (e) => {
        e.preventDefault();

        if(this.validate()){
            insertProduct( this.state.files , {
                name : this.state.name, 
                price : this.state.price, 
                description : this.state.description, 
                brand : this.state.brand, 
                category : this.state.category, 
                sizes : this.state.sizes, 
                tags : this.state.tags, 
                colors : this.state.colors, 
                added_by : 1 ,
                discount : this.state.discount
            })
            .then( result => {
                this.clearAll();
                Config.setToast("Product Added Successfully" );
            })
            .catch( err => {
                console.log(err);
                Config.setErrorToast(" Somthing Went Wrong!");
               
            })
        }
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value });
     }

    handleSelect = (event) => {
        if( event.target.value.length > 0  ){
        let find = this.state.categories.find( e => e._id == event.target.value );
        this.setState({ category : { id : find._id , name : find.name } })
        }else{
        this.setState({ category : {} }) 
        }
      }

    handleChangeSizes = (newValue) => {
        this.setState({sizes : newValue });
    };

    handleChangeTags = inputValue => {
        this.setState({tags : inputValue });
    }

    addColor = () => {
        const { color_code , color_name   , colors} = this.state;
        if( color_code.length > 0 && color_name.length >  0 ){
           if( this.isColor(color_code) ){
                this.setState({ colors :
                     [ ...this.state.colors , { name : color_name , code : color_code } ] ,
                    color_code : '',
                    color_name : ''
                    })
           }
        }
    }


    render(){
        
        const { name ,colors , discount ,
            description , price ,categories , category  , color_name , color_code ,brand , errors } = this.state;

        return(
            <div className="bg-light wd-wrapper">
                <AdminSidebar active={"add_products"}/>
                <div className="wrapper-wx" >
                    <div className="container-fluid" >
                        <div className="row">
                        <div className="col-12">
                            <h5 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                                Products
                            <span className={`badge mx-2 badge-success`}>
                                 Add New</span>
                            </h5>
                         </div>
                         <div className="col-12">
                            <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-3 mb-5">   
                                <form className=" py-2  px-3" method="POST" onSubmit={(e) => this.onFormSubmit(e)}>
                                    <div className="row"> 

                                        {/*---------Product Name--------------  */}
                                        <div className="col-md-7 mt-2">
                                            <h6 className="form-label py-2">Product Name</h6>
                                            <input 
                                                type="text" 
                                                name="name"
                                                 value={name}
                                                onChange={ (e) => this.formValueChange(e)}
                                                placeholder="Enter Product Name" 
                                                className="form-control" ></input>
                                                { errors.name && errors.name.length > 0 && 
                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.name}</h4>}
                                        </div>  

                                        {/*---------Product Name--------------  */}
                                        <div className="col-md-5 mt-2">
                                            <h6 className="form-label py-2">Product Price</h6>
                                            <input 
                                                type="text" 
                                                name="price"
                                                value={price}
                                                onChange={ (e) => this.formValueChange(e)}
                                                placeholder="Enter Product Price" 
                                                className="form-control" ></input>
                                                 { errors.price && errors.price.length > 0 && 
                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.price}</h4>}
                                        </div>         

                                        {/*---------Product Name--------------  */}
                                        <div className="col-md-12 mt-2">
                                        <h6 className="form-label py-2">Product Description</h6>
                                            <CKEditor
                                                editor={ ClassicEditor }
                                                data="<p>Enter Product Description</p>"                                    
                                                onChange={ ( event, editor ) => this.setState({description :editor.getData()}) }
                                            />
                                             { errors.description && errors.description.length > 0 && 
                                            <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.description}</h4>}
                                        </div> 

                                        {/*---------Product Brand--------------  */}
                                        <div className="col-md-4 mt-2">
                                            <h6 className="form-label py-2">Product Brand</h6>
                                            <input 
                                                type="text" 
                                                name="brand"
                                                value={brand}
                                                onChange={ (e) => this.formValueChange(e)}
                                                placeholder="Enter Product Brand" 
                                                className="form-control" ></input>
                                                { errors.brand && errors.brand.length > 0 && 
                                            <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.brand}</h4>}
                                        </div> 

                                        {/*---------Product category--------------  */}
                                        <div className="col-md-5 mt-2">
                                        <h6 className="form-label py-2">Product Category </h6>
                                            <select value={category.id} onChange={this.handleSelect}  className="form-control">
                                                <option value="">Select Category</option>
                                                { categories.map( c => <option key={c._id} value={c._id}>{c.name}</option> ) }                                           
                                            </select>
                                            { errors.category && errors.category.length > 0 && 
                                            <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.category}</h4>}
                                        </div> 

                                         {/*---------Product Discount--------------  */}
                                         <div className="col-md-3 mt-2">
                                            <h6 className="form-label py-2">Discount Presentage (%)</h6>
                                            <input 
                                                type="text" 
                                                name="discount"
                                                value={discount}
                                                onChange={ (e) => this.formValueChange(e)}
                                                placeholder="Enter Product Brand" 
                                                className="form-control" ></input>
                                        </div> 


                                        {/*---------Product sizes--------------  */}
                                        <div className="col-md-6 mt-2">
                                        <h6 className="form-label py-2">Available Sizes</h6>
                                        <Select
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            isMulti
                                            defaultValue={this.state.sizes}
                                            onChange={this.handleChangeSizes}
                                            placeholder="Select Available Sizes"
                                            options={Sizes}
                                            />
                                             { errors.sizes && errors.sizes.length > 0 && 
                                            <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.sizes}</h4>}
                                        </div>  

                                        {/*---------Product tags--------------  */}
                                        <div className="col-md-6 mt-2">
                                        <h6 className="form-label py-2">Product Tags</h6>
                                        <CreatableSelect
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            isMulti
                                            defaultValue={this.state.tags}
                                            placeholder="Create or Select Tags"
                                            onChange={this.handleChangeTags}
                                            options={[]}
                                            />
                                              { errors.tags && errors.tags.length > 0 && 
                                            <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.tags}</h4>}
                                        </div>  

                                        {/*---------Product colors--------------  */}
                                        <div className="col-md-6 mt-2">
                                        <h6 className="form-label py-2">Select Available Colors</h6>
                                        <div className="input-group mt-2">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name="color_name"
                                            value={color_name}
                                            onChange={ (e) => this.formValueChange(e)}
                                            placeholder="Eg : White"/>
                                        
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name="color_code"
                                            value={color_code}
                                            onChange={ (e) => this.formValueChange(e)}
                                            placeholder="Eg : #FFFFFF" />

                                        <div className="input-group-append">
                                            <button 
                                                onClick={() => this.addColor()}
                                                className="btn btn-secondary form-label" 
                                                type="button">Add</button>
                                        </div>
                                        </div>  
                                        </div>
                                        <div className="col-md-6 mt-2">
                                        <h6 className="form-label py-2">Selected Colors</h6>
                                        { colors.map ( (color,id) => { 
                                            return (<span key={id}                                         
                                                        className="badge mx-2 badge-light px-3 py-2 border border-secondary h6 text-muted">
                                                        <FontAwesomeIcon icon={faCircle} color={color.code}  className="mr-2"/>{color.name}                                                        
                                                        <FontAwesomeIcon 
                                                        onClick={() => 
                                                            this.setState({ colors : this.state.colors.filter( c => c.code != color.code) })}
                                                        icon={faWindowClose}                            
                                                        className="click ml-2"></FontAwesomeIcon> 
                                                    </span>
                                            )})}
                                        </div>  

                                        {/* Images------------------------------------ */}
                                        <div className="col-md-12 mt-3">
                                        <h6 className="form-label py-2">Add Images</h6>
                                        <FilePond
                                                ref={ref => (this.pond = ref)}
                                                files={this.state.files}
                                                allowMultiple={true}                                       
                                                onupdatefiles={fileItems => {                                                  
                                                    this.setState({
                                                    files: fileItems.map(fileItem => fileItem.file)
                                                    });
                                                }}>
                                        </FilePond>
                                        { errors.images && errors.images.length > 0 && 
                                            <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.images}</h4>}
                                        </div>
                                        
                                        <div className="col-md-12 mt-2">
                                        <div className="d-flex">
                                                <button className="px-4 btn btn-dark  btn-sm bold-normal" type="submit">
                                                <FontAwesomeIcon  icon={faPlus} /> Add Product</button>
                                         </div>                                                      
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
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

    validate = () => {
        let { errors , name ,price , description , brand ,
            category , sizes , tags } = this.state;     
        let count = 0;
        
        if( name.length == 0 ){
            errors.name = "Name can not be empty"
            count++
        }else{
            errors.name = "" 
        }

        if( price.length == 0 ){
            errors.price = "Price can not be empty"
            count++
        }else{
            errors.price = "" 
        }

        if( description.length == 0 ){
            errors.description = "Description can not be empty"
            count++
        }else{
            errors.description = "" 
        }

        if( brand.length == 0 ){
            errors.brand = "Brand can not be empty"
            count++
        }else{
            errors.brand = "" 
        }

        if( typeof category.id == 'undefined' ){
            errors.category = "Category can not be empty"
            count++
        }else{
            errors.category = "" 
        }

        if( sizes == null || sizes.length == 0 ){
            errors.sizes = "At least one size must be required"
            count++
        }else{
            errors.sizes = "" 
        }

        if( tags == null || tags.length == 0 ){
            errors.tags = "At least one tag must be required"
            count++
        }else{
            errors.tags = "" 
        }


        if(this.state.files.length == 0  ){
            errors.images = "At least one tag must be required"
            count++    
        }else{
            errors.images = ""      
        }

        this.setState({errors});
        return count == 0;
    }


    isColor =  strColor => {
        var s = new Option().style;
        s.color = strColor;
        var test1 = s.color == strColor;
        var test2 = /^#[0-9A-F]{6}$/i.test(strColor);
        if(test1 == true || test2 == true){
            return true;
        } else{
            return false;
        }
      }

      clearAll = () => {
          this.setState({
            name : '',
            price : '',
            description : '',
            brand : '',
            category : {},
            sizes : [],
            tags : [],
            files : [] ,
            colors : [],
            color_name : '',
            color_code : '',
            errors : {} ,      
          });
      }
}

const Sizes = [ { value: 'XS', label: 'XS' }, { value: 'S', label: 'S' },
                { value: 'M', label: 'M' },{ value: 'L', label: 'L' },{ value: 'XL', label: 'XL' },
               ]

export default AddProducts;