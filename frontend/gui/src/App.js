import React from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/landingpage";
import FeaturedBooks from "./components/books";
import BookDetails from "./components/bookdetails";
import Footer from "./components/footer";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      username: "",
      isAuthenticated:false
    };
    this.appHandleLogin = this.appHandleLogin.bind(this);
  }

  appHandleLogin = (data) => {
    const token = data.token;
    const username = data.username;
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    this.setState({ token, username,isAuthenticated:true });
  }

  render() {
    return (
      <Router>
        <div className="page-container">
          <div className="Content-wrap">
            <Switch>
              <Route
                exact
                path={["/", "/home"]}
                render={(props) => (
                  <LandingPage
                    {...props}
                    appHandleLogin={this.appHandleLogin}
                  />
                )}
              ></Route>
              <Route
                exact
                path="/books"
                render={(props) => (
                  <FeaturedBooks
                    {...props}
                    token={this.state.token}
                    username={this.state.username}
                    removeToken={()=>{this.setState({token:'',username:''})}}
                    isAuthenticated={()=>{this.setState({isAuthenticated:false})}}
                  />
                )}
              ></Route>
              <Route
                exact
                path="/bookdetails/:name"
                render={(props) => (
                  this.state.isAuthenticated?
                  <BookDetails {...props} isAuthenticated={()=>{this.setState({isAuthenticated:false})}} username={this.state.username} removeToken={()=>{this.setState({token:'',username:''})}}/>
                  :<Redirect to='/' />
                  )}
              ></Route>
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}
export default App;
