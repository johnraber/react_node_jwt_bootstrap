import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


import { userActions } from '../actions/user.actions';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
 //     redirectToReferrer: false,
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

  login() {

    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;

    if (username && password) {

      dispatch(userActions.login(username, password));
    }
  }


  render() {

    const { username, password, submitted } = this.state;

      return (
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" value={username}
                 onChange={this.handleChange} placeholder="Enter your username"></input>
          {submitted && !username &&
            <div className="help-block">Username is required</div>
          }
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password}
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

function mapStateToProps(state) {
  const { loggingIn } = (state) ? state.authentication : false;
  return {
    loggingIn
  };
}

const connectedLogin = connect(mapStateToProps)(Login);
export { connectedLogin as Login };
// export default Login;

