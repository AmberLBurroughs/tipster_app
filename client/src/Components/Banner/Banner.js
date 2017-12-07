import React from 'react';
import './Banner.css';
import Nav from '../Banner';

const Banner = props =>
  <div className="banner">
    { window.location.pathname === "/search"
      ?
      <div>
       <h3 className="bannerwelcome">Welcome Tipster</h3>
       <center><img className="logo" src={props.currentUser.image} alt="logo" /></center>
       <h2 className="bannerintro">SEARCH A LOCATION TO START TIPPING</h2>
      </div>
      : ""
    }
    { window.location.pathname === "/profile"
      ?
      <div>
        <p className="bannernologo">Profile</p>
      </div>
      : ""
    }
    { window.location.pathname === "/history"
      ?
      <div>
        <p className="bannernologo">Past Tips</p>
      </div>
      : ""
    }
  </div>


export default Banner;