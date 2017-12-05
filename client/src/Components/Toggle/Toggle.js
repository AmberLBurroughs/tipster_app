import React, { Component } from 'react';
import ToggleButton from 'react-toggle-button';

class Toggle extends Component {
  state = {
    borderRadiusStyle: { borderRadius: 2 }
  }

  render() {
    return(
      <ToggleButton
        value={ this.state.value || false }
        inactiveLabel="Tipper"
        activeLabel="Tipster"
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