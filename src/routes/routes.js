var routes = require('express').Router();
var publisher = require('../lib/aws.js');
var db = require('../lib/db.js');

var messageHandler = require('./handlers/message')(publisher, db);
var statusHandler = require('./handlers/status');

routes.post('/', messageHandler.create);
routes.get('/status', statusHandler.status);

module.exports = routes;
