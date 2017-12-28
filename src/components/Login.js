import React from 'react';
import { Redirect } from 'react-router-dom';

import Auth from '../services/Auth';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = { redirectToReferrer: false };

    //this.login.bind(this);
  }

  login = () => {
    Auth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }));
    });
  }


  render() {

    // gotta love destructing assignment !
    const { redirectToReferrer } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    if(redirectToReferrer === true) {
      return (
        <Redirect to={ from } />
      );
    }
    else {
      return (
        <div>
          <input type="text"></input>
          <input type="password"></input>
          <button onClick={this.login}>Login</button>
        </div>
      );
    }
  }
}

export default Login;
