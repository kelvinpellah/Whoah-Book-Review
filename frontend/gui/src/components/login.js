import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

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
     

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Welcome Back!</h2>
                    <input type="text" placeholder="Username" name="username" value={this.state.credentials.username} onChange={this.inputChange}/><br />
                    <div>
                        {this.state.usernameError}
                    </div>
                    <input type="password" placeholder="Password" name="password" value={this.state.credentials.password} onChange={this.inputChange}/><br />
                    <div>
                        {this.state.passwordError}
                    </div>
                    <button type="submit"  >Login</button><br />
                </form>
                <p>Don't have an account?<Link to="/register">Sign Up</Link></p>
            </div>
        );
    }
}

export default LoginForm;