var nconf = require('nconf').argv()
	.env().file({file: 'config/developer.json'}),
	logger = require('winston');

logger.level = 'debug';

	var express = require('express'),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	routes = require('./routes/routes.js')(nconf, logger),
	app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());
app.use(routes);

logger.debug('Starting server');
var server = app.listen(Number(nconf.get('PORT') || 5000), function() {
	logger.info("Server started, listening on port: "+server.address().port);
});


