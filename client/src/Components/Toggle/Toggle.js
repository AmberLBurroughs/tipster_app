import React, { Component } from 'react';
import ToggleButton from 'react-toggle-button';
import './Toggle.css';

class Toggle extends Component {
  constructor (props) {
    super(props);
    this.state = {
      borderRadiusStyle: { borderRadius: 10 },
      value: false,
      cookies: this.props.cookies
    }
  }

  render() {
    return(
      <ToggleButton
        value={ this.state.value || false }
        inactiveLabel="off"
        activeLabel="on"
        className='nav-tog'
        thumbStyle={this.state.borderRadiusStyle}
        trackStyle={this.state.borderRadiusStyle}
        onToggle={(value) => {
          if (this.state.value === false) {
            if(this.state.cookies[`connect_id`] === "j%3Anull") {
              window.location.href = `https://connect.stripe.com/express/oauth/authorize?response_type=code&client_id=ca_BuZkGIRpYOb0ib9eQwxxYgkBC5kfXQ7b&scope=read_write&state=${this.state.cookies["user_id"]}`;
            }
          }
          this.setState({
            value: !value,
          })
        }}
      />
    )
  }
}

export default Toggle;