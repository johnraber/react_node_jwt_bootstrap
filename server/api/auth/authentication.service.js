/**
 * Authentication service handles login and logout for users.
 * Current authentication system is MVP and supports only a basic user system (no role support).
 */

//var config = require('../../config/environment');
// var sequelize = require('../../sqldb/db_connection_factory');
// var system_models = require('../../systemModels/system_models_factory').system_models;
// var User = system_models.user;


exports.find = function( username, password) {

  return Promise.resolve({username, password});
  // TODO remove hardcoded user store after database is setup ... always salt the passwords

	// return User.findOne({
	// 	where: {
	// 		username: username,
	// 		password: sequelize.fn('crypt', password, config.auth.salt)
	// 	}
	// });
};
