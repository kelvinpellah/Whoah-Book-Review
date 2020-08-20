import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../mystyles.css';

// initial state

const initialState = {
    credentials: {
        username:"",
        password:"",    
        email:"",    
        confirmPassword:"",       
    },
    usernameError:"",
    passwordError:"",    
    confirmPasswordError:"",
        
    
}
class RegistrationForm extends React.Component {

    constructor(props){
        super(props);
        this.state = initialState;
        
        this.inputChange = this.inputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendData = this.sendData.bind(this);
    }
    
    // Change state to specific field in case of input changes
    
    inputChange(event){
        const cred = this.state.credentials;
        cred[event.target.name]=event.target.value;
        this.setState({credentials: cred});
        console.log(cred);
    }

    // Checking correctness of the form on submission

    validateForm = () => {
        let passwordError = "";
        let confirmPasswordError ="";
        let usernameError = "";
        let passwordError1 = "";
        let passwordError2 = "";
       
        // check username errors
        usernameError = `${!this.state.credentials.username ? "Username can't be empty." : ""}`;
        
        // check password errors
        passwordError1 = `${!this.state.credentials.password ? 'Password can\'t be empty.' : ""}`;
        
        passwordError2 = `${this.state.credentials.password.length < 6 ? "Password is too short. A minimum of six characters required." : ""}`;
        
        passwordError = `${passwordError1? passwordError1 : passwordError2}`;

        confirmPasswordError = `${this.state.credentials.password !== this.state.credentials.confirmPassword ? "Passwords don't match" : ""}`;

        

        // Update state and Return the errors.
        if ( usernameError || passwordError || confirmPasswordError) {
            this.setState({usernameError, passwordError,confirmPasswordError });
            return false;
        }

        // return true if no errors.
        return true;

    }

    // send data to server

    sendData = async () => {

            var form = new FormData();

            form.append('username', this.state.credentials.username);
            form.append('password', this.state.credentials.password);
            form.append('confirmPassword', this.state.credentials.confirmPassword);
            form.append('email', this.state.credentials.email);
            try {
                let res = await axios({
                    method:'post',
                    url:'http://127.0.0.1:8000/api/register/',
                    data: form,
                    headers: {'Content-Type': 'multipart/form-data'}
                })
                console.log(res);
            } catch (error) {
                console.log(error)
            }


    }
    
    // Form submission

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validateForm();
        if (isValid) {
            
            //send data to REST API
            this.sendData();
            
            // Clear form after successfully submission.
            this.setState(initialState);
        }
        
    }

    render () {
        return (
        <div>
            <Container className="center aligned">
            <Form onSubmit={this.handleSubmit}>
                <h5>Welcome to Whoah!</h5>
                <h6>Please create your account.</h6>
                <Form.Group controlId="Username">
                    <Form.Control className="register_inputs" type="input" name="username" value={this.state.credentials.username} onChange={this.inputChange} placeholder="Username" />
                </Form.Group>
                <div className='register_errors'>
                    {this.state.usernameError}
                </div>
                <Form.Group controlId="Password">
                    <Form.Control className="register_inputs" type="password" name="password" value={this.state.credentials.password} onChange={this.inputChange} placeholder="Password" />
                </Form.Group>
                <div className='register_errors'>
                    {this.state.passwordError}
                </div>
                <Form.Group controlId="ConfirmPassword">
                    <Form.Control className="register_inputs" type="password" name="confirmPassword" value={this.state.credentials.confirmPassword} onChange={this.inputChange} placeholder="Confirm Password" />
                </Form.Group>
                <div className='register_errors'>
                    {this.state.confirmPasswordError}
                </div>
                <Form.Group controlId="Email">
                    <Form.Control className="register_inputs" type="email" name="email" value={this.state.credentials.email} onChange={this.inputChange} placeholder="Email Address" />
                </Form.Group>
                <Button className="register_button" type="submit">Sign Up</Button>
            </Form>
            </Container>
        </div>
        )
    }

}

export default RegistrationForm;