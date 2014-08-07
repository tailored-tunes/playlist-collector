/* global console: true, process: true */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res){
	res.status(400).end();
});

app.post('/', function(req, res){

	var required = ['source', 'id', 'userToken', 'time'];
	required.map(function(att) {
		if(req.body[att]===undefined) {
			res.status(400).end();
		}
	});
	res.status(200).end();

});

var port = Number(process.env.PORT || 5000);
app.listen(port, function () {
	console.log('Listening on ' + port);
});
