import React, { Component } from 'react';
import from './Map.css'
import maphelper from './maphelper.js'

class Map extends Component {


  componentDidMount = (event) => {
    maphelper.initAutoComplete();
  }

  render() {
    return(
    <div>
      <input id="pac-input" class="controls" type="text" placeholder="Search Box" />
      <div id="map"></div>
    </div>
    )
  }
}

export default Maptest