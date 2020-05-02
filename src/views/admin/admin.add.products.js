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

class AddProducts extends Component {

    render(){
        
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
                            <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">   
                                <form className=" py-2  px-3" method="POST" onSubmit={(e) => this.onFormSubmit(e)}>
                                    <div className="row"> 
                                        <div className="col-md-6">
                                            <h6 className="form-label py-2">Product Name</h6>
                                            <input 
                                                type="text" 
                                                name="name"
                                                //value={name}
                                                //onChange={ (e) => this.formValueChange(e)}
                                                placeholder="Enter Category Name" 
                                                className="form-control" ></input>
                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0"></h4>
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
}

export default AddProducts;