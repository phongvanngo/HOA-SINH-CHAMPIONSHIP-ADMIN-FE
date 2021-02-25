import React, { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Switch, useLocation, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import { PublicRoutes } from './routes.const';

const Dashboard = lazy(() => import('./containers/Pages/Dashboard/Dashboard'));
const SignIn = lazy(() => import('./containers/Pages/SignIn/SignIn'));
const NotFound = lazy(() => import('./containers/Pages/NotFound/NotFound'));

function PrivateRoute({ children, ...rest }) {
    let location = useLocation();
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    if (isLoggedIn) return <Route {...rest}>{children}</Route>
    return (
        <Redirect
            to={{
                pathname: PublicRoutes.SIGN_IN,
                state: { from: location },
            }}
        />
    )
}

export default function AppRoutes() {
    return (
        <Suspense fallback={<div>Loading</div>}>
            <Router>
                <Switch>
                    <Redirect exact from="/" to={PublicRoutes.DASHBOARD} />
                    <PrivateRoute path={PublicRoutes.DASHBOARD}>
                        <Dashboard />
                    </PrivateRoute>
                    <Route path={PublicRoutes.SIGN_IN} component={SignIn} exact={true} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </Suspense>

    )
}