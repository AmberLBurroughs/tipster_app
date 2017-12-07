import React from 'react';
import './Banner.css';
import Nav from '../Banner';

const Banner = props =>
  <div className={window.location.pathname === "/profile" ||
                  window.location.pathname === "/history" || 
                  window.location.pathname === "/search"  ? 'banner' : 'bannergreen'}>

    { window.location.pathname === "/search"
      ?
      <div>
       <h3 className="bannerwelcome">Welcome Tipster</h3>
       <center><img className="logo" src={props.currentUser.image} alt="default" /></center>
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
    { window.location.pathname === "/rec/search"
      ?
      <div>
        <p className="bannerwelcome">Welcome Tipster</p>
        <center><img className="logo" src={props.currentUser.image} alt="default" /></center><br/>
        <p className="bannerintro">SEARCH A LOCATION TO CHECK IN</p>
      </div>
      : ""
    }
  </div>

export default Banner;