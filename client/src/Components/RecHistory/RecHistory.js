import React from 'react';
import './RecHistory.css';

const RecHistory = props => {
  return(
    <div className="container historypanel">
      <center>
        <img className="historypic img-circle" src="http://via.placeholder.com/200x200" alt="history pic"/>
      </center>

      <div className="row historyheader">
        <div className="col-xs-1"></div>
        <div className="col-xs-2"><center>
          <p className="headertipsnum">2</p>
          <p className="headertips">Tips Received</p>
        </center></div>
        <div className="col-xs-6"></div>
        <div className="col-xs-2"><center>
          <p className="headeractivenum">$8</p>
          <p className="headeractive">total tips</p>
        </center></div>
      </div>
      
      <div className="hpanel">
        <div className="row">
          <div className="col-xs-3">
            <img className="hpanelpic img-circle" src="http://via.placeholder.com/50x50" alt="hpanel pic"/>
          </div>
          <div className="col-xs-7">
            <p className="hpaneltext hpanelrecname">Amber tipped $5</p>
            <p className="hpaneltext hpanelreclocation">Place Worked At</p>
          </div>
          <div className="col-xs-2"><center>
            <p className="hpaneltext hpanelstatus">Status</p>
             <p><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></p>
            <p className="hpaneltext hpanelanon"></p>
          </center></div>
        </div>
      </div>

      <div className="hpanel">
        <div className="row">
          <div className="col-xs-3">
            <img className="hpanelpic img-circle" src="http://via.placeholder.com/50x50" alt="hpanel pic"/>
          </div>
          <div className="col-xs-7">
            <p className="hpaneltext hpanelrecname">Anonymous tipped $3</p>
            <p className="hpaneltext hpanelreclocation">Place Worked At</p>
          </div>
          <div className="col-xs-2"><center>
            <p className="hpaneltext hpanelstatus">Status</p>
            <p><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></p>
            <p className="hpaneltext hpanelanon">Sent Anonymously</p>
          </center></div>
        </div>
      </div>
    </div>
  )
}

export default RecHistory;