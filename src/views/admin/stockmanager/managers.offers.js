import React, { Component } from 'react';
import { Link } from "react-router-dom";
import AdminSidebar from '../../../components/AdminSidebar'
import '../../../asserts/commoncss/sidebar.css'
import '../../../asserts/commoncss/admin.product.css'
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import Config from "../../../controllers/Config";
import moment from 'moment'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEye, faCircle, faWindowClose , faPlus } from '@fortawesome/free-solid-svg-icons'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getAllCategories } from '../../../controllers/Category'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import { insertProduct } from '../../../controllers/Products'

const animatedComponents = makeAnimated();

class ManagersOffers extends Component {

    constructor(props){
        super(props);
        this.state = {
            title : '',
            stitle : '',
            discount : '',
            size : '',
            category : {},
            categories : [],
            products : [],
            files : [] ,
            errors : {} ,
        }
    }

    componentDidMount(){

    }

    onFormSubmit = (e) => {
        e.preventDefault();


        if(this.validate()){

            console.log("Done")
            console.log("TITLE", this.state.title)
            console.log("S TTITLE",this.state.stitle)
            console.log("DISCOUNT",this.state.discount)
            console.log("sIZE",this.state.size)
            console.log("PRODUCT",this.state.products)
            console.log("FILES",this.state.files)

            insertProduct( this.state.files , {
                title : this.state.name,
                stitle : this.state.price,
                description : this.state.description,
                brand : this.state.brand,
                category : this.state.category,
                sizes : this.state.sizes,
                tags : this.state.tags,
                colors : this.state.colors,
                added_by : 1 ,
            })
                .then( result => {
                    this.clearAll();
                    Config.setToast(" Offer Updated Successfully" );
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

    handleChangeSizes = (newValue) => {
        this.setState({products : newValue });
    };




    render(){

        const { title ,stitle , discount , size , errors, products } = this.state;

        return(
            <div className="bg-light wd-wrapper">
                <AdminSidebar active={"offers"}/>
                <div className="wrapper-wx" >
                    <div className="container-fluid" >
                        <div className="row">
                            <div className="col-12">
                                <h5 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                                    Offers
                                    <span className={`badge mx-2 badge-success`}>
                                 Add New</span>
                                </h5>
                            </div>
                            <div className="col-12">
                                <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-3 mb-5">
                                    <form className=" py-2  px-3" method="POST" onSubmit={(e) => this.onFormSubmit(e)}>
                                        <div className="row">

                                            {/*---------Product Name--------------  */}
                                            <div className="col-md-6 mt-2">
                                                <h6 className="form-label py-2">Offer Title</h6>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={title}
                                                    onChange={ (e) => this.formValueChange(e)}
                                                    placeholder="Enter Offer Title"
                                                    className="form-control" ></input>
                                                { errors.title && errors.title.length > 0 &&
                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.title}</h4>}
                                            </div>

                                            {/*---------Product Name--------------  */}
                                            <div className="col-md-6 mt-2">
                                                <h6 className="form-label py-2">Offer Sub Title</h6>
                                                <input
                                                    type="text"
                                                    name="stitle"
                                                    value={stitle}
                                                    onChange={ (e) => this.formValueChange(e)}
                                                    placeholder="Enter Offer Subtitle"
                                                    className="form-control" ></input>
                                                { errors.stitle && errors.stitle.length > 0 &&
                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.stitle}</h4>}
                                            </div>
                                            {/*---------Product Name--------------  */}
                                            <div className="col-md-6 mt-2">
                                                <h6 className="form-label py-2">Offer Discount</h6>
                                                <input
                                                    type="number"
                                                    name="discount"
                                                    value={discount}
                                                    onChange={ (e) => this.formValueChange(e)}
                                                    placeholder="Enter Offer Discount"
                                                    className="form-control" ></input>
                                                { errors.discount && errors.discount.length > 0 &&
                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.discount}</h4>}
                                            </div>
                                            <div className="col-md-6 mt-2">
                                                <h6 className="form-label py-2">Offer Size</h6>
                                                <select value={size} id="size" name="size" className="form-control" required onChange={ (e) => this.formValueChange(e) }>
                                                    <option value="12" name="size" defaultValue>Full</option>
                                                    <option value="6" name="size">Half</option>
                                                    <option value="4" name="size">Quarter</option>
                                                </select>
                                                { errors.size && errors.size.length > 0 &&
                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.size}</h4>}
                                            </div>



                                            {/*---------Product sizes--------------  */}
                                            <div className="col-md-6 mt-2">
                                                <h6 className="form-label py-2">Products</h6>
                                                <Select
                                                    closeMenuOnSelect={false}
                                                    components={animatedComponents}
                                                    isMulti
                                                    defaultValue={this.state.products}
                                                    onChange={this.handleChangeSizes}
                                                    placeholder="Select Products"
                                                    options={Sizes}
                                                />
                                                { errors.sizes && errors.sizes.length > 0 &&
                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.sizes}</h4>}
                                            </div>
                                            {/* Images------------------------------------ */}
                                            <div className="col-md-12 mt-3">
                                                <h6 className="form-label py-2">Add Banner</h6>
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
                                                        <FontAwesomeIcon  icon={faPlus} /> Add Offer</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            {/* -----------------------------view offers------------------------------ */}
                            <div className="col-12">
                                <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                                    <h5 className="text-dark bold-normal py-2 bg-white px-2">
                                        All Offers
                                    </h5>
                                    <div className="table-responsive px-2">
                                        <table className="table table-stripped">
                                            <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Offer Price</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }



    validate = () => {
        let { errors , title ,stitle , discount,
             } = this.state;
        let count = 0;

        if( title.length == 0 ){
            errors.title = "Name can not be empty"
            count++
        }else{
            errors.title = ""
        }

        if( stitle.length == 0 ){
            errors.stitle = "Price can not be empty"
            count++
        }else{
            errors.stitle = ""
        }

        if( discount.length == 0 ){
            errors.discount = "Description can not be empty"
            count++
        }else{
            errors.discount = ""
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




    clearAll = () => {
        this.setState({
            title : '',
            stitle : '',
            size : '',
            discount : '',
            sizes : [],
            files : [] ,
            errors : {} ,
        });
    }
}

const Sizes = [ { value: 'FA001', label: 'FA001' }, { value: 'FA002', label: 'FA002' },
    { value: 'FA003', label: 'FA003' },{ value: 'FA004', label: 'FA004' },{ value: 'FA005', label: 'FA005' },
]

export default ManagersOffers;