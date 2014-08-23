var express = require('express');
var bodyParser = require('body-parser');

var routes = require('./routes/routes.js');

var app = express();

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);

var port = Number(process.env.PORT || 5000);
app.listen(port);
