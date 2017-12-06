import React from 'react';
import './History.css';

const History = props => {
  return(
    <div className="container historypanel">
      <center>
        <img className="historypic img-circle" src="http://via.placeholder.com/200x200" alt="history pic"/>
      </center>

      <div className="row historyheader">
        <div className="col-xs-1"></div>
        <div className="col-xs-2"><center>
          <p className="headertipsnum">69</p>
          <p className="headertips">Tips Sent</p>
        </center></div>
        <div className="col-xs-6"></div>
        <div className="col-xs-2"><center>
          <p className="headeractivenum">6969</p>
          <p className="headeractive">Active Card</p>
        </center></div>
      </div>
      
      <div className="hpanel">
        <div className="row">
          <div className="col-xs-3">
            <img className="hpanelpic img-circle" src="http://via.placeholder.com/50x50" alt="hpanel pic"/>
          </div>
          <div className="col-xs-7">
            <p className="hpaneltext hpanelrecname">Amber</p>
            <p className="hpaneltext hpanelreclocation">Place Worked At</p>
          </div>
          <div className="col-xs-2"><center>
            <p className="hpaneltext hpanelstatus">Status</p>
            <p>check or x</p>
            <p className="hpaneltext hpanelanon">Sent Anonymously</p>
          </center></div>
        </div>
      </div>

      <div className="hpanel">
        <div className="row">
          <div className="col-xs-3">
            <img className="hpanelpic img-circle" src="http://via.placeholder.com/50x50" alt="hpanel pic"/>
          </div>
          <div className="col-xs-7">
            <p className="hpaneltext hpanelrecname">Justin</p>
            <p className="hpaneltext hpanelreclocation">Place Worked At</p>
          </div>
          <div className="col-xs-2"><center>
            <p className="hpaneltext hpanelstatus">Status</p>
            <p>check or x</p>
            <p className="hpaneltext hpanelanon">Sent Anonymously</p>
          </center></div>
        </div>
      </div>
    </div>
  )
}

export default History;