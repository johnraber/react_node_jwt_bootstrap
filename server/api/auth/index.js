'use strict';

var express = require('express');
var controller = require('./authentication.controller');
var router = express.Router();


// Authentication controller API calls:
router.post('/authenticate', controller.authenticate);
router.post('/logout', controller.logout);

module.exports = router;
