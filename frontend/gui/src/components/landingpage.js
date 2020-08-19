import React from 'react';
import LoginForm from './login';
import RegistrationForm from './registration';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../mystyles.css'; 
import Logo from '../images/logo.png';


class LandingPage extends React.Component {
    render() {
        return(
            <div>
                <Navbar className = 'color-nav' >
                <Navbar.Brand href="#home">
                    <img
                    alt="Website Logo"
                    src={Logo}
                    width="250"
                    height="118"
                    className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                    <Nav className="ml-auto">
                        <LoginForm />
                    </Nav>
                </Navbar>
                <Card className= 'register_card'>
                    <Card.Body>
                        <RegistrationForm />
                    </Card.Body>
                </Card>
                
                
            </div>
        )
    }
}


export default LandingPage;