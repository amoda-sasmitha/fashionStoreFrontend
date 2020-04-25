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




import img from '../../asserts/Images/user.png'

class Userinfo extends Component {
  constructor() {
    super();
    this.state = {
      showDeleteModal: false,
      editPassword: false,
      showEmailModal: false,
      fname: 'Padula',
      lname: 'Guruge',
      beforFname: 'Padula',
      beforLname: 'Guruge',
      editUserName: false,
      matchPassandConPass: true,
      uNewPass: '',
      uConNewsPass: '',
      uEmail: 'padulaguruge@gmail.com'


    };



  }
  // ======================================================== 
  // =============== Functions        Start   =============== 
  // ======================================================== 

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
  saveUserName() {
    console.log("New user name");
    console.log(this.state.fname);
    console.log(this.state.lname);

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
  savePassword() {
    var reset = C_User.resetPassoword(this.state.uEmail, this.state.uNewPass)
    console.log(reset);


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
            <img src={img} alt="" />
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
                placeholder="johndoe@gmail.com" name="uEmail" value={this.state.uEmail} disabled />
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
            2020 - 04 - 10  &nbsp;  |  &nbsp; 22 h : 55 m |  &nbsp; Chrome Web browser
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



        {/*======================================*/}
        {/*=============== Delete ===============*/}
        {/*======================================*/}
        <Modal
          size="lg"
          show={this.state.showDeleteModal}
          centered
          onHide={() => this.setState({ showDeleteModal: false })}
        >

          <Modal.Body>
            <form onSubmit={event => this.handleDelete(event)} noValidate>
              <div className="IS_UI_DeleteModal">
                <p>
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


export default Userinfo;