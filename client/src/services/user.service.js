// import { authHeader } from '../utils/auth-header';

export const userService = {
  login,
  logout,
  register
  // getAll,
  // getById,
//  update
//  delete: remove
};

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  return fetch('/auth/authenticate', requestOptions)
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

function logout(cb) {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  cb();
}

// function getAll() {
//   const requestOptions = {
//     method: 'GET',
//     headers: authHeader()
//   };
//
//   return fetch('/users', requestOptions).then(handleResponse);
// }
//
// function getById(id) {
//   const requestOptions = {
//     method: 'GET',
//     headers: authHeader()
//   };
//
//   return fetch('/users/' + _id, requestOptions).then(handleResponse);
// }

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch('/auth/register', requestOptions).then(handleResponse);
}

// function update(user) {
//   const requestOptions = {
//     method: 'PUT',
//     headers: { ...authHeader(), 'Content-Type': 'application/json' },
//     body: JSON.stringify(user)
//   };
//
//   return fetch('/users/' + user.id, requestOptions).then(handleResponse);
// }

// function remove(id) {
//   const requestOptions = {
//     method: 'DELETE',
//     headers: authHeader()
//   };
//
//   return fetch('/users/' + id, requestOptions).then(handleResponse);;
// }

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}
