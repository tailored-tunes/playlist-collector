var routes = require('express').Router();
var publisher = require('../lib/aws.js');
var q = require('../lib/queue')(publisher);
var messageHandler = require('./handlers/message')(q);
var statusHandler = require('./handlers/status');

routes.post('/', messageHandler.create);
routes.get('/status', statusHandler.status);

module.exports = routes;
