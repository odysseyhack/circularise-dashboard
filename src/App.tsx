import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LoginPage } from './pages/LoginPage';
import styles from './styles/app.module.scss';

class App extends Component {
  public render() {
    return (
      <div className={styles.app}>
        <Router>
          <Route path="/login" component={LoginPage} />
        </Router>
      </div>
    );
  }
}

export default App;
