import React, { Comoponent } from 'react';
import { Elements } from 'react-stripe-elements';

import CardForm from './CardForm.js';
import SplitForm from './SplitForm.js';

class StripeCheckout extends Component {

  render() {
    return (
      <Elements>
        <CardForm/>

      </Elements>

    )
  }
}

export default StripeCheckout;
