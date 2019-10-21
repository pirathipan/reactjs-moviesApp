import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <Router>
          <Route exact path="/:page?" component={Home} />
      </Router>
    );
  }
}

export default App;
