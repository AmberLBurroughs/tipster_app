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
    searchLocation: {
      address: "",
      id: "",
      name: ""
    },
    open: false,
    page1: true,
    currentUser: {
      username: "",
      image: ""
    },
    connectUsers: [],
    recipient: {
      username: "",
      image: "",
      firstName: ""
    }
  }

  constructor(props){
    super(props);
    const that = this;
    fetch("/api/search", {
      method: 'GET',
      credentials: 'include',
      mode: 'cors'
    })
    .then(function(res){
      console.log("$$$$$$$$$$$")
       const contentType = res.headers.get("content-type");
       if(contentType && contentType.includes("application/json")) {
        return res.json();
      }
    })
    .then(function(json){
      console.log("&&&&&&&", json.username);
      that.setState({currentUser:{username:json.username, image:json.image }});
    })
    .catch(function(res){
      if(res.error_code && res.error_code == 'invalid_login' ){
        document.cookie = ""; // clear cookie
        window.location.href = "/" // redirect to login
      }
      console.log("error", res);
    })
  }

  componentDidMount() {
  } 

  onMarkerClick = (info) => {
    let that = this;
    console.log(info);
    this.setState({
      searchLocation: {
        address: info.address,
        id: info.id,
        name: info.name
      }
    })
   
    fetch(`/api/location/${info.id}/users`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors'
    })
    .then(function(res){
      console.log("##########")
       const contentType = res.headers.get("content-type");
       if(contentType && contentType.includes("application/json")) {
        return res.json();
      }
    })
    .then(function(json){
      console.log("&&&&&&&\n", json.Worker);
      that.setState({
        searchLocation: {
          address: info.address,
          id: info.id,
          name: info.name
        },
        connectUsers: json.Worker
      })
    })
    .catch(function(res){
      if(res.error_code && res.error_code == 'invalid_login' ){
        document.cookie = ""; // clear cookie
        window.location.href = "/" // redirect to login
      }
      console.log("error", res);
    })
  }
//also updates recipient
  onOpenModal = (name, image, firstName) => {
    this.setState({
      recipient: {
        username: name,
        image: image,
        first: firstName
      },
      open: true
    })
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
        <Banner currentUser={this.state.currentUser}/>
        <div className="container">
          <GMap onMarkerClick={this.onMarkerClick}/>
          <Roster location={this.state.searchLocation} buttonclick={this.onOpenModal} connectUsers={this.state.connectUsers}/>
          <Modal
            open={this.state.open}
            onClose={this.onCloseModal}
            classNames={{overlay: 'custom-overlay', modal: 'custom-modal'}}
            closeIconSize={0}>
            <TipCard
              image={this.state.recipient.image}
              location={this.state.searchLocation}
              firstName={this.state.recipient.firstName}
              username={this.state.recipient.username}
              toggleModal={this.toggleModal}
              page1={this.state.page1}/>
          </Modal>
        </div>
      </div>
    )
  }

}

export default Search;
