import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { Elements } from 'react-stripe-elements';

import { TipSubmit } from "../Buttons";
import StripeCheckout from "../Stripe-Checkout";

import helper from "../../Utils/helper.js";
import './TipCard.css';

const { tipHelper } = helper;


class TipCard extends Component {
  state = {
    anonymous: false,
    amount: "",
    note: ""
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "amount") {
      
      let amount = parseFloat(parseFloat(value).toFixed(2));

      this.setState({
        [name]: amount
      })
    }
    else {
      this.setState({
        [name]: value
      })
    }
  }

  clearAmount = (e) => {
    e.preventDefault();
    this.setState({
      amount: ""
    })
  }

  toggleAnon = () => {
    this.setState((prevState) => {
      return {anonymous: !prevState.anonymous} 
    })
  }

  resetState = () => {
    this.setState({
      anonymous: false,
      amount: "",
      note: ""
    })
  }

  submitTip = (token) => {
    // console.log({
    //   amount: this.state.amount,
    //   anonymous: this.state.anonymous,
    //   note: this.state.note
    // })
    let transaction = {
      location: this.props.state.markerClicked,
      recipient: this.props.state.recipient,
      amount: this.state.amount,
      anonymous: this.state.anonymous,
      note: this.state.note,
      token: token
    }
    console.log(transaction);
    tipHelper(transaction);
    this.resetState();
    console.log(`tip sent!`)
  }

  render() {
    return (
      <div className="col-xs-12 tipcard">
        <center><img className="tipcardpic img-circle" src={this.props.image} alt="default user image"/></center>
        <center>
        <form>
          {this.props.page1
            ? 
            <center><div>
              <h3>{this.props.first}</h3>
              <h4>@{this.props.location}</h4><br/><br/>

              <div className="form-inline">
                <div className="form-group">
                  <label className="sr-only" htmlFor="exampleInputAmount">Amount (in USD</label>
                  <div className="input-group">
                    <div className="input-group-addon">$</div>
                    <input
                      type="number"
                      className="form-control"
                      id="amount"
                      name="amount"
                      value={this.state.amount}
                      placeholder="Amount"
                      onChange={this.handleInputChange}/>
                  </div>
                </div>
                <button
                  className="btn clearbutton"
                  onClick={this.clearAmount}
                >Clear
                </button>
              </div><br/>

              <textarea name="note" rows="2" className="form-control note" id="note" required autocomplete="off"
              onChange={this.handleInputChange} value={this.state.note}></textarea>
              <label className="note" for="note"><span className="note">Note</span></label><br/>

              <div className="anoncheckbox">
                <label className="checkbox-inline">
                  <input
                    type="checkbox"
                    onClick={this.toggleAnon}
                    />
                    I want to tip anonymously
                </label>
              </div><br/>

              <TipSubmit submitTip={this.submitTip} toggleModal={this.props.toggleModal}/>
            </div></center>
            : ""
          }

          {!this.props.page1
            ? 
            <center><div><br/>

              <h4>Tipping {this.props.first} ${this.state.amount} {this.state.anonymous ?"anonymously" :""}</h4><br/><br/>

              <Elements>
                <StripeCheckout serverProps={this.props} formState={this.state} tip={this.submitTip} />
              </Elements>
            </div></center>
            : ""
          }
        </form>
        </center>
      </div>
    )
  }
}

export default TipCard;