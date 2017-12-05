import React, { Component } from 'react';
import TipCard from "../Components/TipCard"
import GMap from '../Components/Map';
import defaultImage from "../Images/default.png";
import Banner from '../Components/Banner';
import Nav from '../Components/Nav';
import Roster from '../Components/Roster';


class Search extends Component {
  state = {
    markerClicked: {
      address: "",
      id: "",
      name: ""
    }
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

  render() {
    console.log('test')
    return (
      <div className="container">
        <Nav />
        <Banner handle="@tofuguy"/>
        <GMap onMarkerClick={this.onMarkerClick}/>
        <Roster location={this.state.markerClicked} />

        <TipCard
          id={"test.id"}
          img={`http://localhost:3000/assets/images/default.png`}
          firstName="Sahil"
          handle="@dr_najeeb"
          title="JerseyClub DJ"
          state={this.state}/>
      </div>
    )
  }

}

export default Search;
