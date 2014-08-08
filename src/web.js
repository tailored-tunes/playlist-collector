/* global console: true, process: true */
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var messageHandler = require('./handlers/message');
app.post('/', messageHandler.create);

var port = Number(process.env.PORT || 5000);
app.listen(port);
console.log('Listening on ' + port);
