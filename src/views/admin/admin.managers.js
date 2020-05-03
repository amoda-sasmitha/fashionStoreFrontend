import React, { Component } from 'react';
import { Link } from "react-router-dom";
import AdminSidebar from '../../components/AdminSidebar'
import '../../asserts/commoncss/sidebar.css'
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { getAllCategories } from '../../controllers/Category'
import Config from "../../controllers/Config";
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenAlt, faEye } from '@fortawesome/free-solid-svg-icons'
import U_User from '../../controllers/User'

class AdminManagers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addManagerState: false,
            files: [],
            categories: []
        }

    }


    async componentWillMount() {
        await this.getSignInStatus()
    }


    // checksignIn
    async getSignInStatus() {
        var status = await U_User.checkSignedIn()
        console.log(status);

        if (status == false) {
            await window.location.replace("/admin");
        }
    }



    //add manager active





    render() {
        const { categories } = this.state;
        return (
            <div className="bg-light wd-wrapper">
                <AdminSidebar active={"managers"} />
                <div className="wrapper-wx" >
                    <div className="container-fluid" >
                        <div className="row">
                            <div className="col-12">
                                <h5 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                                    Stock Managers Managment
                                <span className="badge badge-success mx-2 admin_manager " onClick={() => this.setState({ addManagerState: true })}>Add Manager</span>
                                </h5>
                            </div>
                            <div className="col-12" style={{ display: this.state.addManagerState == true ? 'block' : 'none' }}>
                                <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                                    <form className=" py-2  px-3 ">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h6 className="form-label py-2">First  Name *</h6>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="John"
                                                    className="form-control" ></input>

                                                <h6 className="form-label py-2 mt-2">Email *</h6>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="johndoe@gmail.com"
                                                    className="form-control" ></input>
                                            </div>
                                            <div className="col-md-6">
                                                <h6 className="form-label py-2 ">Last  Name *</h6>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Doe"
                                                    className="form-control" ></input>
                                                <h6 className="form-label py-2 mt-2">Password  *</h6>
                                                <input
                                                    type="password"
                                                    name="name"
                                                    placeholder="Automaticaly Generate and Email"
                                                    className="form-control" disabled></input>
                                            </div>
                                            <div className="col-md-12 mt-4">
                                                <div className="d-flex">
                                                    <button type="reset" className="px-2 btn btn-secondary  btn-sm bold-normal ml-auto" onClick={() => this.setState({ addManagerState: false })}>
                                                        Cancel
                                                </button>
                                                    <button type="submit" className="px-2 btn btn-dark  btn-sm bold-normal ml-2"  >
                                                        Add Manager
                                                </button>
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
                                        All Stock Managers
                                </h5>
                                    <div className="table-responsive px-2">
                                        <table className="table table-stripped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Join Date</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Join Date</th>
                                                <th scope="col">Actions</th>
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
        return (
            <tr key={item._id}>
                <td>
                    <img src={Config.setImage(item.banner_image)} height={60} />
                </td>
                <td><b>{item.name}</b></td>
                <td>
                    <h6 className="form-label">{item.banner_title}</h6>
                    <span className="small">{item.banne_subtitle}</span>
                </td>
                <td>{moment(new Date(item.created_at)).format('YYYY MMM DD')}</td>
                <td>
                    <button className="btn btn-success btn-sm px-2 mr-2">
                        <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button className="btn btn-secondary btn-sm px-2 mr-2">
                        <FontAwesomeIcon icon={faPenAlt} />
                    </button>
                    <button className="btn btn-danger btn-sm px-2 mr-2">
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </td>
            </tr>
        );
    }
}

export default AdminManagers;
