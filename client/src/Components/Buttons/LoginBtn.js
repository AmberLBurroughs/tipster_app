import React from 'react';

const LoginBtn = (props) => {
  if (props.type === "login") {
    return (
      <button className="btn btn-success" onClick={props.onClick}>Login</button>
    )
  }
  else {
    return (
      <button className="btn btn-info" onClick={props.onClick}>Sign Up</button>
    )
  }
}


export default LoginBtn;