import React, { Component } from 'react';
import GMap from '../Components/Map';
import Banner from '../Components/Banner';
import Nav from '../Components/Nav';

import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';

import './Search.css';

class RecSearch extends Component {
  state = {
    markerClicked: {
      address: "",
      id: "",
      name: "",
    },
    open: false,
    user: {
      username: "",
      image: ""
    }
  }

  componentDidMount() {

  } 

  onMarkerClick = (info) => {
    console.log(info);
    this.setState({
      markerClicked: {
        address: info.address,
        id: info.id,
        name: info.name
      }
    })
  }

  onOpenModal = () => {
    this.setState({ open: true });
  }
 
  onCloseModal = () => {
    this.setState({ open: false });
  }

  toggleModal = (bool) => {
    this.setState({
      page1: bool
    })
  }

  render() {
    console.log('test')
    return (
      <div>
        <Nav />
        <Banner user={this.state.user}/>
        <div className="container">
          <GMap onMarkerClick={this.onMarkerClick}/>
          { this.state.markerClicked.name !== ""
            ?
            <div className="row"><center><div onClick={this.onOpenModal} className="checkin">
              <p className="checkintext">Click here to check in at {this.state.markerClicked.name}</p>
              <p className="checkintext">{this.state.markerClicked.address}</p>
            </div></center></div>
            : ""
          }
          <Modal
            open={this.state.open}
            onClose={this.onCloseModal}
            classNames={{overlay: 'custom-overlay', modal: 'custom-modal-green'}}
            closeIconSize={0}>
            <center><img src="http://via.placeholder.com/150x150" className="img-circle checkinpic" alt="check in pic" />
            <div className="modalcheckin">
              <p className="modalcheckintext">{this.state.markerClicked.name}</p>
              <p className="modalcheckintext">{this.state.markerClicked.address}</p>
            </div>
              <button className="btn checkinbutton">Check in!</button></center>
          </Modal>
        </div>
      </div>
    )
  }

}

export default RecSearch;
