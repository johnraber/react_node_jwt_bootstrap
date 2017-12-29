import React from 'react';
import { Redirect } from 'react-router-dom';

import Auth from '../services/Auth';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
      username: '',
      password: ''
    };

    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  login = () => {
    Auth.authenticate(this.state.username, this.state.password, () => {
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
          <input type="text" name="username" value={this.state.username}
                 onChange={this.handleChange} placeholder="Enter your username"></input>
          <input type="password" name="password" value={this.state.password}
                 onChange={this.handleChange} placeholder="Enter your password"></input>
          <button onClick={this.login}>Login</button>
        </div>
      );
    }
  }
}

export default Login;
