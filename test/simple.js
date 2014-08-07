/* global process: true, describe: true, it: true */
var assert = require('assert'),
    http = require('http');

var port = process.env.PORT || 5000;

describe('GET /', function(){
	it('should return 200', function(done) {
		http.get('http://localhost:'+port, function (res) {
			assert.equal(200, res.statusCode);
			done();
		});
	});
});

