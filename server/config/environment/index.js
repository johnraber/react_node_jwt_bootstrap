var path = require('path');
// var _ = require('lodash');

// var specific_env_config = require('./' + process.env.NODE_ENV + '.js');

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Should we populate the DB with data .. NO unless you are using only special dev env
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'jr-secret'
  },

  auth: {
    salt: '!32$[908CM)$(*@%RYZGcywt8[048ty'
  },

  // JWT / Token-based authentication
  jwt: {
    secret: '2015MUOS93kKx93#(WRdf!4032sdka93',
    timeout: '5 hours'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  logger: {
    // warn for now but info for development (after we review our code for what should be info vs debug) or debug (manually)
    // warn or higher for production depending on speed (how much I/O are we doing at this level) vs stability of product
    level: 'warn',
    name: 'WorkingBits',
    type: 'rotating-file',
    file: path.normalize(__dirname + '/../../../wb.log'),
    error_file: path.normalize(__dirname + '/../../../wb.error.log'),
    period: '1d',
    count: 2 // keep 2 back copies
  },

  track_user: false
};

module.exports = all;

// Export the config object based on the NODE_ENV
// ==============================================
// TODO jraber - test using vanilla object.assign()
// module.exports = _.merge(
//   all,
//   specific_env_config || {});
