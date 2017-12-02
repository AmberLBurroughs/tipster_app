import React, { Component } from 'react';
import TipCard from "../Components/TipCard"
import GMap from '../Components/Map';
import defaultImage from "../Images/default.png";

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
        <GMap onMarkerClick={this.onMarkerClick}/>
        
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

`${window.location.hostname}/assets/images/default.png`