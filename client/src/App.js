import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {StripeProvider} from 'react-stripe-elements';

import Login from './Pages/Login.js';
import Search from './Pages/Search.js';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/search">
              <StripeProvider apiKey="pk_test_4qto2Oywx4MSKq0x8G1VvjeC">
                <Search />
              </StripeProvider>
            </Route>
            <Route path="/" component={Login} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
