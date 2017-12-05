import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class TipSubmit extends Component {
  state = {
    submit: true
  }

  onMarkerClick = (e) => {
    e.preventDefault();
    if (this.state.submit) {
      this.setState({
        submit: false
      })
    }
  }

  render() {
    if(this.state.submit) {
      return (
        <Button
          bsStyle="primary"
          onClick = {(e)=>this.onMarkerClick(e)}>
          Submit
        </Button>
      )
    }
    else {
      return (
        <Button
          bsStyle="success"
          onClick = {this.props.submitTip}>
          Confirm
        </Button>
      )
    }
  }
}

export default TipSubmit;