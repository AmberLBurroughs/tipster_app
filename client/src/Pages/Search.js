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
      name: "",
    },
    open: false,
    user: {
      username: "",
      image: ""
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
      markerClicked: {
        address: info.address,
        id: info.id,
        name: info.name
      }
    })
    fetch("/api/location/users", {
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
      console.log("&&&&&&&\n", json);
      for (let index in json) {
        if (json[index].username.includes("sahil")) {
          that.setState({
            recipient: json[index].username
          })
        }
      }
    });
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
        <Banner user={this.state.user}/>
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
              title="JerseyClub DJ"
              state={this.state}/>
          </Modal>
        </div>
      </div>
    )
  }

}

export default Search;
