import React from 'react';
import LoginForm from './login';
import RegistrationForm from './registration';
import AppFooter from './landingfooter';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../images/logo.png';


class LandingPage extends React.Component {
    constructor(props){
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(data) {
        this.props.history.push('/books');
    }

    render() {
        return(
            <div className="page-container">
                <div className="content-wrap">
                <Navbar className = 'landing-nav' >
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
                <Card className= 'register_card'>
                    <Card.Body>
                        <RegistrationForm handleLogin={this.handleLogin}/>
                    </Card.Body>
                </Card>
                </div>
                <div>
                    <AppFooter />
                </div>
            </div>
        )
    }
}


export default LandingPage;