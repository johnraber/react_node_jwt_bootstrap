import React from 'react';
import { Redirect, Link } from 'react-router-dom';
// import { connect } from 'react-redux';

import Auth from '../services/Auth';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
      username: '',
      password: '',
      submitted: false
    };

    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  login = () => {
    this.setState({ submitted: true });
    const { username, password } = this.state;
//    const { dispatch } = this.props;

    if (username && password) {
      // if (username && password) {
      //   dispatch(userActions.login(username, password));
      // }
      Auth.authenticate(username, password, () => {
        this.setState(() => ({
          redirectToReferrer: true
        }));
      });
    }
  }


  render() {

    // gotta love destructing assignment !
    const { redirectToReferrer } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    const { username, password, submitted } = this.state;

    if(redirectToReferrer === true) {
      return (
        <Redirect to={ from } />
      );
    }
    else {
      return (
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" value={this.state.username}
                 onChange={this.handleChange} placeholder="Enter your username"></input>
          {submitted && !username &&
            <div className="help-block">Username is required</div>
          }
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={this.state.password}
                 onChange={this.handleChange} placeholder="Enter your password"></input>
          {submitted && !password &&
            <div className="help-block">Password is required</div>
          }
          <button onClick={this.login}>Login</button>
          <Link to="/register" className="btn btn-link">Register</Link>
        </div>
      );
    }
  }
}

// function mapStateToProps(state) {
//   const { loggingIn } = state.authentication;
//   return {
//     loggingIn
//   };
// }
//
// const connectedLoginPage = connect(mapStateToProps)(LoginPage);
// export { connectedLoginPage as LoginPage };

export default Login;
