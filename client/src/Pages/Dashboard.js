import React, { Component } from 'react';

import GMap from '../Components/Map';

class Dashboard extends Component {
  state = {
    markerClicked: {
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
      </div>
    )
  }

}

export default Dashboard;