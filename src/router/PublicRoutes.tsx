import React from "react";
import {Route, Switch } from "react-router-dom";
import "../scss/style.scss";

// Pages
const Login = React.lazy(() => import("../views/pages/Login"));
const Register = React.lazy(() => import("../views/pages/Register"));

    function PublicRoutes() {
        return (
            <Switch>
                <Route
                    exact
                    path="/login"
                    render={(props: any) => <Login {...props} />}
                />
                <Route
                    exact
                    path="/register"
                    render={(props: any) => <Register {...props} />}
                />
                <Route
                    path="/"
                    render={(props: any) => <Login {...props} />}
                />
                </Switch>
        )
    }

    export default PublicRoutes
