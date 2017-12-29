/**
 * Authentication service
 * Thoughts:  I'm still evaluating the correctness of using static methods (good for a service) and the
 *   the fact that they are mutating a private variable create in the constructor as the best design/use
 *   of the JS language.  It works, seems correct since no such thing as a static class level variable in JS yet.
 *
 *   I don't want the app to create a bunch of instances of Auth ( new Auth() ) to use the services so like the
 *   singleton service pattern.
 */
class Auth {

  constructor() {
    this.authenticated = false;

    // this.authenticate.bind(this);
    // this.signout.bind(this);
  }

  static isAuthenticated() {
    // return false;
    return (this.authenticated === true);
  }

  static authenticate(username, password, cb) {

    // TODO fetch via https after starting Node up running https with a cert from LetsEncrypt
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    };

    return fetch('/api/auth', requestOptions)
      .then(response => {
        if (!response.ok) {
          this.authenticated = false;
          return Promise.reject(response.statusText);
        }
        else {
          return response.json();
        }
      })
      .then(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // TODO store token in a secure cookie after setting up https in Node .... localStorage is less secure
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.authenticated = true;
        }

        return cb(user);
      });
  }

  static signout(cb) {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.authenticated = false;
    cb();
  }
}

export default Auth;
