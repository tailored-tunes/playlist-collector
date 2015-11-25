module.exports = function (config, logger) {
	logger.debug("Setting up routes");

	var routes = require('express').Router(),
		backend = config.get('BACKEND') || 'aws',
		publisher = require('../lib/nsq.js')(config);

	if (backend === 'aws') {
		publisher = require('../lib/aws.js')(config);
	}

	var graphite = require('../lib/graphite')(require('http'), config.get('GRAPHITE_HOST'));
	var q = require('../lib/queue')(publisher);
	var db = require('../lib/db')();
	var metrics = require('../lib/metrics')(db);
	var clock = require('../lib/clock')(new Date().getTime());
	var messageHandler = require('./handlers/message')(q, metrics, graphite);
	var statusHandler = require('./handlers/status');
	var metricsHandler = require('./handlers/metrics')(db, clock, q);

	routes.post('/', messageHandler.create);
	routes.get('/status', statusHandler.status);
	routes.get('/metrics', metricsHandler.data);
	return routes;

};
