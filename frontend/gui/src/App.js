import React from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import AppLayout from './containers/layout';

function App() {
  return (
    <Router>
      <div className="App">
          <AppLayout />
      </div>
    </Router>
  );
}

export default App;
