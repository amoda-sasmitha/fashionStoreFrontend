import React, { Component } from 'react';
import { Link } from "react-router-dom";
import AdminSidebar from '../../components/AdminSidebar'
import '../../asserts/commoncss/sidebar.css'
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import Config from "../../controllers/Config";
import moment from 'moment'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getAllCategories } from '../../controllers/Category'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';

const animatedComponents = makeAnimated();

class AddProducts extends Component {

    constructor(props){
        super(props);
        this.state = {
            name : '',
            price : '',
            description : '',
            category : {},
            categories : [],
            sizes : [],
            tags : []
        }
    }

    componentDidMount(){
        this.loadCategories();
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


    render(){
        
        const { name , description , price ,categories , category} = this.state;

        return(
            <div className="bg-light wd-wrapper">
                <AdminSidebar active={"products"}/>
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
                            <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-4">   
                                <form className=" py-2  px-3" method="POST" onSubmit={(e) => this.onFormSubmit(e)}>
                                    <div className="row"> 

                                        {/*---------Product Name--------------  */}
                                        <div className="col-md-7">
                                            <h6 className="form-label py-2">Product Name</h6>
                                            <input 
                                                type="text" 
                                                name="name"
                                                //value={name}
                                                //onChange={ (e) => this.formValueChange(e)}
                                                placeholder="Enter Product Name" 
                                                className="form-control" ></input>
                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0"></h4>
                                        </div>  

                                        {/*---------Product Name--------------  */}
                                        <div className="col-md-5">
                                            <h6 className="form-label py-2">Product Price</h6>
                                            <input 
                                                type="text" 
                                                name="price"
                                                //value={price}
                                                //onChange={ (e) => this.formValueChange(e)}
                                                placeholder="Enter Product Price" 
                                                className="form-control" ></input>
                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0"></h4>
                                        </div>         

                                        {/*---------Product Name--------------  */}
                                        <div className="col-md-12">
                                        <h6 className="form-label py-2">Product Description</h6>
                                            <CKEditor
                                                editor={ ClassicEditor }
                                                data="<p>Enter Product Description</p>"                                    
                                                onChange={ ( event, editor ) => this.setState({description :editor.getData()}) }
                                            />
                                             <h4 className="small text-danger mt-2 font-weight-bold mb-0"></h4>
                                        </div> 

                                        {/*---------Product Brand--------------  */}
                                        <div className="col-md-6">
                                            <h6 className="form-label py-2">Product Brand</h6>
                                            <input 
                                                type="text" 
                                                name="brand"
                                                //value={brand}
                                                //onChange={ (e) => this.formValueChange(e)}
                                                placeholder="Enter Product Brand" 
                                                className="form-control" ></input>
                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0"></h4>
                                        </div> 

                                        {/*---------Product category--------------  */}
                                        <div className="col-md-6">
                                        <h6 className="form-label py-2">Product Category </h6>
                                            <select value={category.id} onChange={this.handleSelect}  className="form-control">
                                                <option value="">Select Category</option>
                                                { categories.map( c => <option key={c._id} value={c._id}>{c.name}</option> ) }                                           
                                            </select>
                                        </div> 

                                        {/*---------Product sizes--------------  */}
                                        <div className="col-md-6">
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
                                        </div>  

                                        {/*---------Product tags--------------  */}
                                        <div className="col-md-6">
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
                                        </div>  

                                        {/*---------Product colors--------------  */}
                                        <div className="col-md-6">
                                        <h6 className="form-label py-2">Select Available Colors</h6>
                                        <CreatableSelect
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            isMulti
                                            defaultValue={this.state.tags}
                                            placeholder="Create or Select Tags"
                                            onChange={this.handleChangeTags}
                                            options={[]}
                                            />
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
}

const Sizes = [ { value: 'XS', label: 'XS' }, { value: 'S', label: 'S' },
                { value: 'M', label: 'M' },{ value: 'L', label: 'L' },{ value: 'XL', label: 'XL' },
               ]

export default AddProducts;