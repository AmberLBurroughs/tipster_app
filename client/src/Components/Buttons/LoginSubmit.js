import React from 'react';

const LoginSubmit = (props) => {
  console.log(`${props}`)
  if (props.type === "login") {
    return (
      <button className="btn btn-primary pull-right" onClick={props.onClick}>Login</button>
    )
  }
  else if (props.type === "create") {
    return (
      <button className="btn btn-primary pull-right" onClick={props.onClick}>Sign Up</button>
    )
  }
}

export default LoginSubmit