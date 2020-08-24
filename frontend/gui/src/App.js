import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route, Switch} from "react-router-dom";
import LandingPage from "./components/landingpage";
import FeaturedBooks from './components/books';

function App() {
  return (
    <Router>
      <div className='app'>
        <Switch>
            <Route exact path="/home">
                <LandingPage/>
            </Route>
            <Route exact path="/books">
                <FeaturedBooks />
            </Route>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
