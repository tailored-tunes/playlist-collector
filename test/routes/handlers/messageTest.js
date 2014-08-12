/* global describe: true, it: true, beforeEach: true */
var sinon = require('sinon');
var mockedMessages = require('../../mockedData/messages');
var message = mockedMessages.correctMessage;
var reqApi = {body: message};

beforeEach(function () {
	this.resApi = {status: function () {
	}, end: function () {
	}};
	this.mockQ = {push: function () {
	}};
	this.q = sinon.mock(this.mockQ);

	this.metricsApi = {
		total: function () {
		},
		success: function () {
		},
		fail: function () {
		},
		valid: function () {
		},
		invalid: function () {
		}
	};

});

describe('The message handler', function () {

	it('should return 400 without source', function (done) {
		var res = sinon.mock(this.resApi).expects('status').withArgs(400).returns(this.resApi);
		var messageHandler = require('../../../src/routes/handlers/message')(this.mockQ, this.metricsApi);
		var metrics = sinon.mock(this.metricsApi);
		metrics.expects('total').once();
		metrics.expects('invalid').once();
		messageHandler.create({body: mockedMessages.missingSourceMessage}, this.resApi);
		res.verify();
		metrics.verify();
		done();
	});

	it('should return 400 without id', function (done) {
		var res = sinon.mock(this.resApi).expects('status').withArgs(400).returns(this.resApi);
		var messageHandler = require('../../../src/routes/handlers/message')(this.mockQ, this.metricsApi);
		var metrics = sinon.mock(this.metricsApi);
		metrics.expects('total').once();
		metrics.expects('invalid').once();
		messageHandler.create({body: mockedMessages.missingIdMessage}, this.resApi);
		res.verify();
		metrics.verify();
		done();
	});

	it('should return 400 without userToken', function (done) {
		var res = sinon.mock(this.resApi).expects('status').withArgs(400).returns(this.resApi);
		var messageHandler = require('../../../src/routes/handlers/message')(this.mockQ, this.metricsApi);
		var metrics = sinon.mock(this.metricsApi);
		metrics.expects('total').once();
		metrics.expects('invalid').once();
		messageHandler.create({body: mockedMessages.missingUserTokenMessage}, this.resApi);
		res.verify();
		metrics.verify();
		done();
	});

	it('should return 400 without time', function (done) {
		var res = sinon.mock(this.resApi).expects('status').withArgs(400).returns(this.resApi);
		var messageHandler = require('../../../src/routes/handlers/message')(this.mockQ, this.metricsApi);
		var metrics = sinon.mock(this.metricsApi);
		metrics.expects('total').once();
		metrics.expects('invalid').once();
		messageHandler.create({body: mockedMessages.missingTimeMessage}, this.resApi);
		res.verify();
		metrics.verify();
		done();
	});


	it('should push messages to the queue', function (done) {
		this.q.expects('push').withExactArgs(message, sinon.match.func).callsArgWith(1, false);
		sinon.mock(this.resApi).expects('status').withArgs(sinon.match.number).returns(this.resApi);

		var messageHandler = require('../../../src/routes/handlers/message')(this.mockQ, this.metricsApi);

		var metrics = sinon.mock(this.metricsApi);
		metrics.expects('total').once();
		metrics.expects('valid').once();
		metrics.expects('success').once();

		messageHandler.create(reqApi, this.resApi);

		metrics.verify();
		this.q.verify();
		done();
	});


	it('should use the failure branch if publish failed', function (done) {
		this.q.expects('push').withExactArgs(message, sinon.match.func).callsArgWith(1, true);
		sinon.mock(this.resApi).expects('status').withArgs(sinon.match.number).returns(this.resApi);

		var messageHandler = require('../../../src/routes/handlers/message')(this.mockQ, this.metricsApi);
		var metrics = sinon.mock(this.metricsApi);
		metrics.expects('total').once();
		metrics.expects('valid').once();
		metrics.expects('fail').once();

		messageHandler.create(reqApi, this.resApi);

		metrics.verify();
		this.q.verify();
		done();
	});
});
