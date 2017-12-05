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
    note: "",
    page1: true
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
      location: this.props.state.markerClicked.id,
      receiver: this.props.id,
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

  toggleModal = (bool) => {
    this.setState({
      page1: bool
    })
  }

  render() {
    return (
      <div className="col-xs-12 tipcard">
        <center>
          <img className="tipcardpic" src={this.props.img} alt="default user image"/>
          <h3>{this.props.firstName}</h3>
          <h4>{`${this.props.title} @ ${this.props.state.markerClicked.name}`}</h4>
        </center><br/><br/><br/>

        <form>
          {this.state.page1
            ? 
            <center><div>
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
                  className="btn btn-danger"
                  onClick={this.clearAmount}
                >Clear
                </button>
              </div><br/><br/>

              <div className="form-group">
                <label htmlFor="note">Leave a note</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={this.state.note}
                  name="note"
                  id="note"
                  onChange={this.handleInputChange}>
                </textarea>
              </div><br/>
              <TipSubmit submitTip={this.submitTip} toggle={this.toggleModal}/>
            </div></center>
            : ""
          }

          {!this.state.page1
            ? 
            <center><div>
              <div className="checkbox">
                <label>
                  <input
                    type="checkbox"
                    onClick={this.toggleAnon}
                    />
                     I want to tip anonymously
                </label>
              </div>

              <Elements>
                <StripeCheckout serverProps={this.props} formState={this.state} tip={this.submitTip} />
              </Elements>
            </div></center>
            : ""
          }
        </form>
      </div>
    )
  }
}

export default TipCard;