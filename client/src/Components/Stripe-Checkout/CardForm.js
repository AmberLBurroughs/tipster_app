import React, { Component } from 'react';
import ReactStripeElements, { CardElement, injectStripe } from 'react-stripe-elements';

// const {
//   CardElement,
//   CardNumberElement,
//   CardExpiryElement,
//   CardCVCElement,
//   PostalCodeElement,
//   PaymentRequestButtonElement,
//   StripeProvider,
//   Elements,
//   injectStripe,
// } = ReactStripeElements;

const handleBlur = () => {
  console.log('[blur]');
};
const handleChange = change => {
  this.props.cardchange()
  console.log('[change]', change);
};
const handleClick = () => {
  console.log('[click]');
};
const handleFocus = () => {
  console.log('[focus]');
};
const handleReady = () => {
  console.log('[ready]');
};

const createOptions = (fontSize) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, Menlo, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
};

class _CardForm extends Component {
  handleSubmit = ev => {
    ev.preventDefault();
    this.props.stripe.createToken()
    .then((payload) => {
      console.log(payload);
      console.log(`token id: ${payload.token}`);
      this.props.tip(payload.token);
    });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          <p className="tipcarddetails"> Card details</p>
          <input className="tipcardname" placeholder="Name"></input>
        <label>
          <CardElement
            onBlur={handleBlur}
            onChange={this.props.cardchange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <button>Tip</button>
      </form>
    );
  }
}
const CardForm = injectStripe(_CardForm);

export default CardForm;