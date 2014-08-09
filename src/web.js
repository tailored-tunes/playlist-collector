/* global console: true, process: true */
var express = require('express');
var bodyParser = require('body-parser');
var publisher = require('./lib/aws.js');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var messageHandler = require('./handlers/message')(publisher);
var statusHandler = require('./handlers/status');
app.post('/', messageHandler.create);
app.get('/status', statusHandler.status);

var port = Number(process.env.PORT);
app.listen(port);
console.log('Listening on ' + port);
