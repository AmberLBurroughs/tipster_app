import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia} from 'material-ui/';
import './RosterCard.css'
import Paper from 'material-ui/Paper';

class RosterCard extends Component {
  render() {
    return(
      <Paper className="papercard">
        <div className="card"><br/><br/>
          <center><img className="cardpic img-circle" src="http://via.placeholder.com/150x150" alt="cardpic" /></center><br/>
          <center><button className="cardbtn" onClick={this.props.buttonclick}><p className="btntext">TIP SAHIL</p></button></center>
        </div>
      </Paper>
    )
  }

  componentDidUpdate() {
    document.getElementById("roster").scrollIntoView();
  }
}

export default RosterCard;