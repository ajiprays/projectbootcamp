import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Layout from '../layout/Layout';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('token')
            ?  <Component {...props} /> 
            : <Redirect to={{ pathname: '/forbidden', state: { from: props.location } }} />
    )} />
)

export const ErrorRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('token')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/forbidden', state: { from: props.location } }} />
    )} />
)

export const AdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        (localStorage.getItem('token') && JSON.parse(localStorage.getItem('user')).idTipeUser.tipe.includes('Admin'))
            ?  <Component {...props} /> 
            : <Redirect to={{ pathname: '/forbidden', state: { from: props.location } }} />
    )} />
)

export const SuperAdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        (localStorage.getItem('token') && JSON.parse(localStorage.getItem('user')).idTipeUser.tipe.includes('Super'))
            ?<Component {...props} /> 
            : <Redirect to={{ pathname: '/forbidden', state: { from: props.location } }} />
    )} />
)