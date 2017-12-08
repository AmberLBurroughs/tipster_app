import React, { Component } from 'react';

import Banner from '../Components/Banner';
import Nav from '../Components/Nav';
import History from '../Components/History';

class HistoryPage extends Component {
  state = {}

  constructor(props) {
    super(props);
    const that = this;
    fetch(`/api/user/history`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors'
    })
    .then(function(res){
      console.log("$$$$$$$$$$$")
       const contentType = res.headers.get("content-type");
       if(contentType && contentType.includes("application/json")) {
        return res.json();
      }
    })
    .then(function(json){
      console.log("&&&&&&&", json);
      // that.setState({
      //   currentUser:{
      //     username:json.username,
      //     image:json.image
      //   },
      //   tipHistory: []
      // });
    })
    .catch(function(res){
      if(res.error_code && res.error_code == 'invalid_login' ){
        document.cookie = ""; // clear cookie
        window.location.href = "/" // redirect to login
      }
      console.log("error", res);
    })
  }
  
  render() {
    return(
      <div>
        <Nav />
        <Banner handle="@tofuguy"/>
        <div>
          <History />
        </div>
      </div>
    )
  }
}

export default HistoryPage;