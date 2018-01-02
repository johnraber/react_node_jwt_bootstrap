import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// use the spread fn to pass in remaining params to the PrivateRoute component
export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('user')
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
)

