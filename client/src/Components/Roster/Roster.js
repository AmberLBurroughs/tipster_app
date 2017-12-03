import React from 'react';

class Roster extends React.Component {

  render() {
    return(
      <div>
        <div id="roster" className="panel-body" key={this.props.location.name}>
          <h4>{this.props.location.name}</h4>
          <h4>{this.props.location.address}</h4>
        </div>
        <div>
          <div className="panel-body" key='name'>
            <a href="#">
              <h5><img src='pic' alt="pic"/> name</h5>
            </a>
          </div>
        </div>
      </div>
    )
  }

  componentDidUpdate() {
    document.getElementById("roster").scrollIntoView();
  }
}

export default Roster
