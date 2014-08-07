/* global process: true, describe: true, it: true */
var assert = require('assert'),
	http = require('http');

var port = process.env.PORT || 5000;


var correctMessage = {
	'source': 'deezer',
	'id': 'xyz',
	'userToken': 'abc123',
	'time': 1407248924
};

var assertStatus = function(message, status, done) {
	var httpOptions = {
		hostname: 'localhost',
		port: port,
		path: '/',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	};

	var req = http.request(httpOptions, function (res) {
		assert.equal(status, res.statusCode);
		done();
	});
	req.write(JSON.stringify(message));
	req.end();
};


describe('GET request', function(){
	it('should not be allowed', function(done){

		var req = http.request({
			hostname: 'localhost',
			port: port,
			path: '/',
			method: 'GET'
		}, function (res) {
			assert.equal(400, res.statusCode);
			done();
		});
		req.end();
	});
});

describe('POST correct data', function () {
	it('should return 200', function (done) {
		assertStatus(correctMessage, 200, done);
	});
});

describe('POST without source', function(){
	it('should return 400', function (done){
		var message = {
			'id': 'xyz',
			'userToken': 'abc123',
			'time': 1407248924
		};
		assertStatus(message, 400, done);
	});
});

describe('POST without id', function(){
	it('should return 400', function (done){
		var message = {
			'source': 'deezer',
			'userToken': 'abc123',
			'time': 1407248924
		};
		assertStatus(message, 400, done);
	});
});

describe('POST without token', function(){
	it('should return 400', function (done){
		var message = {
			'source': 'deezer',
			'id': 'xyz',
			'time': 1407248924
		};
		assertStatus(message, 400, done);
	});
});

describe('POST without time', function(){
	it('should return 400', function (done){
		var message = {
			'source': 'deezer',
			'id': 'xyz',
			'userToken': 'abc123'
		};

		assertStatus(message, 400, done);
	});
});
