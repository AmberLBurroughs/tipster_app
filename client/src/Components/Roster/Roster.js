// @flow weak
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import './Roster.css';

import RosterCard from '../RosterCard';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function Roster(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div id="roster" className="panel-body" key={props.location.name}>
        <p className="locationname">{props.location.name}</p>
        <p className="locationaddress">{props.location.address}</p>
        <hr className="hr" />
      </div>
      <Grid container spacing={24}>
      {props.connectusers.map(function(element) {
        <Grid item xs={6} sm={3}>
          <RosterCard user={element} buttonclick={props.buttonclick}/>
        </Grid>
      })}
      </Grid>
    </div>
  );

  
}

Roster.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Roster);

// import React from 'react';

// class Roster extends React.Component {

//   render() {
//     return(
//       <div>
//         <div id="roster" className="panel-body" key={this.props.location.name}>
//           <h4>{this.props.location.name}</h4>
//           <h4>{this.props.location.address}</h4>
//         </div>
//         <div>
//           <div className="panel-body" key='name'>
//             <a href="#">
//               <h5><img src='pic' alt="pic"/> name</h5>
//             </a>
//           </div>
//         </div>
//       </div>
//     )
//   }

// }

// export default Roster
