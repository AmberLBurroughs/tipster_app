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
      <Menu right bodyClassName={ window.location.pathname === "/profile" ||
                                  window.location.pathname === "/history" || 
                                  window.location.pathname === "/search"  ? 'nav' : 'nav-green'}>
        <center><Toggle /></center><br/>
        <center><h5>SLIDE TOGGLE TO BECOME A TIPSTER</h5></center><br/>
        {
          window.location.pathname === "/profile" ||
          window.location.pathname === "/history"
            ? <center><a id="search" className="menu-item" href="/search">
                Search
              </a></center>
            : ""
        }
        {
          window.location.pathname === "/search" ||
          window.location.pathname === "/history"
            ? <center><a id="profile" className="menu-item" href="/profile">
                Profile
              </a></center>
            : ""
        }
        {
          window.location.pathname === "/profile" ||
          window.location.pathname === "/search"
            ? <center><a id="history" className="menu-item" href="/history">
                Past Tips
              </a></center>
            : ""
        }<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <center><a id="logout" className="menu-item" href="/logout">
          Log Out
        </a></center>
      </Menu>
    );
  }
}

export default Nav;