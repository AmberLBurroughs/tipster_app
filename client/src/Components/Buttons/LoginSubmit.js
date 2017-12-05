import React from 'react';

const LoginSubmit = (props) => {
  if (props.type === "login") {
    return (
      <button className="btn btn-primary pull-right" onClick={props.clicky}>Login</button>
    )
  }
  else {
    return (
      <button className="btn btn-primary pull-right" onClick={props.clicky}>Login</button>
    )
  }
}

export default LoginSubmit