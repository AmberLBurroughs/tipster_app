import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Nav.css';
import Toggle from '../Toggle';

class Nav extends React.Component {
  constructor (props) {
    super(props);
    let cookieObj = {};
    let cookies = document.cookie.split("; ");
    for (let index in cookies) {
      let cookie = cookies[index].split("=");
      cookieObj[cookie[0]] = cookie[1];
    }
    this.state = cookieObj;
  }


  showSettings (event) {
    event.preventDefault();
  }

  render () {
    return (
      <Menu right bodyClassName="nav">
      <div className="nav-header">
        <center>
        <img src="/assets/images/tipster-logo.png" alt={"logo"}/>
        <h3>TIPSTER</h3>
        <Toggle
          cookies={this.state}
        />
          <h5>slide toggle to start receiving tips</h5></center>
      </div>
        {
          window.location.pathname === "/profile" ||
          window.location.pathname === "/history"
            ? <center><a id="search" className="menu-item" href="/search">
                Search
              </a></center>
            : ""
        }<br/>
        {
          window.location.pathname === "/search" ||
          window.location.pathname === "/history"
            ? <center><a id="profile" className="menu-item" href="/profile">
                ACCCOUNT
              </a></center>
            : ""
        }<br/>
        {
          window.location.pathname === "/profile" ||
          window.location.pathname === "/search"
            ? <center><a id="history" className="menu-item" href="/history">
                PAST TIPS
              </a></center>
            : ""
        }<br/>
        <center><a id="logout" className="menu-item" href="/logout">
          LOGOUT
        </a></center>
      </Menu>
    );
  }
}

export default Nav;