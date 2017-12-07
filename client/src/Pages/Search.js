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
    connectUsers: [
    {
      first: "girl",
      username: "tipsterGirl",
      image: "/assets/images/tipster4.jpg"
    },
    {
      first: "guy",
      username: "tipsterGuy",
      image: "/assets/images/tipster1.jpg"
    },
    {
      first: "dude",
      username: "tipsterDude",
      image: "/assets/images/tipster2.jpg"
    },
    {
      first: "gal",
      username: "tipsterGal",
      image: "/assets/images/tipster3.jpg"
    }
    ],
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
      },

    })
    // fetch(`/api/location/${this.state.searchLocation.id}/users`, {
    //   method: 'GET',
    //   credentials: 'include',
    //   mode: 'cors'
    // })
    // .then(function(res){
    //   console.log("##########")
    //    const contentType = res.headers.get("content-type");
    //    if(contentType && contentType.includes("application/json")) {
    //     return res.json();
    //   }
    // })
    // .then(function(json){
    //   console.log("&&&&&&&\n", json);
    //   for (let index in json) {
    //     if (json[index].username.includes("sahil")) {
    //       that.setState({
    //         recipient: json[index].username
    //       })
    //     }
    //   }
    // })
    // .catch(function(res){
    //   if(res.error_code && res.error_code == 'invalid_login' ){
    //     document.cookie = ""; // clear cookie
    //     window.location.href = "/" // redirect to login
    //   }
    //   console.log("error", res);
    // })
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

export default Search;