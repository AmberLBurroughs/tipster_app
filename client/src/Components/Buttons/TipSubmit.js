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
        <Button className="nextbutton"
          bsStyle="primary"
          onClick = {(e)=>this.onMarkerClick(e)}>
          Next
        </Button>
      )
    }
    else {
      return (
        <Button
          bsStyle="success"
          // onClick = {this.props.submitTip}
          onClick = {this.props.toggle(false)}>
          Confirm
        </Button>
      )
    }
  }
}

export default TipSubmit;