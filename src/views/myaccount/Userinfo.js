      /*  eslint-disable */

import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

import './UserInfo.css';
// import loading 
import Loading from '../../components/loading'
// import controller
import C_User from '../../controllers/User'
// import config 
import C_Config from '../../controllers/Config'
// import rect router
import { Link } from "react-router-dom";

import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import { connect } from 'react-redux';
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";


// import img from '../../asserts/Images/user.png'

import moment from 'moment'


import image from '../../asserts/Images/user.png'
registerPlugin(
  FilePondPluginImagePreview,

);

class Userinfo extends Component {
  constructor() {
    super();
    this.state = {
      showDeleteModal: false,
      editPassword: false,
      showEmailModal: false,
      fname: '',
      lname: '',
      beforFname: '',
      beforLname: '',
      editUserName: false,
      matchPassandConPass: true,
      uNewPass: '',
      uConNewsPass: '',
      uEmail: 'padulaguruge@gmail.com',
      showProfilepicModal: false,
      finalProflilePic: null,
      files: null,



      // user details
      fname: '',
      lname: '',
      email: '',
      lastlogin: '',
      profilepic: null,
      picsrc: '',
      createdAt: '',

      latlgonDate:'',
      browser : '',
    };



  }
  // ======================================================== 
  // =============== Functions        Start   =============== 
  // ======================================================== 


  async UNSAFE_componentWillMount() {
    await this.getUserDetails();
    await this. getLastLoginDetails();
  }

  async getLastLoginDetails(){


    var status = await  C_User.getUserLastLoginDetails()
    console.log(status);

   await    this.setState({
    latlgonDate : status. lastlogin,
    browser : status.browser
      })
    
  }

  // get user detaisl
  async getUserDetails() {
    const user = this.props.auth.user;
    var status = await C_User.getSpecificUser(user.email, user.token );

    switch (status.res) {
      case 200:

        await this.setState({
          fname: status.data.fname,
          lname: status.data.lname,
          email: status.data.email,
          picsrc: status.data.profilepic,
          createdAt: status.data.created_at,
          beforLname: status.data.lname,
          beforFname: status.data.fname
        })

        // await console.log(this.state.fname);
        // await console.log(this.state.lname);
        // await console.log(this.state.email);
        // await console.log(this.state.picsrc);
        // await console.log(this.state.createdAt);


        break;

      case 401:
        C_Config.showAlert("No user found in this email", "Warning");
        break;
        case 409:
          window.location.replace("/signin");
         break;
      default:
        C_Config.showAlert("Somthing went wrong, Try again");
        break;
    }
  }

  // -----------------Modal State Change ----------------- 
  // show delete modal 
  showDeleteModal() {
    this.setState({
      showDeleteModal: true
    })
  }




  // passowrd reset
  changeEmail() {
    this.setState({
      showEmailModal: true
    })
  }

  // ----------------edit fname and lname ----------------- 

  // fname
  onChangeFname(e) {
    this.setState({
      fname: e.target.value,
      editUserName: true,

    })
  }
  // lname
  onChangeLname(e) {
    this.setState({
      lname: e.target.value,
      editUserName: true,
    })
  }

  // cancle edit

  cancelUserName() {
    this.setState({
      fname: this.state.beforFname,
      lname: this.state.beforLname,
      editUserName: false,
    })
  }

  // saveuser name
  async saveUserName() {
    // console.log("New user name");
    // console.log(this.state.fname);
    // console.log(this.state.lname);

    var fname = this.state.fname
    var lname = this.state.lname


    if (this.state.fname === null || this.state.fname == undefined || this.state.fname === '' || this.state.lname === null || this.state.lname == undefined || this.state.lname === '') {

      C_Config.showAlert("Please fill user name", "Warning");

    } else {
      const user = this.props.auth.user;
      var status = await C_User.changeUsernameFunction(fname, lname , user.email , user.token );

      switch (status) {
        case 200:
          C_Config.showAlert("Successfully change", "Done");
          await this.getUserDetails()
          break;

        case 401:
          C_Config.showAlert("No user found in this email", "Warning");
          break;
        case 409:
           window.location.replace("/signin");
          break;

        default:
          C_Config.showAlert("Somthing went wrong, Try again");
          break;
      }
    }



  }


  // ---------------- password  ----------------- 
  // passowrd reset cancle
  cancelPassword() {
    this.setState({
      editPassword: false,
      uNewPass: '',
      uConNewsPass: '',


    })
  }

  // passowrd 

  onChangePassword(e) {
    this.setState({
      uNewPass: e.target.value
    })
  }
  // passowrd confirm

  onChangeConPass(e) {
    this.setState({
      uConNewsPass: e.target.value
    }, () => this.checkPasswordMatch())
  }

  // check password matchs


  checkPasswordMatch() {
    if (this.state.uNewPass != this.state.uConNewsPass) {
      this.setState({
        matchPassandConPass: false
      })
    } else {
      this.setState({
        matchPassandConPass: true
      })
    }


  }
  async savePassword() {
    if (this.state.uNewPass === null || this.state.uNewPass == undefined || this.state.uNewPass === '') {

      C_Config.showAlert("Please fill password", "Warning");

    } else {
      const user = this.props.auth.user;
      var reset = await C_User.resetPassoword(this.state.uNewPass, user.email, user.token, user.id)
      // console.log(reset);
      switch (reset) {
        case 200:
          await C_Config.showAlert("Sucessfully reset", "Done");
          await this.setState({
            editPassword: false,
            uNewPass: '',
            uConNewsPass: '',


          })
          await this.getUserDetails()
          break;

          case 409:
            window.location.replace("/signin");
           break;
        case 401:
          C_Config.showAlert("No user found in this email", "Warning");
          break;

        default:
          C_Config.showAlert("Somthing went wrong, Try again");
          break;
      }
    }




  }

  // =============== Profile Picture ===============

  showProfilePicModal() {
    this.setState({ showProfilepicModal: true });
  }

  // handleImage(fileItem) {
  //   // console.log(fileItem);
  //   this.setState({
  //     finalProflilePic: fileItem,
  //   });
  //   console.log(this.state.finalProflilePic);
  // }

  handleInit() {
    console.log('FilePond instance has initialised', this.pond);
  }

  async handleProfilePic(e) {

    e.preventDefault()
    // await console.log(this.state.files);


    if (this.state.files != null || this.state.files != undefined) {

      // await console.log(this.state.files[0]);

      var status = await C_User.uploadProfilePic(this.state.files[0]);
      // console.log(status);

      switch (status) {
        case 200:
          await this.setState({ showProfilepicModal: false });

          C_Config.showAlert("Profile Picture updated successfully", "Done");
          await this.getUserDetails()
          return 0;

        case 401:
          C_Config.showAlert("No user found in this email", "Warning");
          break;

        default:
          C_Config.showAlert("Somthing went wrong, Try again");
          break;
      }
    } else {
      C_Config.showAlert("Please select profile picture", "Warning");

    }



  }

  // ======================================================== 
  // =============== Functions        End   =============== 
  // ======================================================== 
  render() {
    return (
      <div className="ISS_acc_page">
        {/* <Loader show={this.state.loading} /> */}
        {/*========================================================*/}
        {/*=============== Profile Picture And name ===============*/}
        {/*========================================================*/}
        <div className="IS_UI_profilePic">
          {/* profilePic */}
          <div className="profilePicture">
            <img src={this.state.profilepic != undefined ? image : `${C_Config.host}${C_Config.port}/${this.state.picsrc}`} alt="lucidex user" />
            <button
              onClick={() => this.showProfilePicModal()}
              className="changeButton"
            >
              <i className="fas fa-camera"></i>
            </button>
          </div>
          {/* details */}
          <div className="userInfo">
            <h1>
              {this.state.beforFname} &nbsp;  {this.state.beforLname}
            </h1>
            <h2>Sri Lanka</h2>
          </div>
        </div>

        <h1 className="IS_UI_title">General Information</h1>

        {/*========================================================*/}
        {/*=============== First name and Last name ===============*/}
        {/*========================================================*/}
        <div className="IS_UI_section">
          <h1>User Name</h1>

          <div className="form row">
            <div className="group-input col-md-6">

              <input className="input_User_info" type="text" name="uFname" required placeholder="John" value={this.state.fname} onChange={(e) => this.onChangeFname(e)} />
            </div>
            <div className="group-input col-md-6">

              <input className="input_User_info" type="text" placeholder="Doe" name="uLname" value={this.state.lname} required onChange={(e) => this.onChangeLname(e)} />
            </div>
            <div
              className="group-input col-md-6"
              style={
                this.state.editUserName
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <button
                onClick={() => this.saveUserName()}
                className="bnt_User_infor_change_email mt-2 mr-3"
              >
                Save Changes
                  </button>
              <button
                onClick={() => this.cancelUserName()}
                className="bnt_User_infor_delte  mt-2 mr-1"
              >
                Cancel
                  </button>
            </div>
          </div>
        </div>

        {/*=====================================*/}
        {/*=============== Email ===============*/}
        {/*=====================================*/}
        <div className="IS_UI_section">
          <h1>Email Address</h1>

          <div className="form row">
            <div className="group-input col-md-12">
              <input className="input_User_info"
                name="email"
                type="email"
                pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,}$"
                placeholder="johndoe@gmail.com" name="uEmail" value={this.state.email} disabled />
              {/* <button
                onClick={() => this.changeEmail()}
                className="bnt_User_infor_change_email"
              >
                Change Email
              </button> */}
            </div>
          </div>
        </div>

        <h1 className="IS_UI_title">Security</h1>

        {/*========================================*/}
        {/*=============== Password ===============*/}
        {/*========================================*/}
        <div className="IS_UI_section">
          <h1>Password</h1>
          <p>Change the password you use to login to your account.</p>
          {this.state.editPassword ? (
            <div className="IS_UI_passwordContainer">

              <div className="row">
                <div className="col-md-12">
                  <label style={{ textAlign: 'left' }} >New Password  *</label> <br />
                  <input type="password" className="input_User_info" required name="uPass" onChange={(e) => this.onChangePassword(e)} />
                </div>
                <div className="col-md-12">
                  <label style={{ textAlign: 'left' }} >Confirm  Password  *</label> <br />
                  <input type="password" className="input_User_info" required name="uConPass" onChange={(e) => this.onChangeConPass(e)} />
                </div>
                <div className="col-md-12">
                  <p className="UI_passowrd_not_match" style={{ display: this.state.matchPassandConPass == false ? 'block' : 'none' }} >Password and Confirm Password didn't match !</p>
                </div>

                <div className="col-md-12">
                  <button onClick={() => this.savePassword()} className="bnt_User_infor_change_email mr-1 mt-2 ">  Save Changes </button>
                  <button onClick={() => this.cancelPassword()} className="bnt_User_infor_delte ml-1 mt-2" > Cancel</button>
                </div>
              </div>
            </div>
          ) : (
              <button
                onClick={() => this.setState({ editPassword: true })}
                className="bnt_User_infor_change_email"
              >
                Change password
              </button>
            )}
        </div>

        {/*========================================*/}
        {/*=============== Sessions ===============*/}
        {/*========================================*/}
        <div className="IS_UI_section">
          <h1>Last Login </h1>
          <p>
              {/* {this.state.lastlogin}  &nbsp;  •  &nbsp; 22 h : 55 m •  &nbsp; Chrome Web browser */}
              {this.state.latlgonDate}  &nbsp;  •    &nbsp; {this.state.browser}
              </p>

          {/* <div className="IS_UI_sessionContainer">{SessionList}</div> */}
        </div>
        <div className="IS_UI_section">
          <h1>Created At </h1>
          <p>
            {moment(this.state.createdAt).format('LT')}  • {moment(this.state.createdAt).format("MMM  DD , YYYY")}
          </p>

          {/* <div className="IS_UI_sessionContainer">{SessionList}</div> */}
        </div>

        {/*======================================*/}
        {/*=============== Delete ===============*/}
        {/*======================================*/}
        <div className="IS_UI_section">
          <h1 style={{ color: "#FF5555" }}>Delete Account</h1>
          <p>Delete your Fashion Store Account permanently.</p>
          <button
            onClick={() => this.showDeleteModal()}
            className="bnt_User_infor_delte"
          >
            Delete Account
              </button>
        </div>

        {/*====================================================================*/}
        {/*============================== Models ==============================*/}
        {/*====================================================================*/}

        {/*===============================================*/}
        {/*=============== Profile Picture ===============*/}
        {/*===============================================*/}
        <Modal
          size="lg"
          show={this.state.showProfilepicModal}
          centered
          onHide={() => this.setState({ showProfilepicModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Change Profile Picture</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <div className="IS_UI_ProfilepicModal">
                <p>Select a photo of you to set as your profile picture.</p>
                <center>
                  <FilePond
                    ref={ref => (this.pond = ref)}
                    files={this.state.files}
                    allowMultiple={false}
                    allowImageCrop={false}
                    // imageCropAspectRatio="1:1"
                    acceptedFileTypes={["image/*"]}
                    oninit={() => this.handleInit()}
                    onupdatefiles={fileItems => {
                      // Set currently active file objects to this.state
                      this.setState({
                        files: fileItems.map(fileItem => fileItem.file)
                      });
                    }}
                  ></FilePond>
                  <button className="bnt_User_infor_change_email"
                    onClick={(e) => this.handleProfilePic(e)}>
                    Set as Profile Picture
                      </button>
                </center>
              </div>
            </form>
          </Modal.Body>
        </Modal>



        {/*======================================*/}
        {/*=============== Delete ===============*/}
        {/*======================================*/}
        <Modal
          size="lg"
          show={this.state.showDeleteModal}
          centered
          onHide={() => this.setState({ showDeleteModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={event => this.handleDelete(event)} noValidate>
              <div className="IS_UI_DeleteModal">
                <p>
                  Hey {this.state.fname} {this.state.lname} , <br />
                  When you delete your Fashion Store Account, you won't be
                  able to retrieve the your account details. All the data associated to your
                  account will be removed. Are you sure you want to do this?
                    </p>
                <label>Password</label>
                <input type="password" name="uPass" />
                <br />
                <button className="bnt_User_infor_delte">Delete Account</button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth : state.auth || {} ,
});



export default connect(mapStateToProps)(Userinfo);