var app = require('../../app');
var request = require('supertest');



/**
 * @name Failed Authentication Attempt - Logged
 *
 * @description Test to confirm that invalid login credentials will return a 401
 */
describe('POST /auth/authenticate', function() {
	this.timeout(2250); /* a hair over 2 seconds (Slack tracking timeout is 2 seconds) */
	it('Should NOT be able to log in with TESTSUITE and bad password. Response should be 401', function(done) {
	request(app)
		.post('/auth/authenticate').send({ username: 'testsuite', password: 'badpassword' })
		.expect(401)
		.expect('Content-Type', /json/)
		.end(done);
	});
});



/**
 * @name Valid Authentication - Logged
 *
 * @description Test to confirm that valid login credentials will return a 200, token, and user data
 */
describe('POST /auth/authenticate', function() {
	this.timeout(2250); /* a hair over 2 seconds (tracking timeout is 2 seconds) */
	it('Should be abel to log in  with TESTSUITE and valid password. Response should be 200 with JWT and user data.', function(done) {
	request(app)
		.post('/auth/authenticate').send({ username: 'testsuite', password: 'goodpassword' })
		.expect(200)
		.expect('Content-Type', /json/)
		.expect(UserObjExists)
		.expect(JWTokenExists)
		.end(done);
	});
});





// Ensures a (jwt) token was returned in the response. Does not check validity of token.
function JWTokenExists(res) {
	if (!res.body.token) {
		throw new Error('Missing JWToken in response');
	}
}

// Ensures a user attribute is returned in response. Does not check validity of object.
function UserObjExists(res) {
	if (!res.body.user) {
		throw new Error('User object expected but not returned');
	}
}
