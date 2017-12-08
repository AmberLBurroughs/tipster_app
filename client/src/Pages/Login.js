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
<<<<<<< HEAD
    			<h4>give and receive tips instantly from anywhere</h4>
||||||| merged common ancestors
    			<h4>some text about</h4>
    			<h4>tipping / being greateful.</h4>
=======
    			<h4>give and receive tips instantly, anywhere</h4>
>>>>>>> e21ec4fe0578dd69fd5876a95aa9d5b61ef32554
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