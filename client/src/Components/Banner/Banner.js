import React from 'react';
import './Banner.css';
import Nav from '../Banner';

const Banner = props =>
  <div className="banner">
    <br/><br/>
    { window.location.pathname === "/search"
      ?
      <div>
        <p className="bannerwelcome">Welcome Tipster</p>
        <center><img className="logo" src="https://i.imgur.com/M1VQJnz.png" alt="logo" /></center><br/>
        <p className="bannerintro">SEARCH A LOCATION TO START TIPPING</p>
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