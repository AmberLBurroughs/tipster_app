import React, { Component } from 'react';

import "./style.css";

import CardForm from './CardForm.js';
import SplitForm from './SplitForm.js';

class StripeCheckout extends Component {

  render() {
    console.log(this.props.serverProps, this.props.formState);
    return (
      <div id="stripeForm">
        <CardForm tip={this.props.tip}/>
      </div>

    )
  }
}

export default StripeCheckout;
