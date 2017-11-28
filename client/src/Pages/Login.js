import React, { Component } from 'react';
import LoginForm from '../Components/Form';
import GMap from "../Components/Map";

import Utils from '../Utils/index.js';

class Login extends Component {


  render() {
    return (
      <div className="container">
        <LoginForm/>
        <GMap/>
      </div>
    )
  }

}

export default Login;