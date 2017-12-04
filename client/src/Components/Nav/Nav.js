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
        <br/><br/><Toggle /><br/>
        <h5>slide toggle to become a tipster</h5>
        {
          window.location.pathname === "/profile" ||
          window.location.pathname === "/history"
            ?  <a id="search" className="menu-item" href="/search">
                <button className="btn btn-info">Search</button>
              </a>
            : ""
        }
        {
          window.location.pathname === "/search" ||
          window.location.pathname === "/history"
            ? <a id="profile" className="menu-item" href="/profile">
                <button className="btn btn-info">Profile</button>
              </a>
            : ""
        }
        {
          window.location.pathname === "/profile" ||
          window.location.pathname === "/search"
            ? <a id="history" className="menu-item" href="/history">
                <button className="btn btn-info">History</button>
              </a>
            : ""
        }
        <a onClick={this.showSettings} className="menu-item" href="/settings">
          <button className="btn btn-info">Settings</button>
        </a>
        <a id="logout" className="menu-item" href="/logout">
          <button className="btn btn-info">Log Out</button>
        </a>
      </Menu>
    );
  }
}

export default Nav;