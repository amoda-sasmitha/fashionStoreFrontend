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
import { faTrash, faPenAlt, faEye, faEnvelope, faBan } from '@fortawesome/free-solid-svg-icons'
import U_User from '../../controllers/User'
import Uniqid from 'uniqid'
import A_Admin from '../../controllers/Admin'
class AdminManagers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addManagerState: true,
            fname: '',
            lname: '',
            email: '',
            users: [],
            managersState: 0,

        }

    }






    getAllUsers = () => {
        return new Promise((resolve, reject) => {
            return A_Admin.getAllUsersAdmin()
                .then(result => {

                    resolve({ code: 200, data: result.data })
                    console.log(result.data);

                    this.setState({
                        users: result.data.users
                    })
                })
                .catch(err => {
                    reject({ code: 0, error: err })
                })
        })
    }

    async componentWillMount() {
        await this.getSignInStatus()
        await this.getAllUsers()

        console.log(this.state.users);


    }


    // checksignIn
    async getSignInStatus() {
        var status = await U_User.checkSignedIn()
        console.log(status);

        if (status == false) {
            await window.location.replace("/admin");
        }
    }






    render() {

        const { users, fname, lname, email } = this.state;
        return (
            <div className="bg-light wd-wrapper">
                <AdminSidebar active={"managers"} />
                <div className="wrapper-wx" >
                    <div className="container-fluid" >
                        <div className="row">
                            <div className="col-12">
                                <h5 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                                    User Managment
                                <span className="badge badge-success mx-2  " onClick={() => this.setState({ addManagerState: true })}>Add Manager</span>
                                </h5>
                            </div>
                            <div className="col-12" style={{ display: this.state.addManagerState == true ? 'block' : 'none' }}>
                                <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                                    <div className="row m-1 p-1">
                                        <div className="col-md-4">
                                            <div className="card" >
                                                <div className="card-body">
                                                    <h5 className="card-title">20</h5>
                                                    <h6 className="card-subtitle mb-2 text-muted">All Users</h6>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card" >
                                                <div className="card-body">
                                                    <h5 className="card-title">10</h5>
                                                    <h6 className="card-subtitle mb-2 text-muted">New Users</h6>

                                                </div>
                                            </div> </div>
                                        <div className="col-md-4">
                                            <div className="card" >
                                                <div className="card-body">
                                                    <h5 className="card-title">02</h5>
                                                    <h6 className="card-subtitle mb-2 text-muted">Ban Users</h6>

                                                </div>
                                            </div></div>
                                    </div>
                                </div>
                                {/* <button onClick={() => this.getAllManagers()}>Vee</button> */}
                            </div>
                            {/* ----------------------------------------------------------- */}
                            <div className="col-12">
                                <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                                    <h5 className="text-dark bold-normal py-2 bg-white px-2">
                                        All Users
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
                                                {users.map(item => this.displayAllUsers(item))}
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

    displayAllUsers = item => {

        return (
            <tr key={item._id}>

                <td><b>{item.fname} &nbsp; {item.lname}</b></td>
                <td>{item.email}</td>
                <td>{moment(new Date(item.created_at)).format('YYYY MMM DD')}</td>
                <td>
                    <button className="btn btn-success btn-sm px-2 mr-2">
                        <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button className="btn btn-danger btn-sm px-2 mr-2">
                        <FontAwesomeIcon icon={faBan} />
                    </button>
                    <button className="btn btn-info btn-sm px-2 mr-2">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </button>
                </td>
            </tr>
        );
    }
}
// dsdsdsd

export default AdminManagers;
