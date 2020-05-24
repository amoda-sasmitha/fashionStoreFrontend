      /*  eslint-disable */

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import AdminSidebar from '../../components/AdminSidebar'
import '../../asserts/commoncss/sidebar.css'
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { getAllCategories , insertCategory , updateCategory , deleteCategory } from '../../controllers/Category'
import Config from "../../controllers/Config";
import moment from 'moment'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import U_User from '../../controllers/User'
import { faTrash , faPenAlt , faEye , faPlus, faSave, faUndoAlt, faWindowClose} from '@fortawesome/free-solid-svg-icons'

import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

class AdminCategory extends Component {

    constructor(props){
        super(props);
        this.state = {
            name : '',
            banne_subtitle : '',
            uploaded_image : '',
            banner_title : '',
            selected_item : {},
            files: [],
            update_mode : false,
            categories : [],
            errors : {},
            delete_item : {} 
        }
        
    }


    componentDidMount(){
        this.loadCategories();
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value });
     }

    onFormSubmit(e){
        e.preventDefault();
        let { name, banne_subtitle , banner_title , files , 
            selected_item , uploaded_image} = this.state;

        if(this.validate()){ 
            if(this.state.update_mode){
                
                let newImage = false;
                let image = {};
              
                if(uploaded_image.length == 0 && files.length > 0 ){
                    newImage = true;
                    image = files[0];
                }
                const user = this.props.auth.user;
            
                updateCategory( image , {
                    _id : selected_item._id,
                    name : name,
                    banne_subtitle : banne_subtitle,
                    banner_title : banner_title,
                    token :  user.token,
                    type:user.type

                } , newImage )
                .then( result => {
                    this.loadCategories();
                    this.clearAll();
                    Config.setToast(" Category Updated Successfully" );
                })
                .catch( err => {
                    console.log(err);
                    Config.setErrorToast(" Somthing Went Wrong!");
                })

            }else{
                const user = this.props.auth.user;
                insertCategory( files[0], {
                    name : name,
                    banne_subtitle : banne_subtitle,
                    banner_title : banner_title,
                    token : user.token,
                    type:user.type
                })
                .then( result => {
                    this.loadCategories();
                    this.clearAll();
                    Config.setToast("New Category Added Successfully" );
                })
                .catch( err => {
                    console.log(err);
                    Config.setErrorToast(" Upload Failed. Somthing Went Wrong!");
                })
            }
        }
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



    render(){
        const {categories , name , banner_title , banne_subtitle ,files, errors , update_mode , uploaded_image } = this.state;
        return(
                <div className="bg-light wd-wrapper">
                <AdminSidebar active={"categories"}/>
                <div className="wrapper-wx" >
                    <div className="container-fluid" >
                     <div className="row">
                         <div className="col-12">
                            <h5 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                                Product Categories 
                            <span className={`badge mx-2 badge-${update_mode ? 'info' : 'success'}`}>
                                {update_mode ? 'Update' : 'Add' } Mode</span>
                            </h5>
                         </div>
                         <div className="col-12">
                            <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">                             
                                <form className=" py-2  px-3" method="POST" onSubmit={(e) => this.onFormSubmit(e)}>
                                    <div className="row">                                      
                                        <div className="col-md-6">
                                            <h6 className="form-label py-2">Category Name</h6>
                                            <input 
                                                type="text" 
                                                name="name"
                                                value={name}
                                                onChange={ (e) => this.formValueChange(e)}
                                                placeholder="Enter Category Name" 
                                                className="form-control" ></input>
                                                { errors.name && errors.name.length > 0 &&
                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">
                                                        {errors.name}
                                                    </h4>
                                                } 
                                             <h6 className="form-label py-2 mt-2">Banner Title</h6>
                                            <input 
                                                type="text" 
                                                name="banner_title"
                                                placeholder="Enter Banner Title" 
                                                onChange={ (e) => this.formValueChange(e)}
                                                value={banner_title}
                                                className="form-control" ></input>
                                                { errors.banner_title && errors.banner_title.length > 0 &&
                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">
                                                        {errors.banner_title}
                                                    </h4>
                                                } 
                                            <h6 className="form-label py-2 mt-2">Banner Sub-title</h6>
                                            <input 
                                                type="text" 
                                                name="banne_subtitle"
                                                value={banne_subtitle}
                                                onChange={ (e) => this.formValueChange(e)}
                                                placeholder="Enter Sub-title" 
                                                className="form-control" ></input> 
                                                { errors.banne_subtitle && errors.banne_subtitle.length > 0 &&
                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">
                                                        {errors.banne_subtitle}
                                                    </h4>
                                                }                                       
                                        </div>
                                        <div className="col-md-6" >
                                        <h6 className="form-label pt-2 pb-3">Upload Banner Image</h6>
                                           
                                            {uploaded_image.length > 0 && files.length == 0 && 
                                            <div className="mb-3 img-wrap">
                                            <img className="rounded" src={uploaded_image} height={140}/> 
                                            <span className="text-white badge badge-danger close-btn"
                                            onClick={() => this.setState({uploaded_image : ''})}
                                            >Remove  
                                            <FontAwesomeIcon className="ml-1" icon={faWindowClose} ></FontAwesomeIcon>
                                            </span>    
                                            </div>
                                            }
                                            
                                            { uploaded_image.length == 0 && <FilePond
                                                ref={ref => (this.pond = ref)}
                                                files={this.state.files}
                                                allowMultiple={false}                                       
                                                onupdatefiles={fileItems => {                                                  
                                                    this.setState({
                                                    files: fileItems.map(fileItem => fileItem.file)
                                                    });
                                                }}
                                            > </FilePond> }

                                             { errors.image && errors.image.length > 0 &&
                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">
                                                        {errors.image}
                                                    </h4>
                                                } 
                                            <div className="d-flex">
                                                <button className="px-2 btn btn-dark  btn-sm bold-normal ml-auto" type="submit">
                                                <FontAwesomeIcon  icon={update_mode ? faSave : faPlus} />
                                                {update_mode ? ' Save Changes' : ' Add Category' }
                                                </button>
                                                {!update_mode && <button className="px-2 btn btn-secondary  btn-sm bold-normal ml-2" type="submit">
                                                <FontAwesomeIcon icon={faTrash} /> Clear
                                                </button>}
                                                {update_mode && <button type="button" className="px-2 btn btn-secondary  btn-sm bold-normal ml-2" 
                                                onClick={() => this.clearAll() }>
                                               <FontAwesomeIcon icon={faUndoAlt} /> Reset
                                                </button>}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            
                         </div>
                         {/* ----------------------------------------------------------- */}
                         <div className="col-12">
                            <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                                <h5 className="text-dark bold-normal py-2 bg-white px-2">
                                    Current Categories 
                                </h5>
                                <div className="table-responsive px-2">
                                    <table className="table table-stripped">
                                    <thead>
                                        <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Created At</th>
                                        <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      { categories.map( item => this.renderCategoryTableItem(item) )} 
                                     
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                         </div>
                     </div>
                    </div>
               
                </div>
                </div>
        )
    }

    renderCategoryTableItem = item => {
        return(
            <tr key={item._id}>
                <td>
                    <img src={Config.setImage(item.banner_image)} height={60}/>
                </td>
                <td><b>{item.name}</b></td>
                <td>
                    <h6 className="form-label">{item.banner_title}</h6>
                    <span className="small">{item.banne_subtitle}</span>
                </td>
                <td>{moment(new Date(item.created_at) ).format('YYYY MMM DD') }</td>
                <td>
                    <button className="btn btn-success btn-sm px-2 mr-2">
                        <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button className="btn btn-secondary btn-sm px-2 mr-2"
                        onClick={() => this.onClickUpdate(item) }>
                        <FontAwesomeIcon icon={faPenAlt} />
                    </button>
                    <button className="btn btn-danger btn-sm px-2 mr-2"
                     onClick={() => this.onClickDelete(item) }>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </td>
            </tr>
        );
    }

    onClickUpdate = item => {
        this.setState({
            selected_item : item,
            name : item.name ,
            banne_subtitle : item.banne_subtitle ,
            banner_title : item.banner_title ,
            files : [],
            uploaded_image : Config.setImage(item.banner_image ),
            errors : {},
            update_mode : true,
        })
    }

    onClickDelete = item => {
        Config.setDeleteConfirmAlert(
            "", 
            "Are you sure you want to delete this category ?",
            () => this.clickDeleteCategory(item._id) ,
            () => {}
        )
    }

    clickDeleteCategory = id => {
        const user = this.props.auth.user;
        deleteCategory(id, user.token, user.type )
            .then( result => {
                this.loadCategories();
                Config.setToast(" Category Deleted Successfully" );
            })
            .catch( err => {
                console.log(err);
                Config.setErrorToast(" Somthing Went Wrong!");
            })
    } 

    validate = () => {
        let { errors , name, banne_subtitle , banner_title  } = this.state;
        let count = 0;
        
        if( name.length == 0 ){
            errors.name = "Name can not be empty"
            count++
        }else{
            errors.name = "" 
        }

        if( banne_subtitle.length == 0 ){
            errors.banne_subtitle = "Banner subtitle can not be empty"
            count++
        }else{
            errors.banne_subtitle = "" 
        }

        if( banner_title.length == 0 ){
            errors.banner_title = "Banner title can not be empty"
            count++
        }else{
            errors.banner_title = "" 
        }
        
        console.log(this.state.files.length);
        if(this.state.files.length == 0 && !this.state.update_mode ){
            errors.image = "Banner image can not be empty"
            count++    
        }else{
            errors.image = ""      
        }

        if(this.state.files.length == 0 && this.state.update_mode && this.state.uploaded_image.length == 0 ){
            errors.image = "Banner image can not be empty"
            count++    
        }else{
            errors.image = ""      
        }

        this.setState({errors});
        return count == 0;
    }

    clearAll = () => {
        this.setState({
            name : '',
            update_mode : false,
            banne_subtitle : '',
            uploaded_image : '',
            banner_title : '',
            files: [],
            errors : {}
        })
    } 

}


const mapStateToProps = state => ({
    auth: state.auth || {},
  });

export default connect(mapStateToProps)(withRouter(AdminCategory));
