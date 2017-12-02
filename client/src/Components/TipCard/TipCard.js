import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { TipSubmit } from "../Buttons";

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

  submitTip = () => {
    this.resetState();
    console.log(`tip sent!`)
  }

  render() {
    return (
      <div className="col-xs-12">
        <img src={this.props.img} alt="default user image"/>
        <h3>{this.props.firstName}</h3>
        <h4>{this.props.handle}</h4>
        <h4>{`${this.props.title} @ ${this.props.state.markerClicked.name}`}</h4>
        <form>
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
          </div><br/>
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
          </div>
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                onClick={this.toggleAnon}
                />
                 I want to tip anonymously
            </label>
          </div>
          <TipSubmit submitTip={this.submitTip}/>
        </form>


      </div>
    )
  }
}

export default TipCard;