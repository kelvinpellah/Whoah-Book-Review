import React from 'react';
import {Link} from "react-router-dom";

// initial state

const initialState = {
    credentials: {
        username:"",
        password:"",    
        email:"",    
        confirmPassword:"",       
    },
    passwordError:"",    
    confirmPasswordError:"",    
    
}
class RegistrationForm extends React.Component {

    constructor(props){
        super(props);
        this.state = initialState;
        
        this.inputChange = this.inputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    // Change state to specific field in case of input changes
    
    inputChange(event){
        const cred = this.state.credentials;
        cred[event.target.name]=event.target.value;
        this.setState({credentials: cred});
        console.log(event.target.name);

        
    }

    // Checking correctness of the form on submission

    validateForm = () => {
        let passwordError = "";
        let confirmPasswordError ="";

        // checking password for errors.

        if (this.state.credentials.password.length < 6) {
            passwordError = "Password is too short. A minimum of six characters required.";
        }

        if (this.state.credentials.password !== this.state.credentials.confirmPassword) {
            confirmPasswordError = "Passwords don't match";
        }

        // Update state and Return the errors.
        if (passwordError || confirmPasswordError) {
            this.setState({passwordError, confirmPasswordError });
            return false;
        }

        return true;

    }
    
    // Form submission

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validateForm();
        if (isValid) {
            // Clear form after submission if correct
            this.setState(initialState);
        }
        
    }
     

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Welcome to Whoah!</h1>
                    <h2>Please create your account.</h2>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={this.state.credentials.username} onChange={this.inputChange}/><br />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={this.state.credentials.password} onChange={this.inputChange}/><br />
                    <div>
                        {this.state.passwordError}
                    </div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={this.state.credentials.confirmPassword} onChange={this.inputChange}/><br />
                    <div>
                        {this.state.confirmPasswordError}
                    </div>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" name="email" value={this.state.credentials.email} onChange={this.inputChange}/><br />
                    <button type="submit" >Sign Up</button><br />
                </form>
                <p>Already have an account?<Link to="/login">Sign in</Link></p>
            </div>
        );
    }
}

export default RegistrationForm;