import React, { Component } from 'react';

const LoginBtn = (props) => {
  if (props.type === "login") {
    return (
      <button className="btn btn-success">Login</button>
    )
  }
  else {
    return (
      <button className="btn btn-info">Create</button>
    )
  }
}
export default LoginBtn;