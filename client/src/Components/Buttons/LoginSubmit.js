import React from 'react';

const LoginSubmit = (props) => {
  if (props.type === "login") {
    return (
      <button className="btn btns" onClick={props.onClick}>Login</button>
    )
  }
  else if (props.type === "signup") {
    return (
      <button className="btn btns" onClick={props.onClick}>Sign Up</button>
    )
  }
}

export default LoginSubmit