import React, { Component } from 'react';
import LoginForm from '../Components/Form';
import './login.css';
import Utils from '../Utils/index.js';

class Login extends Component {


  render() {
    return (
    	<div className="homeWrap">
    	<div id="hero">
    		<div className="content">
    			<img src="/assets/images/tipster-logo.png" alt={"logo"}/>
    			<h1>TIPSTER</h1>
    			<h4>give and receive tips instantly, anywhere</h4>
    		</div>
    	</div>
	      <div className="container" align="center">
	        <LoginForm/>
	      </div>
      </div>
    )
  }

}

export default Login;