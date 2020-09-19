import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route, Switch} from "react-router-dom";
import LandingPage from "./components/landingpage";
import FeaturedBooks from './components/books';
import BookDetails from './components/bookdetails';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token:''
    }
    this.appHandleLogin = this.appHandleLogin.bind(this);
  }

  appHandleLogin = (data) => {
    const token = data.token;
    this.setState({token});
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
                <LandingPage {...props} appHandleLogin = {this.appHandleLogin}/>
              )}>
              </Route>
              <Route exact path="/books">
                  <FeaturedBooks token = {this.state.token}/>
              </Route>
              <Route exact path="/bookdetails/:name">
                  <BookDetails />
              </Route>
          </Switch>
      </div>
      </Router>
    );
  }
}
export default App;
