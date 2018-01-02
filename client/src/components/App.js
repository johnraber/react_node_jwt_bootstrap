/* eslint-disable import/no-named-as-default */
import React from 'react';

// https://github.com/facebook/prop-types#usage
//import PropTypes from 'prop-types';

import { Route } from 'react-router-dom';
import { connect } from 'react-redux';


import HomePage from './HomePage';
import { Login } from './Login';
import { Register } from '../containers/Register';
import { PrivateRoute } from './PrivateRoute';
//import {alertActions} from "../actions";
//import { history } from '../store/configureStore';



// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {

  constructor(props) {
    super(props);

    // const { dispatch } = this.props;
    //
    // history.listen( () => {
    //   // clear alert on location change
    //   dispatch(alertActions.clear() );
    // });
  }


  render() {
    return (
      <div>
        <Route path="/" component={HomePage} />
          <PrivateRoute exact path="/aa" component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
      </div>
    );
  }
}

// App.propTypes = {
//   children: PropTypes.element
// };

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };

