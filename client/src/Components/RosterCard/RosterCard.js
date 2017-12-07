import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia} from 'material-ui/';
import './RosterCard.css'
import Paper from 'material-ui/Paper';

class RosterCard extends Component {
  state = {

  }

  componentDidMount = () => {
    this.setState({
      username: {}
    })
  }

  grabberhelper = () => {
    this.props.buttonclick(this.props.user.username, this.props.user.image, this.props.user.first);
  }

  render() {
    return(
      <Paper className="papercard">
        <div className="card" data-name={this.props.user.username}><br/><br/>
          <center><img className="cardpic img-circle" src={this.props.user.image} alt="cardpic" /></center><br/>
          <center><button className="cardbtn" onClick={this.grabberhelper}>
          <p className="btntext">TIP {this.props.user.first}</p></button></center>
        </div>
      </Paper>
    )
  }

  componentDidUpdate() {
    document.getElementById("roster").scrollIntoView();
  }
}

export default RosterCard;