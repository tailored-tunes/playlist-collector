var assert = require("assert"),
    http = require('http');
var server = require('../web.js');
var port = process.env.PORT || 5000

describe('GET /', function(){
	it('should return 200', function(done) {
		http.get('http://localhost:'+port, function (res) {
			assert.equal(200, res.statusCode);
			done();
		});
	})
});

