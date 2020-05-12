      /*  eslint-disable */

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
import { faTrash, faPenAlt, faEye, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import U_User from '../../controllers/User'
import Uniqid from 'uniqid'
import A_Admin from '../../controllers/Admin'
class AdminManagers extends Component {

    constructor(props) {
        super(props);
        this.clearfield = this.clearfield.bind(this)
        this.state = {
            addManagerState: true,
            fname: '',
            lname: '',
            email: '',
            managers: [],
            managersState: 0,

        }

    }





    getAllManagers = () => {
        return new Promise((resolve, reject) => {
            return A_Admin.getAllAdmins()
                .then(result => {

                    resolve({ code: 200, data: result.data })

                    this.setState({
                        managers: result.data.managers
                    })
                })
                .catch(err => {
                    reject({ code: 0, error: err })
                })
        })
    }

    async componentWillMount() {
        await this.getSignInStatus()
        await this.getAllManagers()
        // await this.checkManagers()


    }

    checkManagers() {
        if (this.state.managers.length != 0) {
            this.setState({
                managersState: 1
            })
        } else {

        } this.setState({
            managersState: 0
        })
    }
    // checksignIn
    async getSignInStatus() {
        var status = await U_User.checkSignedIn()
        console.log(status);

        if (status == false) {
            await window.location.replace("/admin");
        }
    }




    formDetails = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    clearfield = () => {
        this.setState({
            fname: '',
            lname: '',
            email: '',
        })
    }

    onAddUser = async (e) => {
        e.preventDefault()
        var password = Uniqid('Fashi')
        var addUserState = await A_Admin.addManager(this.state.fname, this.state.lname, this.state.email, password)
        switch (addUserState) {
            // success
            case 200:
                Config.showAlert("Sucessfully Added", "Done!");
                await this.clearfield()
                //    await this.checkManagers()
                await this.getAllManagers()

                return 0;
            // Alredy have an account
            case 403:
                await Config.showAlert(
                    "Alredy have an account associated to this email"
                );
                break;
            // network error
            case 600:
                Config.showAlert("Please check your network connection", "Oops!");
                break;
            default:
                Config.showAlert("Something went wrong. Please try again", "Oops!");
                break;
        }
        await this.clearfield()



    }

    render() {

        const { managers, managersState, fname, lname, email } = this.state;
        return (
            <div className="bg-light wd-wrapper">
                <AdminSidebar active={"managers"} />
                <div className="wrapper-wx" >
                    <div className="container-fluid" >
                        <div className="row">
                            <div className="col-12">
                                <h5 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                                    Stock Managers Managment
                                <span className="badge badge-success mx-2  " onClick={() => this.setState({ addManagerState: true })}>Add Manager</span>
                                </h5>
                            </div>
                            <div className="col-12" style={{ display: this.state.addManagerState == true ? 'block' : 'none' }}>
                                <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                                    <form className=" py-2  px-3 " onSubmit={(e) => this.onAddUser(e)} >
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h6 className="form-label py-2">First  Name *</h6>
                                                <input
                                                    type="text"
                                                    name="fname"
                                                    placeholder="John"
                                                    className="form-control" value={fname} onChange={(e) => this.formDetails(e)} required></input>

                                                <h6 className="form-label py-2 mt-2">Email *</h6>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="johndoe@gmail.com"
                                                    className="form-control" value={email} onChange={(e) => this.formDetails(e)} required></input>
                                            </div>
                                            <div className="col-md-6">
                                                <h6 className="form-label py-2 ">Last  Name *</h6>
                                                <input
                                                    type="text"
                                                    name="lname"
                                                    placeholder="Doe"
                                                    className="form-control" value={lname} onChange={(e) => this.formDetails(e)} required></input>
                                                <h6 className="form-label py-2 mt-2">Password  *</h6>
                                                <input
                                                    type="password"
                                                    name="name"
                                                    placeholder="Automaticaly Generate and Email"
                                                    className="form-control" disabled></input>
                                            </div>
                                            <div className="col-md-12 mt-4">
                                                <div className="d-flex">
                                                    <button type="reset" className="px-2 btn btn-secondary  btn-sm bold-normal ml-auto" >
                                                        Cancel
                                                </button>
                                                    <button type="submit" className="px-2 btn btn-dark  btn-sm bold-normal ml-2"   >
                                                        Add Manager
                                                </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                {/* <button onClick={() => this.getAllManagers()}>Vee</button> */}
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
                                                {managers.map(item => this.displayAllManagers(item))}
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

    displayAllManagers = item => {

        return (
            <tr key={item._id}>

                <td><b>{item.fname} &nbsp; {item.lname}</b></td>
                <td>{item.email}</td>
                <td>{moment(new Date(item.created_at)).format('YYYY MMM DD')}</td>
                <td>
                    <button className="btn btn-danger btn-sm px-2 mr-2">
                        <FontAwesomeIcon icon={faTrash} />
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
