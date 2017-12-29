var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./config/environment');

// Used for token-based authentication for API calls
var expressJWT = require('express-jwt');


var app = express();

// protect thee endpoints
app.use('/:url(api|auth/logout)', expressJWT({ 'secret': config.jwt.secret }));

// view engine setup if doing react view rendering on server
// app.set('views', path.join(__dirname, '../dist'));
// app.set('view engine', 'jsx');
// app.engine('jsx', require('express-react-views').createEngine());

// NO need to serve up any views from this Node instance


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'client/dist')));

require('./routes')(app);

// All other routes should redirect the React's index.html
app.route('/*')
  .get(function(req, res) {
    res.sendFile((path.join(__dirname , '..', 'client/dist/index.html')) );
  });
module.exports = app;
