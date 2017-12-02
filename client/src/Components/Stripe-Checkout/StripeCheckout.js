import React, { Component } from 'react';

import CardForm from './CardForm.js';
import SplitForm from './SplitForm.js';

class StripeCheckout extends Component {

  render() {
    console.log(this.props.serverProps, this.props.formState);
    return (
      <div>
        <CardForm />
        <SplitForm />
      </div>

    )
  }
}

export default StripeCheckout;
