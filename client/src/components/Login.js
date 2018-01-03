import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


import { userActions } from '../actions/user.actions';

class Login extends React.Component {

  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(userActions.logout());

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

// These props will be updated anytime the store changes since using the connect(mapStateToProps)(<Componenet>)
// will subscribe and unsubscribe to state changes in the Components lifecycle methods:
//  componentWillMount() and componentWillUnmount()
const mapStateToProps = (state, ownProps) => {
  console.log('Own props (Login): ', ownProps);
  const { loggingIn } = (state) ? state.authentication : false;
  return {
    loggingIn
  };
};

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     onLoginClick: (username, password) => {
//       // dispatch an action
//       dispatch( userActions.login(username, password) );
//     }
//   };
// };

// NO need to pass in the mapDispatchToProps() if I just need the dispatch mapped to the Login components props since
//  this is the default behavior is null is passed in .... in addition, ONLY pass in a mapStateToProps() method if
// this component actually needs to listen to state changes
const connectedLogin = connect(
  mapStateToProps)(Login);
  // mapDispatchToProps)(Login);

export { connectedLogin as Login };

