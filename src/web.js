var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var routes = require('./routes/routes.js');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(routes);

var port = Number(process.env.PORT || 5000);
app.listen(port);
