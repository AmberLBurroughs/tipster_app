import React from 'react';
import ImgUpload from '../ImgUpload';
import Modal from 'react-responsive-modal';

import './Profile.css';

class Profile extends React.Component {
  state ={
    open: false
  }

  onOpenModal = () => {
    this.setState({ open: true });
  }
 
  onCloseModal = () => {
    this.setState({ open: false, page1: true });
  }

  render() {
    return(
      <div className="container">
        <div class="panelprofile">
          <center>
            <img className="profilepic img-circle" src="http://via.placeholder.com/200x200" alt="profile pic"/>
          </center> 
            <div className="row profilepanel">
              <div className="col-xs-4"></div>
              <div className="col-xs-8">
                <div className="row profileelement profilehandle">handle: @tofuguy</div>
                <div className="row profileelement profileemail">email: tofuguy@tofu.tofu</div>
                <div onClick={this.onOpenModal} className="row profileelement profileupload">click to upload img</div>
                <Modal
                  open={this.state.open}
                  onClose={this.onCloseModal}
                  classNames={{overlay: 'custom-overlay', modal: 'custom-modal'}}
                  closeIconSize={0}>
                  <center><img src="http://via.placeholder.com/200x200" className="uploadmodalpic img-circle" /></center>
                  <ImgUpload />
                </Modal>
                <div className="row profileelement profileupdatecc">update cc</div>
              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Profile;