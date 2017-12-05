import React from 'react';
import './Banner.css';
import Nav from '../Banner';

const Banner = props =>
  <div className="banner">
    <br/><br/><p className="bannerwelcome">Welcome Tipster</p>
    <center><img className="logo" src="https://i.imgur.com/M1VQJnz.png" alt="logo" /></center><br/>
    <p className="bannerintro">SEARCH A LOCATION TO START TIPPING</p>
  </div>


export default Banner;