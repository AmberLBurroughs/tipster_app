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
<<<<<<< HEAD
        <div className="card" data-username={this.props.user.username}><br/><br/>
          <center><img className="cardpic img-circle" src={this.props.user.image} alt="cardpic" /></center><br/>
          <center><button className="btnz btns" onClick={this.props.buttonclick}><p className="btntext">TIP {this.props.user.firstName}</p></button></center>
||||||| merged common ancestors
        <div className="card"><br/><br/>
          <center><img className="cardpic img-circle" src="http://via.placeholder.com/150x150" alt="cardpic" /></center>
          <center><button className="btns btnz" onClick={this.props.buttonclick}>TIP SAHIL</button></center>
=======
        <div className="card" data-name={this.props.user.username}><br/><br/>
          <center><img className="cardpic img-circle" src={this.props.user.image} alt="cardpic" /></center><br/>
          <center><button className="cardbtn" onClick={this.grabberhelper}>
          <p className="btntext">TIP {this.props.user.first}</p></button></center>
>>>>>>> 50217a9a94caae4919aeb57e01a3c4149f767248
        </div>
      </Paper>
    )
  }

  componentDidUpdate() {
    document.getElementById("roster").scrollIntoView();
  }
}

export default RosterCard;