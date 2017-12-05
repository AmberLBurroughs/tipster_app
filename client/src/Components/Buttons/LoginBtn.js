import React from 'react';

const LoginBtn = (props) => {
  if (props.type === "login") {
    return (
      <button className="btn btns" onClick={props.onClick}>Login</button>
    )
  }
  else {
    return (
      <button className="btn btns" onClick={props.onClick}>Sign Up</button>
    )
  }
}


export default LoginBtn;