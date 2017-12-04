import React, { Component } from 'react';
import LoginForm from '../Components/Form';
import './login.css';
import Utils from '../Utils/index.js';

class Login extends Component {


  render() {
    return (
    	<div>
    	<div id="hero">
    		<div className="content">
    			<img src="/assets/images/tipster-logo.png" alt={"logo"}/>
    			<h1>TIPSTER</h1>
    			<h4>some text about</h4>
    			<h4>tipping / being greateful.</h4>
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