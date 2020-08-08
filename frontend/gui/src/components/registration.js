import React from 'react';
import {Link} from "react-router-dom";



class RegistrationForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            credentials: {
                username:"",
                password:"",
                email:"",
                confirm_password:"",
            }
        };
        this.InputChange = this.InputChange.bind(this);
    }
    
    // Change state to specific field in case of input changes
    
    InputChange(event){
        const cred = this.state.credentials;
        cred[event.target.name]=event.target.value;
        this.setState({credentials: cred});
        
    }
     

    render() {
        return (
            <div>
                <form>
                    <h1>Welcome to Whoah!</h1>
                    <h2>Please create your account.</h2>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={this.state.credentials.username} onChange={this.InputChange}/><br />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={this.state.credentials.password} onChange={this.InputChange}/><br />
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input type="password" id="confirm_password" name="confirm_password" value={this.state.credentials.confirm_password} onChange={this.InputChange}/><br />
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" name="email" value={this.state.credentials.email} onChange={this.InputChange}/><br />
                    <button type="submit">Sign Up</button><br />
                </form>
                <p>Already have an account?<Link to="/login">Sign in</Link></p>
            </div>
        );
    }
}

export default RegistrationForm;