import React, { Component } from 'react';
import { LoginBtn, LoginSubmit } from '../Buttons';
import './style.css';

import helper from '../../Utils/helper.js';

const { loginHelper, signUpHelper } = helper;

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
    switch (name) {
      case "password":
        if (value === this.state.confirm && value !== "") {
          this.setState({
            [name]: value,
            match : true
          });
        }
        else {
          this.setState({
            [name]: value,
            match : false
          });
        }
        break;
      case "confirm" :
        if (value === this.state.password && value !== "") {
          this.setState({
            [name]: value,
            match : true
          });
        }
        else {
          this.setState({
            [name]: value,
            match : false
          });
        }
        break;
      default:
        this.setState({
          [name]: value,
          match : false
        });
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

  login = (event) => {
    event.preventDefault();
    if (this.state.type === "login") {
      loginHelper(this.state);
    }
    else {
      signUpHelper(this.state);
    }
  } 

  render() {
    let check = null;
    if(this.state.match) {
      check = (
        <i className="fa fa-check"></i>
      )
    }
    else {
      check = (
        <i className="fa fa-times"></i>
      )
    }
    let action = null;
    if(this.state.type !== null) {
      action = `http://localhost:8000/${this.state.type}`;
    }

    let confirm = null;
    if (this.state.type === "signup") {
      confirm = (
        <div className="form-group">
          <label htmlFor="Confirm">Confirm Password {check}</label>
          <input
            type="password"
            className="form-control"
            id="Confirm"
            name="confirm"
            placeholder="confirm password"
            value={this.state.confirm}
            onChange = {this.handleInputChange}
          />
        </div>
      )
    }
    if (this.state.type !== "") {
      return (
        <form method="POST" action={action} className="clearfix">
          <div className="form-group">
            <label htmlFor="Email">Email address</label>
            <input 
              type="email"
              className="form-control"
              id="Email" name="email"
              placeholder="email"
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
              placeholder="password"
              value={this.state.password}
              onChange = {this.handleInputChange}
            />
          </div>
          {confirm}
          <button className="btn btns" onClick={this.goBack}>
            Go Back
          </button>
          <LoginSubmit type={this.state.type} />
        </form>
      )
    }
    else {
      return (
        <form className="home-btn-wrap">
          <LoginBtn type="login" onClick={() => this.changeState("login")}/>
          <LoginBtn type="signup" onClick={() => this.changeState("signup")} />
        </form>
      )
    }
  }
}

export default LoginForm;