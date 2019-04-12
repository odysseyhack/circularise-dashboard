import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import styles from './styles/app.module.scss';

class App extends Component {
  public render() {
    return (
      <div className={styles.app}>
        <Router>
          <Route path="/login" component={LoginPage} />
          <Route path="/" exact component={HomePage} />
        </Router>
      </div>
    );
  }
}

export default App;
