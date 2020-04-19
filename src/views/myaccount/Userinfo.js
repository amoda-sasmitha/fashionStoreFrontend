import React, { Component } from 'react';

import './UserInfo.css';
// import loading 
import Loading from '../../components/loading'
// import controller
import C_User from '../../controllers/User'
// import config 
import C_Config from '../../controllers/Config'
// import rect router
import { Link } from "react-router-dom";
//import navbar
import MainNavbar from '../../components/MainNavbar';
// import footer
import Footer from '../../components/Footer';


class Userinfo extends Component {
  constructor() {
    super();
    this.state = {

    };



  }



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
            <img src={this.state.profilePic} alt="" />
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
              John Doe
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

              <input className="input_User_info" type="text" name="uFname" required placeholder="John" value="John" />
            </div>
            <div className="group-input col-md-6">

              <input className="input_User_info" type="text" placeholder="Doe" name="uLname" value="Doe" required />
            </div>
            <div
              className="col-12"
              style={
                this.state.editUserName
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <button
                onClick={() => this.saveUserName()}
                className="IS_formSubmitBtn"
              >
                Save Changes
                  </button>
              <button
                onClick={() => this.cancelUserName()}
                className="IS_btn_text"
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
                placeholder="johndoe@gmail.com" name="uEmail" value="johndoe@gmail.com" disabled />
            </div>
            <div
              className="col-12"
              style={
                this.state.editEmail
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <button
                onClick={() => this.saveEmail()}
                className="IS_formSubmitBtn"
              >
                Verify &amp; Save
                  </button>
              <button
                onClick={() => this.cancelEmail()}
                className="IS_btn_text"
              >
                Cancel
                  </button>
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
                  <input type="password" required name="uPass" />
                </div>
                <div className="col-md-12">
                  <label style={{ textAlign: 'left' }} >New Password  *</label> <br />
                  <input type="password" required name="uPass" />
                </div>

                <div className="col-md-12"> 
                <button  onClick={() => this.savePassword()}     className="IS_formSubmitBtn"   >  Save Changes </button>
                <button onClick={() => this.cancelPassword()}  className="IS_btn_text" > Cancel</button>
                </div>
              </div>
            </div>
          ) : (
              <button
                onClick={() => this.setState({ editPassword: true })}
                className="IS_btn_disabled"
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
           2020 - 04 - 10  &nbsp;  |  &nbsp; 22 h : 55 m
              </p>

          {/* <div className="IS_UI_sessionContainer">{SessionList}</div> */}
        </div>

        {/*======================================*/}
        {/*=============== Delete ===============*/}
        {/*======================================*/}
        <div className="IS_UI_section">
          <h1 style={{ color: "#FF5555" }}>Delete Account</h1>
          <p>Delete your Industry Seeker Account permanently.</p>
          <button
            onClick={() => this.showDeleteModal()}
            className="IS_btn_disabled"
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
        {/* <Modal
              size="lg"
              show={this.state.showProfilepicModal}
              centered
              onHide={() => this.setState({ showProfilepicModal: false })}
            >
              <IS_ModalHeader title="Change Profile Picture" />
              <Modal.Body>
                <form>
                  <div className="IS_UI_ProfilepicModal">
                    <p>Select a photo of you to set as your profile picture.</p>
                    <center>
                      <FilePond
                        ref={ref => (this.pond = ref)}
                        files={this.state.files}
                        allowMultiple={false}
                        allowImageCrop={true}
                        imageCropAspectRatio="1:1"
                        acceptedFileTypes={["image/*"]}
                      ></FilePond>
                      <button className="IS_formSubmitBtn">
                        Set as Profile Picture
                      </button>
                    </center>
                  </div>
                </form>
              </Modal.Body>
            </Modal> */}

        {/*=====================================*/}
        {/*=============== Email ===============*/}
        {/*=====================================*/}
        {/* <Modal size="lg" show={this.state.showEmailModal} centered>
              <IS_ModalHeader title="Email Verification" />
              <Modal.Body>
                <form onSubmit={event => this.verifyEmail(event)} noValidate>
                  <div className="IS_UI_EmailModal">
                    <p>
                      Spend few minutes to verify the email address you entered.
                    </p>
                    <label>Verification Code</label>
                    <input type="text" name="code" />
                    <br />
                    <button className="IS_formSubmitBtn">Verify &amp; Save</button>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
     */}
        {/*======================================*/}
        {/*=============== Delete ===============*/}
        {/*======================================*/}
        {/* <Modal
              size="lg"
              show={this.state.showDeleteModal}
              centered
              onHide={() => this.setState({ showDeleteModal: false })}
            >
              <IS_ModalHeader title="Delete Your Account" />
              <Modal.Body>
                <form onSubmit={event => this.handleDelete(event)} noValidate>
                  <div className="IS_UI_DeleteModal">
                    <p>
                      When you delete your Industry Seeker Account, you won't be
                      able to retrieve the content. All the data associated to your
                      account will be removed. Are you sure you want to do this?
                    </p>
                    <label>Password</label>
                    <input type="password" name="pass" minLength={8} />
                    <br />
                    <button className="IS_formSubmitBtn">Delete Account</button>
                  </div>
                </form>
              </Modal.Body>
            </Modal> */}
      </div>
    );
  }
}


export default Userinfo;