// import { authHeader } from '../utils/auth-header';

// TODO need to read this in from config overridden by environment
const api_url = 'http://localhost:9000'

export const userService = {
  login,
  logout,
  register
};


function login(username, password) {
  const requestOptions = {
//    mode: 'no-cors',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  return fetch( `${api_url}/auth/authenticate`, requestOptions)
//  return fetch( '/auth/authenticate', requestOptions)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }

      return response.json();
    })
    .then(user => {
      // login successful if there's a jwt token in the response
      if (user && user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
      }

      return user;
    });
}

// TODO make this return a promise since logout could easily need to call server or some of async op
function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}


function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch('/auth/register', requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}
