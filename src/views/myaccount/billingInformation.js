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


class BillingInformation extends Component {
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
                  {this.state.firstName} {this.state.lastName}
                </h1>
                <h2>{this.state.address}</h2>
              </div>
            </div>
    
            <h1 className="IS_UI_title">BillingInformation</h1>
    
            {/*========================================================*/}
            {/*=============== First name and Last name ===============*/}
            {/*========================================================*/}
            <div className="IS_UI_section">
              <h1>User Name</h1>
    
              <div className="form row">
                <div className="col-sm-6">
                  <div className="IS_fromGroup">
                    <input
                      className="IS_forminput"
                      type="text"
                      placeholder="PsudoPlaceHolder"
                      value={this.state.firstName}
                      onChange={event => this.handleFirstName(event)}
                    />
                    <label className="IS_formLabel">First Name</label>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="IS_fromGroup">
                    <input
                      className="IS_forminput"
                      type="text"
                      value={this.state.lastName}
                      onChange={event => this.handleLastName(event)}
                      placeholder="PsudoPlaceHolder"
                    />
                    <label className="IS_formLabel">Last Name</label>
                  </div>
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
                <div className="col-12">
                  <div className="IS_fromGroup">
                    <input
                      className="IS_forminput"
                      type="email"
                      placeholder="PsudoPlaceHolder"
                      value={this.state.userEmail}
                      onChange={event => this.handleEmail(event)}
                    />
                    <label className="IS_formLabel">Email Address</label>
                  </div>
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
                  <div className="IS_fromGroup">
                    <input
                      className="IS_forminput"
                      type="password"
                      placeholder="PsudoPlaceHolder"
                      minLength={8}
                    />
                    <label className="IS_formLabel">New password</label>
                  </div>
                  <div className="IS_fromGroup">
                    <input
                      className="IS_forminput"
                      type="password"
                      placeholder="PsudoPlaceHolder"
                      minLength={8}
                    />
                    <label className="IS_formLabel">Confirm Password</label>
                  </div>
                  <div className="IS_fromGroup">
                    <input
                      className="IS_forminput"
                      type="password"
                      placeholder="PsudoPlaceHolder"
                      minLength={8}
                    />
                    <label className="IS_formLabel">Confirm Password</label>
                  </div>{" "}
                  <button
                    onClick={() => this.savePassword()}
                    className="IS_formSubmitBtn"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => this.cancelPassword()}
                    className="IS_btn_text"
                  >
                    Cancel
                  </button>
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
              <h1>Logged in Sessions</h1>
              <p>
                You’re currently signed in to your Industry Seeker Account on these
                devices.
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


export default BillingInformation;