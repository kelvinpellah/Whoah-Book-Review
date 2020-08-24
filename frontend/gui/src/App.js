import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route, Switch} from "react-router-dom";
import LandingPage from "./components/landingpage";
import FeaturedBooks from './components/books';

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Router>
        <div className='App'>
          <Switch>
              <Route 
              exact 
              path="/home"
              render={props => (
                <LandingPage {...props}/>
              )}>
              </Route>
              <Route exact path="/books">
                  <FeaturedBooks />
              </Route>
          </Switch>
      </div>
      </Router>
    );
  }
}
export default App;
