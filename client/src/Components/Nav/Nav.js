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
        <center><Toggle /></center><br/>
        <center><h5>slide toggle to become a tipster</h5></center><br/>
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
                Profile
              </a></center>
            : ""
        }<br/>
        {
          window.location.pathname === "/profile" ||
          window.location.pathname === "/search"
            ? <center><a id="history" className="menu-item" href="/history">
                History
              </a></center>
            : ""
        }<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <center><a onClick={this.showSettings} className="menu-item" href="/settings">
          Settings
        </a></center><br/>
        <center><a id="logout" className="menu-item" href="/logout">
          Log Out
        </a></center>
      </Menu>
    );
  }
}

export default Nav;