import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Nav.css';
import Toggle from '../Toggle';

class Nav extends React.Component {
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
        <Toggle />
        <h5>slide toggle to start receiving tips</h5></center>
        {
          window.location.pathname === "/profile" ||
          window.location.pathname === "/history"
            ? <center><a id="search" className="menu-item" href="/search">
                Search
              </a></center>
            : ""
        }<br/>
      </div>
        {
          window.location.pathname === "/search" ||
          window.location.pathname === "/history"
            ? <center><a id="profile" className="menu-item" href="/profile">
                ACCCOUNT
              </a></center>
            : ""
        }
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