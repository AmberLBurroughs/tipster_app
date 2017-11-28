import React from 'react';

const LoginSubmit = (props) => {
  if (props.type === "login") {
    return (
      <button className="btn btn-primary pull-right" onClick={props.onClick}>Login</button>
    )
  }
  else {
    return (
      <button className="btn btn-primary pull-right" onClick={props.onClick}>Login</button>
    )
  }
}