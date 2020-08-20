import React from 'react';
import {Route, Switch} from "react-router-dom";
import LandingPage from "./components/landingpage";

const BaseRouter = () => (
    <div>
        <Switch>
            <Route exact path="/home">
                <LandingPage/>
            </Route>
        </Switch>
    </div>
);

export default BaseRouter;