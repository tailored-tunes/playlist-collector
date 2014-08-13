/* global process: true, beforeEach: true, describe: true, it: true */
var assert = require('assert'),
	request = require('supertest');

var mockedMessages = require('./mockedData/messages');


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

describe('Metrics request', function () {
	it('should report 200', function (done) {
		this.req.get('/metrics').end(function (err, res) {
			if (err) {
				throw err;
			}
			assert.equal(res.status, 200);
			done();
		});
	});
});


describe('POST correct data', function () {
	it('should return 202', function (done) {
		assertStatus(this.req, mockedMessages.correctMessage, 202, done);
	});
});

describe('POST incorrect data', function () {
	it('should return 400 without source', function (done) {
		assertStatus(this.req, mockedMessages.missingSourceMessage, 400, done);
	});

	it('should return 400 without id', function (done) {
		assertStatus(this.req, mockedMessages.missingIdMessage, 400, done);
	});

	it('should return 400 without userToken', function (done) {
		assertStatus(this.req, mockedMessages.missingUserTokenMessage, 400, done);
	});

	it('should return 400 without time', function (done) {
		assertStatus(this.req, mockedMessages.missingTimeMessage, 400, done);
	});

	it('should return 400 without state', function (done) {
		assertStatus(this.req, mockedMessages.missingStateMessage, 400, done);
	});
});
