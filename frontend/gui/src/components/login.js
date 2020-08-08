import React from 'react';
import {Link} from 'react-router-dom';


class LoginForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            credentials: {username:"", password:""}
        };

        this.InputChange = this.InputChange.bind(this); // binds the function to this class
    }

    // Handle input changes on specific input field

    InputChange(event){
        const cred = this.state.credentials;
        cred[event.target.name]=event.target.value;
        this.setState({credentials: cred});
        
    }
     

    render() {
        return (
            <div>
                <form>
                    <h2>Welcome Back!</h2>
                    <input type="text" placeholder="Username" name="username" value={this.state.credentials.username} onChange={this.InputChange}/><br />
                    <input type="password" placeholder="Password" name="password" value={this.state.credentials.password} onChange={this.InputChange}/><br />
                    <button type="submit"  >Login</button><br />
                </form>
                <p>Don't have an account?<Link to="/register">Sign Up</Link></p>
            </div>
        );
    }
}

export default LoginForm;