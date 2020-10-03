import React from "react";
import LoginForm from "./login";
import RegistrationForm from "./registration";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../images/logo.png";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(data) {
    this.props.appHandleLogin(data);
    this.props.history.push("/books");
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token) {
      const data = { token: token, username: username };
      this.props.appHandleLogin(data);
      return this.props.history.push("/books");
    }
  }

  render() {
    return (
      <div className="landing-page">
        <Navbar className="landing-nav">
          <Navbar.Brand href="#home">
            <img
              alt="Website Logo"
              src={Logo}
              width="250"
              height="118"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Form inline className="ml-auto">
            <LoginForm handleLogin={this.handleLogin} />
          </Form>
        </Navbar>
        <Card className="register_card">
          <Card.Body>
            <RegistrationForm handleLogin={this.handleLogin} />
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default LandingPage;
