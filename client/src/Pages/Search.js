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
    return (
      <div className="container">
        <Nav />
        <Banner handle="@tofuguy"/>
        <GMap onMarkerClick={this.onMarkerClick}/>
        <Roster location={this.state.markerClicked} />

        <TipCard
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
