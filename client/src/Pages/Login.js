import React, { Component } from 'react';
import LoginForm from '../Components/Form';

import Utils from '../Utils/index.js';

class Login extends Component {


  render() {
    return (
      <div className="container">
        <LoginForm/>
      </div>
    )
  }

}

export default Login;