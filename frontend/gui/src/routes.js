import React from 'react';
import {Route, Switch} from "react-router-dom";
import LoginForm from './components/login';
import RegistrationForm from './components/registration';
import LandingPage from "./components/landingpage";

const BaseRouter = () => (
    <div>
        <Switch>
            <Route exact path="/home">
                <LandingPage/>
            </Route>
            <Route exact path="/login">
                <LoginForm />
            </Route>
            <Route exact path="/register">
                <RegistrationForm />
            </Route>
        </Switch>
    </div>
);

export default BaseRouter;