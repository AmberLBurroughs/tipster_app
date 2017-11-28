import React, { Component } from 'react';
import LoginBtn from '../../Components/Buttons';

import Utils from '../../Utils/index.js';

class LoginForm extends Component {
  
  render() {
    return (
      <form>
        <LoginBtn type="login" />
        <LoginBtn type="create" />
      </form>
    )
  }
}

export default LoginForm;