import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../mystyles.css';


// initial state

const initialState = {
    credentials: {username:"", password:""},
    usernameError:"",
    passwordError:"",
    message:"",
    loading:false
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
        this.setState({credentials: cred, message:""});
        
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
            this.setState({usernameError,passwordError,loading:false});
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
            let response = await axios({
                method:'post',
                url:'http://127.0.0.1:8000/api/login/',
                data: form,
                headers: {'Content-Type': 'multipart/form-data'}
            });
            this.props.handleLogin(response.data);
            // Clear form after successfully submission.
            this.setState(initialState);
        } catch (error) {
            const response_error = error.response
            if(response_error){
                const error_message = response_error.data.error_message;
                if (error_message){
                    this.setState({message:error_message,loading:false,usernameError:'',passwordError:''});
                }else{
                    this.setState({message:"Failed! Check URL or Internet connection.",loading:false});
                }
            }else{
                this.setState({message:'Failed!You must start server.',loading:false,usernameError:'',passwordError:''});
            }
        }


}

// Form submission

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validateForm();
        if (isValid) {
            this.setState({loading:true});
            //send data to REST API
            this.sendData();
        }
        
    }

    render () {
        const {usernameError,passwordError,message,loading} = this.state;
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
                        <Form.Label className="login_errors">
                            {usernameError}
                            {message}
                            <Spinner animation="border" variant="info" className={loading? 'spinner-show':'spinner-hide'}/>
                        </Form.Label> 
                        
                    </Form.Group>
                    <Form.Group className="ml-3">
                        <Form.Label className="login_errors">{passwordError}</Form.Label> 
                    </Form.Group>
                </Form>
            </Row>
        </div>
        )
    }
}

export default LoginForm;