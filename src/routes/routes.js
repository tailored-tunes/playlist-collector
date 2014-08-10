var routes = require('express').Router();
var publisher = require('../lib/aws.js');

var messageHandler = require('./handlers/message')(publisher);
var statusHandler = require('./handlers/status');

routes.post('/', messageHandler.create);
routes.get('/status', statusHandler.status);

module.exports = routes;
