/**
 * Authentication controller handles login and logout for users.
 * Current authentication system is MVP and supports only a basic user system (no role support).
 */

var AuthService = require('./authentication.service');
var config = require('../../config/environment');
// var log = require('../../utilities/logger');
var jwt = require('jsonwebtoken');




/**
 * Authenticate a user.
 */
exports.authenticate = function(req, res) {

  console.log('authenticate req.body.username: ', req.body.username, ' req.body.password: ', req.body.password);
	// Ensure we have the necessary parameters
	if (req.body.username == undefined || req.body.password == undefined) {
		return res.status(401).send({
			error: 'Missing parameter(s)'
		});
	}

	AuthService.find(req.body.username, req.body.password)
	.then(function(user) { /* Expecting Sequelize User model passed back */
		// NOTE: This just means that the query executed successfully --not that the user was authenticated. Check to
		// make sure the user object is valid before responding.
		if (user == null) {
			return returnAuthFailure(req, res);
		}

		// User data to be returned (signed within the token).
		var profile = {
			username: user.username,
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email
		};

		// Track the login and return a JWT (json web token).
		var token = jwt.sign(profile, config.jwt.secret, { expiresIn: config.jwt.timeout });
			return res.json({ 'token': token, 'user': user });

	}).catch( function(err) {
		// Return a 401 if we couldn't authenticate.
		return returnAuthFailure(req, res);
	});
};


/**
 * @description Returns an "authentication failed" response (401).
 * @param request - request object
 * @param response - response object
 */
function returnAuthFailure(request, response) {
  return response.status(401).send({
    error: 'Invalid credentials'
  });
}




/**
 * Logs a user out & clears their session.
 * @return JSON {'response':true}
 */
exports.logout = function(req, res) {

	var username = (req.user) ? req.user.username : 'anonymous';

 //	delete $cookies.token;
	res.json({ authenticated: false });
};
