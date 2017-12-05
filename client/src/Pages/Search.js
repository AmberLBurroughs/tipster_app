import React, { Component } from 'react';
import TipCard from "../Components/TipCard"
import GMap from '../Components/Map';
import defaultImage from "../Images/default.png";
import Banner from '../Components/Banner';
import Nav from '../Components/Nav';
import Roster from '../Components/Roster';

import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';

import './Search.css';

class Search extends Component {
  state = {
    markerClicked: {
      address: "",
      id: "",
      name: ""
    },
    open: false
  }

  componentDidMount() {

  // if cookie valid
  // if invalid
    // check for document.cookie here. if user_sid is not set, redirect.
    // on AJAX request, validate cookie. set handler to delete cookie and redirect if
    // cookie is invalid

    console.log("testey");
    fetch("http://localhost:8000/api/search", {
      method: 'GET',
      credentials: 'include'  ,
      mode: 'cors'
    })
    .then(function(res){
      console.log(res);
    }).catch(function(res){
      // console.log("error")
      // if(error code ){
      //   // do stuff
      // }
      console.log(res);
      // document.cookie = ""; // clear cookie
      // window.location.href = "/" // redirect to login
    })
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

  render() {
    console.log('test')
    return (
      <div>
        <Nav />
        <Banner handle="@tofuguy"/>
        <div className="container">
          <GMap onMarkerClick={this.onMarkerClick}/>
          <Roster location={this.state.markerClicked} buttonclick={this.onOpenModal}/>
          <Modal
            open={this.state.open}
            onClose={this.onCloseModal}
            classNames={{overlay: 'custom-overlay', modal: 'custom-modal'}}
            closeIconSize={0}>
            <TipCard
              img={`https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png`}
              firstName="Sahil"
              handle="@dr_najeeb"
              title="JerseyClub DJ"
              state={this.state}/>
          </Modal>
        </div>
      </div>
    )
  }

}

export default Search;
