import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './Pages/Login.js';
import Dashboard from './Pages/Dashboard.js';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route path="/" component={Login} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
