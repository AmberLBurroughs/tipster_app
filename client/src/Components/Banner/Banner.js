import React from 'react';
import './Banner.css';
import Nav from '../Banner';

const Banner = props =>
  <div className="banner">
    <h3 className="bannerwelcome">Welcome Tipster!</h3>
    <center><img className="logo" src={props.user.image} alt="logo" /></center><br/>
    <h2 className="bannerintro">SEARCH A LOCATION TO START TIPPING</h2>
  </div>


export default Banner;