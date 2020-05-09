import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';
// import config 
import C_Config from '../../controllers/Config'
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
import image from '../../asserts/Images/user.png'
import {  Line as LineChart, Bar, Doughnut } from 'react-chartjs-2';

class AdminManagers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showUserModal: false,
            addManagerState: true,
            fname: '',
            lname: '',
            email: '',
            users: [],
            managersState: 0,
            viewUser: '',
            browsers:[],
            lastLogins:[],
            statsBrowser: [],
            statYears:[],
            Yyears:[],
            Yuser:[],
            monthBaseUsers:[],
            monthBaseMonths:[],
            userUsage:[],
            MonthBasedYear:'',

        }

    }






    //sentMonth wise usge
    sentMonthwiseusge =  async () => {
        var monthandusers = this.state.monthBaseUsers;
        var months =[];
        var user = [];
        var year = monthandusers[0].year
        for(var i = 0 ; i < monthandusers.length; i++){
            months[i] = monthandusers[i].month;
            user[i] = monthandusers[i].usersCount;
        }

        await this.setState({
            monthBaseMonths : months,
            userUsage : user,
            MonthBasedYear : year
        })
        console.log(this.state.userUsage)

    }






    //get users from monthbase use

    setMonthBasedUsers =   () => {
        return new Promise((resolve, reject) => {
            return A_Admin.getUsageOfMonthBased()
                .then(result => {
                    resolve({ code: 200, data: result.data })
                    // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
                    // console.log(result.data);
                    // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++")

                    //
                    this.setState({
                        monthBaseUsers: result.data.monthBasedUser
                    })
                })
                .catch(err => {
                    reject({ code: 0, error: err })
                })
        })
    }


    // set users from year

    setUsersfromyear =  async () => {
         var ss = this.state.statYears;
            var years =[];
            var user = [];
            for(var i = 0 ; i < ss.length; i++){
                years[i] = ss[i].year;
                user[i] = ss[i].usersCount;
              }

              await this.setState({
                Yyears : years.reverse(),
                Yuser : user.reverse()
              })

    }


// get user stats
    getAllUsersStats = () => {
        return new Promise((resolve, reject) => {
            return A_Admin.getUserStats()
                .then(result => {
                    resolve({ code: 200, data: result.data })
                    // console.log(result.data);

                    this.setState({
                        statsBrowser: result.data.senDetails.browser,
                        statYears: result.data.senDetails.userInYear,

                    })
                })
                .catch(err => {
                    reject({ code: 0, error: err })
                })
        })
    }



// get user details
    getAllUsers = () => {
        return new Promise((resolve, reject) => {
            return A_Admin.getAllUsersAdmin()
                .then(result => {
                    resolve({ code: 200, data: result.data })
                    console.log("dsdsdsD", result);



                    this.setState({
                        users: result.data.users
                    })
                })
                .catch(err => {
                    // if(err){
                            // if(err.code == 403){
                            //     Config.showAlert("Your session is expired please sign in", "Oops!");
                            //       // this.props.history.push('/admin')
                            //
                            //
                            // }else{
                            //     Config.showAlert("Something went wrong. Please try again", "Oops!");
                            //     this.props.history.push('/')
                            //
                            // }
                        reject({ code: 0, error: err })

                    // }
                })
        })
    }


// get browser details
    getBrowsers = () => {
        return new Promise((resolve, reject) => {
            return A_Admin.getUsersBrowsers()
                .then(result => {
                    resolve({ code: 200, data: result.data })
                    // console.log(result.data);

                    this.setState({
                        browsers: result.data.browsers
                    })
                })
                .catch(err => {
                    reject({ code: 0, error: err })
                })
        })
    }
// get lastlogin  details
    getLastLogins = () => {
        return new Promise((resolve, reject) => {
            return A_Admin.getUserLastLogin()
                .then(result => {
                    resolve({ code: 200, data: result.data })
                    // console.log(result.data);

                    this.setState({
                        lastLogins: result.data.lastlogins
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
        await this.getBrowsers()
        await this.getLastLogins()
        await this.getAllUsersStats()
        await this.setUsersfromyear()
        await  this.setMonthBasedUsers()
        await this.sentMonthwiseusge()
        // console.log(this.state.browsers);
        // console.log(this.state.lastLogins);
        // console.log(this.state.statsBrowser);
        // console.log(this.state.statYears);


    }


    // checksignIn
    async getSignInStatus() {
        var status = await U_User.checkSignedIn()
        console.log(status);

        if (status == false) {
            await window.location.replace("/admin");
        }
    }



    // -------------------------------------------------------------- user functions ------------------------
    // view user modal
    async showViewUser(i) {
        var singleUser = this.state.users.filter(user => user._id == i);
        await this.setState({
            showUserModal: true,
            viewUser: singleUser[0]
        })
        console.log(this.state.viewUser);

    }
    render() {

        const { users, fname, lname, email, viewUser, statsBrowser, statYears, Yyears, Yuser, userUsage, MonthBasedYear } = this.state;
        return (
            <div className="bg-light wd-wrapper">
                <AdminSidebar active={"users"} />
                <div className="wrapper-wx" >

                    <div className="container-fluid" >
                        <div className="row">
                            <div className="col-12">
                                <h5 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                                    User Managment
                                {/*<span className="badge badge-success mx-2  " onClick={() => this.setUsersfromyear()}>Add Manager</span>*/}
                                </h5>
                            </div>
                            <div className="col-12" style={{ display: this.state.addManagerState == true ? 'block' : 'none' }}>
                                <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                                    <div className="row m-1 p-1">
                                        <div className="col-md-4 mt-2 ">
                                            <div className="card" >
                                                <div className="card-body">
                                                  {users.length < 10 ? <h5 className="card-title">0{users.length}</h5>   : <h5 className="card-title">{users.length}</h5> }
                                                    <h6 className="card-subtitle mb-2 text-muted">All Users</h6>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="card" >
                                                <div className="card-body">
                                                    <h5 className="card-title">10</h5>
                                                    <h6 className="card-subtitle mb-2 text-muted">New Users</h6>

                                                </div>
                                            </div> </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="card" >
                                                <div className="card-body">
                                                    <h5 className="card-title">02</h5>
                                                    <h6 className="card-subtitle mb-2 text-muted">Ban Users</h6>

                                                </div>
                                            </div></div>
                                    </div>
                                </div>
                                {/* charts --------------- */}
                                <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                                <div className="row">
                                        <div className="col-md-12 ">
                                            <div className="campaign ct-charts px-3">
                                                <h6 className="mt-2 mb-3">User Sessions  in {MonthBasedYear}</h6>
                                            <LineChart data={{
                                            labels: ['January', 'February', 'March', 'April', 'March', 'May', 'June', 'July', 'August', 'October', "November", 'December'] ,
                                                datasets:[
                                                   {
                                                    label : "Users",
                                                    backgroundColor: 'rgba(26, 188, 156,0.5)',
                                                    borderColor: 'rgba(39, 174, 96,0.4)',
                                                    data: userUsage

                                                   } 
                                                ]
                                            }}
                                            options={options2}
                                            width="600" height="220"/>
                                            </div>

                                        </div>

                                        <div className="col-md-6 mt-3">
                                            <div className="campaign ct-charts px-3">
                                            <h6 className="mt-2 mb-3">User Registration in past years</h6>
                                            <Bar data={{
                                            labels: Yyears ,
                                                datasets:[
                                                   {
                                                    label : "Users",
                                                    backgroundColor: 'rgba(220, 231, 117,0.5)',
                                                    borderColor: 'rgba(220, 231, 117,1.0)',
                                                    borderWidth: 1,
                                                    hoverBackgroundColor: 'rgba(220, 231, 117,0.4)',
                                                    hoverBorderColor: 'rgba(220, 231, 117,1)',
                                                    data: Yuser
                                                   } 
                                                ]
                                            }}
                                            options={options1}
                                            width="600" height="220"/>
                                            </div>

                                        </div>
                                        <div className="col-md-6  mt-3">
                                            <div className="campaign ct-charts px-3">
                                            <h6 className="mt-2 mb-3">User Browsers in {MonthBasedYear} </h6>

                                            <Doughnut  data={{
                                            labels: ['Chrome', 'IExplorer', 'Safari', 'Opera', 'Firefox'] ,
                                                datasets:[
                                                   {
                                                    label : "Users",
                                                    backgroundColor: [
                                                        '#4FC3F7',
                                                        'rgba(161, 136, 127,1.0)',
                                                        'rgba(144, 164, 174,1.0)',
                                                        'rgba(121, 134, 203,1.0)',
                                                        'rgba(255, 138, 101,1.0)',
                                                        ],
                                                        hoverBackgroundColor: [
                                                            '#4FC3F7',
                                                        'rgba(161, 136, 127,1.0)',
                                                        'rgba(144, 164, 174,1.0)',
                                                        'rgba(121, 134, 203,1.0)',
                                                        'rgba(255, 138, 101,1.0)',
                                                        ],
                                                    data: [statsBrowser.Chrome, statsBrowser.Firefox, statsBrowser.IExplorer, statsBrowser.Opera, statsBrowser.Safari]

                                                   } 
                                                ]
                                            }}
                                            width="600" height="220"/>
                                            </div>

                                        </div>
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
                {/*======================================*/}
                {/*=============== View User===============*/}
                {/*======================================*/}
                <Modal
                    size="lg"
                    show={this.state.showUserModal}
                    centered
                    onHide={() => this.setState({ showUserModal: false })}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>View User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-4">

                                <div className="IS_UI_profilePic" >
                                    <div className="profilePicture" >
                                        <img src={viewUser.profilepic == undefined || viewUser.profilepic == null ? image : `${C_Config.host}${C_Config.port}/${viewUser.profilepic}`} alt="lucidex user" />

                                    </div>
                                </div>

                            </div>
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="col-md-12"><h5 className="card-title"> < b>Details </b></h5></div>
                                    <div className="col-md-5">
                                        <p><b>Name : </b> {viewUser.fname} &nbsp;  {viewUser.lname}</p>
                                    </div>

                                    <div className="col-md-7"> <p><b>Email : </b>   {viewUser.email}</p></div>

                                    <div className="col-md-12">
                                        <p><b>Created At  : </b> {viewUser.created_at} </p>

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <center>
                                    <button className="btn btn-danger btn-sm px-2 mr-2 mt-1">
                                        <FontAwesomeIcon icon={faBan} /> Block
                                      </button>
                                    <button className="btn btn-info btn-sm px-2 mr-2 mt-1">
                                        <FontAwesomeIcon icon={faEnvelope} /> Email
                               </button>
                                </center>
                            </div>
                        </div>

                    </Modal.Body>
                </Modal>
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
                    <button className="btn btn-success btn-sm px-2 mr-2 mt-1" onClick={() => this.showViewUser(item._id)}>
                        <FontAwesomeIcon icon={faEye}  /> View
                    </button>


                </td>
            </tr>
        );
    }
  



    
}


const options1 = {
    scaleShowGridLines: false,
    scaleGridLineColor: 'rgba(0,0,0,.05)',
    scaleGridLineWidth: 0,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve: true,
    bezierCurveTension: 0.4,
    pointDot: true,
    pointDotRadius: 4,
    pointDotStrokeWidth: 1,
    pointHitDetectionRadius: 20,
    datasetStroke: true,
    datasetStrokeWidth: 2,
    datasetFill: true,
    legend: {
        display: false
    },
    scales: {
        xAxes: [{
            gridLines: {
                display: false
            }
        }],
        yAxes: [{
            gridLines: {
                display: false
            }
        }]
    }
}
const options2 = {
    fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
    legend: {
        display: false
    },
    scales: {
        xAxes: [{
            gridLines: {
                display: false
            }
        }],
        yAxes: [{
            gridLines: {
                display: false
            }
        }]
    }
}
// dsdsdsd

export default AdminManagers;
