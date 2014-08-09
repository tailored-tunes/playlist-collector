/* global process: true, beforeEach: true, describe: true, it: true */
var assert = require('assert'),
	request = require('supertest');

var correctMessage = {
	'source': 'deezer',
	'id': 'xyz',
	'userToken': 'abc123',
	'time': 1407248924
};


beforeEach(function(done) {
	this.port = Number(process.env.PORT);
	this.req = request('http://localhost:'+this.port);
	done();
});


var assertStatus = function (req, message, status, done) {
	req.post('/')
		.set('Content-Type', 'application/json')
		.send(JSON.stringify(message))
		.end(function (err, res) {
			if (err) {
				throw err;
			}
			assert.equal(status, res.status);
			done();
		});
};


describe('GET request', function () {
	it('should not be allowed', function (done) {
		this.req.get('/').end(function (err, res) {
			if (err) {
				throw err;
			}
			assert.equal(res.status, 404);
			done();
		});
	});
});

describe('Status request', function () {
	it('should report 200', function (done) {
		this.req.get('/status').end(function (err, res) {
			if (err) {
				throw err;
			}
			assert.equal(res.status, 200);
			done();
		});
	});
});

describe('POST correct data', function () {
	it('should return 200', function (done) {
		assertStatus(this.req, correctMessage, 200, done);
	});
});

describe('POST incorrect data', function () {
	it('should return 400 without source', function (done) {
		var message = {
			'id': 'xyz',
			'userToken': 'abc123',
			'time': 1407248924
		};
		assertStatus(this.req, message, 400, done);
	});

	it('should return 400 without id', function (done) {
		var message = {
			'source': 'deezer',
			'userToken': 'abc123',
			'time': 1407248924
		};
		assertStatus(this.req, message, 400, done);
	});

	it('should return 400 without userToken', function (done) {
		var message = {
			'source': 'deezer',
			'id': 'xyz',
			'time': 1407248924
		};
		assertStatus(this.req, message, 400, done);
	});

	it('should return 400 without time', function (done) {
		var message = {
			'source': 'deezer',
			'id': 'xyz',
			'userToken': 'abc123'
		};

		assertStatus(this.req, message, 400, done);
	});
});

