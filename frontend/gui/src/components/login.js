import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../mystyles.css';


// initial state

const initialState = {
    credentials: {username:"", password:""},
    usernameError:"",
    passwordError:""
}
class LoginForm extends React.Component {

    constructor(props){
        super(props);
        this.state = initialState;

        this.inputChange = this.inputChange.bind(this); //allows use of 'this' to a function.
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Handle input changes on specific input field

    inputChange(event){
        const cred = this.state.credentials;
        cred[event.target.name]=event.target.value;
        this.setState({credentials: cred});
        
    }

    // check accuracy of the form during submission

    validateForm = () => {
        let passwordError = "";
        let usernameError = "";
      
        // check username errors
        usernameError = `${!this.state.credentials.username ? "Username can't be empty." : ""}`;
        
        // check password errors
        passwordError = `${!this.state.credentials.password ? 'Password can\'t be empty.' : ""}`;

        // Return errors
        if(usernameError || passwordError) {
            this.setState({usernameError,passwordError});
            return false;
        }

        return true;
    }

    // send data to server

    sendData = async () => {

        var form = new FormData();

        form.append('username', this.state.credentials.username);
        form.append('password', this.state.credentials.password);

        try {
            let res = await axios({
                method:'post',
                url:'http://127.0.0.1:8000/api/login/',
                data: form,
                headers: {'Content-Type': 'multipart/form-data'}
            }).then(response => {
                this.props.handleLogin(response.data);
            })
            .catch(error => {
                console.log('Login Error,', error);
            })
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
            <Row>
                <Form inline onSubmit={this.handleSubmit}>
                    <Form.Group className="mr-2" controlId="Username">
                        <Form.Control className="login_inputs" type="input" name="username" value={this.state.credentials.username} onChange={this.inputChange} placeholder="Username" />
                    </Form.Group>
                    <Form.Group className="mr-2" controlId="Password">
                        <Form.Control className="login_inputs" type="password" name="password" value={this.state.credentials.password} onChange={this.inputChange} placeholder="Password" />
                    </Form.Group>
                    <Button className="login_button" type="submit">Sign in</Button>
                </Form>
            </Row>
            <Row>
                <Form inline>
                    <Form.Group className="mr-4 ml-2">
                        <Form.Label className="login_errors">{this.state.usernameError}</Form.Label> 
                    </Form.Group>
                    <Form.Group className="ml-3">
                        <Form.Label className="login_errors">{this.state.passwordError}</Form.Label> 
                    </Form.Group>
                </Form>
            </Row>
        </div>
        )
    }
}

export default LoginForm;