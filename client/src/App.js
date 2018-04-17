import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import Splash from './Splash'
import Success from './Success'

class App extends Component {
  render() {
    return (
      <div>
        <div className="logo"></div>
        <Switch>
          <Route path='/success' component={Success} />
          <Route path='/' component={Splash} {...this.props} />
        </Switch>
      </div>
    );
  }
}

export default App;