import React, { Component } from 'react';
import { LoginBtn, LoginSubmit } from '../../Components/Buttons';

import Utils from '../../Utils/index.js';

class LoginForm extends Component {
  state = {
    type : "",
    email : "",
    password : "",
    confirm : "",
    match : false
  }

  changeState = (newState) => {
    this.setState({
      type : newState
    })
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    if(this.state.password===this.state.confirm) {
      this.setState({
        match : true
      })
    }
    else {
      this.setState({
        match : false
      })
    }
  }

  goBack = () => {
    this.setState({
      type : ""
    })
  }

  passMatch = () => {
    if(this.state.match) {
      return (
        <i className="fa fa-check"></i>
      )
    }
  }


  render() {
    let button = null;
    if (this.state.type === "create") {
      button = (
        <div className="form-group">
          <label htmlFor="Confirm">Confirm Password {check}</label>
          <input
            type="password"
            className="form-control"
            id="Confirm"
            name="confirm"
            placeholder="Confirm Password"
            value={this.state.confirm}
            onChange = {this.handleInputChange}
          />
        </div>
      )
    }
    let check = null;
    if(this.state.match) {
      check = (
        <i className="fa fa-check"></i>
      )
    }
    if (this.state.type !== "") {
      return (
        <form>
          <div className="form-group">
            <label htmlFor="Email">Email address</label>
            <input 
              type="email"
              className="form-control"
              id="Email" name="email"
              placeholder="Email"
              value={this.state.email}
              onChange = {this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              className="form-control"
              id="Password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange = {this.handleInputChange}
            />
          </div>
          {button}
          <LoginSubmit type={this.state.type} onClick={() => {}}/>
          <button className="pull-right btn btn-danger" onClick={this.goBack}>
            Go Back
          </button>
        </form>
      )
    }
    else {
      return (
        <form>
          <LoginBtn type="login" onClick={() => this.changeState("login")}/>
          <LoginBtn type="create" onClick={() => this.changeState("create")} />
        </form>
      )
    }
  }
}

export default LoginForm;