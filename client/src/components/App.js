/* eslint-disable import/no-named-as-default */
import React from 'react';

// https://github.com/facebook/prop-types#usage
//import PropTypes from 'prop-types';
import { Switch, NavLink, Route, Redirect } from 'react-router-dom';

import HomePage from './HomePage';
import Login from './Login';
import Dashboard from './Dashboard';
import Auth from '../services/Auth';


// use the spread fn to pass in remaining params to the PrivateRoute component
const PrivateRoute = ({component: Component, ...remainingProps}) => (
  <Route { ...remainingProps } render={(props) => (
    (Auth.isAuthenticated() === true)
      ? <Component {...props} />
      : <Redirect to={{
        pathname: "/login",
        state: { from: props.location }
      }} />
  )}/>
)


// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  render() {
    const activeStyle = { color: 'blue' };
    return (
      <div>
        <div>
          <NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink>
          {' | '}
          <NavLink to="/login" activeStyle={activeStyle}>Login</NavLink>
          {' | '}
          <NavLink to="/dashboard" activeStyle={activeStyle}>Dashboard</NavLink>
        </div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

// App.propTypes = {
//   children: PropTypes.element
// };

export default App;
