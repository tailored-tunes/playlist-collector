var routes = require('express').Router();
var publisher = require('../lib/aws.js');
var q = require('../lib/queue')(publisher);
var db = require('../lib/db')();
var metrics = require('../lib/metrics')(db);
var clock = require('../lib/clock')(new Date().getTime());
var messageHandler = require('./handlers/message')(q, metrics);
var statusHandler = require('./handlers/status');
var metricsHandler = require('./handlers/metrics')(db, clock, q);

routes.post('/', messageHandler.create);
routes.get('/status', statusHandler.status);
routes.get('/metrics', metricsHandler.data);

module.exports = routes;
