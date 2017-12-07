import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {StripeProvider} from 'react-stripe-elements';

import Login from './Pages/Login.js';
import Search from './Pages/Search.js';
import ProfilePage from './Pages/Profile.js';
import HistoryPage from './Pages/History.js';
import RecSearch from './Pages/RecSearch.js';
import RecHistoryPage from './Pages/RecHistory.js';

class App extends Component {
  render() {
     var isLoggedIn = document.cookie.length > 0;
    if(!isLoggedIn){
      return (
        <Router>
          <Switch>
            <Route path="*" component={Login} />
          </Switch>
        </Router>
      )
    }
    
    return (
      <StripeProvider apiKey="pk_test_4qto2Oywx4MSKq0x8G1VvjeC">
        <div className="">
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/profile" component={ProfilePage} />
              <Route exact path="/history" component={HistoryPage} />
              <Route exact path="/rec/search" component={RecSearch} />
              <Route exact path="/rec/History" component={RecHistoryPage} />
              <Route path="/" component={Login} />
            </Switch>
          </Router>
        </div>
      </StripeProvider>
    );
  }
}

export default App;