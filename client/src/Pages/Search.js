Skip to content
Help save net neutrality! A free, open internet is once again at stake—and we need your help.
Learn more  Dismiss
This repository
Search
Pull requests
Issues
Marketplace
Explore
 @AmberLBurroughs
 Sign out
 Unwatch 2
  Star 1  Fork 0 AmberLBurroughs/tipster_app Private
 Code  Issues 0  Pull requests 0  Projects 0  Wiki  Insights  Settings
Branch: master Find file Copy pathtipster_app/client/src/Pages/Search.js
50217a9  3 hours ago
@FEEDKurumu FEEDKurumu Merge pull request #41 from AmberLBurroughs/derr2
3 contributors @AmberLBurroughs @FEEDKurumu @jwong1219
RawBlameHistory     
Executable File  168 lines (154 sloc)  4.06 KB
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
    user: {
      username: "",
      image: ""
    },
    connectusers: [{
      first: "first",
      username: "usernametest",
      image: "#"
    }],
    recipient: {
      username: "",
      image: "",
      first: ""
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
      that.setState({user:{username:json.username, image:json.image }});
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

  // if cookie valid
  // if invalid
    // check for document.cookie here. if user_sid is not set, redirect.
    // on AJAX request, validate cookie. set handler to delete cookie and redirect if
    // cookie is invalid
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
    fetch(`/api/location/${this.state.searchLocation.id}/users`, {
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
      console.log("&&&&&&&\n", json);
      for (let index in json) {
        if (json[index].username.includes("sahil")) {
          that.setState({
            recipient: json[index].username
          })
        }
      }
    });
    .catch(function(res){
      if(res.error_code && res.error_code == 'invalid_login' ){
        document.cookie = ""; // clear cookie
        window.location.href = "/" // redirect to login
      }
      console.log("error", res);
    })
  }
//also updates recipient
  onOpenModal = (name, image, first) => {
    this.setState({
      recipient: {
        username: name,
        image: image,
        first: first
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
        <Banner user={this.state.user}/>
        <div className="container">
          <GMap onMarkerClick={this.onMarkerClick}/>
          <Roster location={this.state.searchLocation} buttonclick={this.onOpenModal} connectusers={this.state.connectusers}/>
          <Modal
            open={this.state.open}
            onClose={this.onCloseModal}
            classNames={{overlay: 'custom-overlay', modal: 'custom-modal'}}
            closeIconSize={0}>
            <TipCard
              image={this.state.recipient.image}
              location={this.state.searchLocation.name}
              firstName={this.state.recipient.first}
              toggleModal={this.toggleModal}
              page1={this.state.page1}/>
          </Modal>
        </div>
      </div>
    )
  }

}