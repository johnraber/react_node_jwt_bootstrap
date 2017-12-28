// barrel for all public api routes

module.exports = function(app) {

  // Authentication services
  app.use('/auth', require('../api/auth'));

  // Only have public api served up via routes
//  app.use('/api/categorical-data', require('../api/categorical-data'));

};
