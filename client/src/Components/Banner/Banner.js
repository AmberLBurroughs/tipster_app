import React from 'react';
import ReactDom from 'react-dom';

const Banner = props =>
  <div className="container">
    <div className="row">
      <div className="col-sm-1" />
      <div className="col-sm-2">
        <img src="http://images.clipartpanda.com/thank-you-smiley-animated-smiley_animation_1_by_pocky_and_pandas-d4m9x5g.jpg" alt="pic" />
        <h3 className="text-center">{props.handle}</h3>
      </div>
      <div className="col-sm-2" />
      <div className="col-sm-7"><br/><br/><br/>
        <h1>logo</h1>
      </div>
    </div>
  </div>


export default Banner;