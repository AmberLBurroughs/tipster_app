import React, { Component } from 'react';
import ToggleButton from 'react-toggle-button';
import './Toggle.css';

class Toggle extends Component {
  state = {
    borderRadiusStyle: { borderRadius: 10 },
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
          this.setState({
            value: !value,
          })
        }}
      />
    )
  }
}

export default Toggle;