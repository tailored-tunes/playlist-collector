/* global describe: true, it: true, beforeEach: true */
var sinon = require('sinon');

beforeEach(function () {
	this.resApi = {status: function () {
	}, end: function () {
	}};
    this.mockGraphite = {send: function(){}};
	this.mockQ = {push: function () {
	}};
	this.q = sinon.mock(this.mockQ);
	this.graphite = sinon.mock(this.mockGraphite);

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
	beforeEach(function(){
		this.mockedMessages = require('../../mockedData/messages');
		this.message = this.mockedMessages.correctMessage;
		this.reqApi = {body: this.message};

	});

	it('should return 400 for invalid source', function(done){
		var data = JSON.parse(JSON.stringify(this.mockedMessages.correctMessage));
		data.source = 0;
		var res = sinon.mock(this.resApi).expects('status').withArgs(400).returns(this.resApi);
		var messageHandler = require('../../../src/routes/handlers/message')(this.mockQ, this.metricsApi, this.mockGraphite);
		var metrics = sinon.mock(this.metricsApi);
		var graphite = sinon.mock(this.mockGraphite);
        graphite.expects('send').withArgs('queue metrics','collector,queue,operation').onCall(0);
        graphite.expects('send').withArgs('queue metrics','collector,queue,operation,fail').onCall(1);
		metrics.expects('total').once();
		metrics.expects('invalid').once();
		messageHandler.create({body: data}, this.resApi);
		res.verify();
		metrics.verify();
		done();
	});

	it('should return 400 for invalid id', function(done){
		var data = JSON.parse(JSON.stringify(this.mockedMessages.correctMessage));
		data.id = 0;
		var res = sinon.mock(this.resApi).expects('status').withArgs(400).returns(this.resApi);
		var messageHandler = require('../../../src/routes/handlers/message')(this.mockQ, this.metricsApi, this.mockGraphite);
		var metrics = sinon.mock(this.metricsApi);
        var graphite = sinon.mock(this.mockGraphite);
        graphite.expects('send').withArgs('queue metrics','collector,queue,operation').onCall(0);
        graphite.expects('send').withArgs('queue metrics','collector,queue,operation,fail').onCall(1);
		metrics.expects('total').once();
		metrics.expects('invalid').once();
		messageHandler.create({body: data}, this.resApi);
		res.verify();
		metrics.verify();
		done();
	});

	it('should return 400 for invalid userToken', function(done){
		var data = JSON.parse(JSON.stringify(this.mockedMessages.correctMessage));
		data.userToken = 0;
		var res = sinon.mock(this.resApi).expects('status').withArgs(400).returns(this.resApi);
		var messageHandler = require('../../../src/routes/handlers/message')(this.mockQ, this.metricsApi, this.mockGraphite);
		var metrics = sinon.mock(this.metricsApi);
        var graphite = sinon.mock(this.mockGraphite);
        graphite.expects('send').withArgs('queue metrics','collector,queue,operation').onCall(0);
        graphite.expects('send').withArgs('queue metrics','collector,queue,operation,fail').onCall(1);
		metrics.expects('total').once();
		metrics.expects('invalid').once();
		messageHandler.create({body: data}, this.resApi);
		res.verify();
		metrics.verify();
		done();
	});

	it('should return 400 for invalid time', function(done){
		var data = JSON.parse(JSON.stringify(this.mockedMessages.correctMessage));
		data.time = 'bla';
		var res = sinon.mock(this.resApi).expects('status').withArgs(400).returns(this.resApi);
		var messageHandler = require('../../../src/routes/handlers/message')(this.mockQ, this.metricsApi, this.mockGraphite);
		var metrics = sinon.mock(this.metricsApi);
        var graphite = sinon.mock(this.mockGraphite);
        graphite.expects('send').withArgs('queue metrics','collector,queue,operation').onCall(0);
        graphite.expects('send').withArgs('queue metrics','collector,queue,operation,fail').onCall(1);
		metrics.expects('total').once();
		metrics.expects('invalid').once();
		messageHandler.create({body: data}, this.resApi);
		res.verify();
		metrics.verify();
		done();
	});

	it('should return 400 for invalid state format', function(done){
		var data = JSON.parse(JSON.stringify(this.mockedMessages.correctMessage));
		data.state = 0;
		var res = sinon.mock(this.resApi).expects('status').withArgs(400).returns(this.resApi);
		var messageHandler = require('../../../src/routes/handlers/message')(this.mockQ, this.metricsApi, this.mockGraphite);
		var metrics = sinon.mock(this.metricsApi);
        var graphite = sinon.mock(this.mockGraphite);
        graphite.expects('send').withArgs('queue metrics','collector,queue,operation').onCall(0);
        graphite.expects('send').withArgs('queue metrics','collector,queue,operation,fail').onCall(1);
		metrics.expects('total').once();
		metrics.expects('invalid').once();
		messageHandler.create({body: data}, this.resApi);
		res.verify();
		metrics.verify();
		done();
	});

	it('should return 400 for invalid state', function(done){
		var data = JSON.parse(JSON.stringify(this.mockedMessages.correctMessage));
		data.state = 'blah';
		var res = sinon.mock(this.resApi).expects('status').withArgs(400).returns(this.resApi);
		var messageHandler = require('../../../src/routes/handlers/message')(this.mockQ, this.metricsApi, this.mockGraphite);
		var metrics = sinon.mock(this.metricsApi);
        var graphite = sinon.mock(this.mockGraphite);
        graphite.expects('send').withArgs('queue metrics','collector,queue,operation').onCall(0);
        graphite.expects('send').withArgs('queue metrics','collector,queue,operation,fail').onCall(1);
		metrics.expects('total').once();
		metrics.expects('invalid').once();
		messageHandler.create({body: data}, this.resApi);
		res.verify();
		metrics.verify();
		done();
	});

	it('should return 400 without source', function (done) {
		var res = sinon.mock(this.resApi).expects('status').withArgs(400).returns(this.resApi);
		var messageHandler = require('../../../src/routes/handlers/message')(this.mockQ, this.metricsApi, this.mockGraphite);
		var metrics = sinon.mock(this.metricsApi);
        var graphite = sinon.mock(this.mockGraphite);
        graphite.expects('send').withArgs('queue metrics','collector,queue,operation').onCall(0);
        graphite.expects('send').withArgs('queue metrics','collector,queue,operation,fail').onCall(1);
		metrics.expects('total').once();
		metrics.expects('invalid').once();
		messageHandler.create({body: this.mockedMessages.missingSourceMessage}, this.resApi);
		res.verify();
		metrics.verify();
		done();
	});

	it('should return 400 without id', function (done) {
		var res = sinon.mock(this.resApi).expects('status').withArgs(400).returns(this.resApi);
		var messageHandler = require('../../../src/routes/handlers/message')(this.mockQ, this.metricsApi, this.mockGraphite);
		var metrics = sinon.mock(this.metricsApi);
        var graphite = sinon.mock(this.mockGraphite);
        graphite.expects('send').withArgs('queue metrics','collector,queue,operation').onCall(0);
        graphite.expects('send').withArgs('queue metrics','collector,queue,operation,fail').onCall(1);
		metrics.expects('total').once();
		metrics.expects('invalid').once();
		messageHandler.create({body: this.mockedMessages.missingIdMessage}, this.resApi);
		res.verify();
		metrics.verify();
		done();
	});

	it('should return 400 without userToken', function (done) {
		var res = sinon.mock(this.resApi).expects('status').withArgs(400).returns(this.resApi);
		var messageHandler = require('../../../src/routes/handlers/message')(this.mockQ, this.metricsApi, this.mockGraphite);
		var metrics = sinon.mock(this.metricsApi);
        var graphite = sinon.mock(this.mockGraphite);
        graphite.expects('send').withArgs('queue metrics','collector,queue,operation').onCall(0);
        graphite.expects('send').withArgs('queue metrics','collector,queue,operation,fail').onCall(1);
		metrics.expects('total').once();
		metrics.expects('invalid').once();
		messageHandler.create({body: this.mockedMessages.missingUserTokenMessage}, this.resApi);
		res.verify();
		metrics.verify();
		done();
	});

	it('should return 400 without time', function (done) {
		var res = sinon.mock(this.resApi).expects('status').withArgs(400).returns(this.resApi);
		var messageHandler = require('../../../src/routes/handlers/message')(this.mockQ, this.metricsApi, this.mockGraphite);
		var metrics = sinon.mock(this.metricsApi);
        var graphite = sinon.mock(this.mockGraphite);
        graphite.expects('send').withArgs('queue metrics','collector,queue,operation').onCall(0);
        graphite.expects('send').withArgs('queue metrics','collector,queue,operation,fail').onCall(1);
		metrics.expects('total').once();
		metrics.expects('invalid').once();
		messageHandler.create({body: this.mockedMessages.missingTimeMessage}, this.resApi);
		res.verify();
		metrics.verify();
		done();
	});

	it('should return 400 without state', function (done) {
		var res = sinon.mock(this.resApi).expects('status').withArgs(400).returns(this.resApi);
		var messageHandler = require('../../../src/routes/handlers/message')(this.mockQ, this.metricsApi, this.mockGraphite);
		var metrics = sinon.mock(this.metricsApi);
        var graphite = sinon.mock(this.mockGraphite);
        graphite.expects('send').withArgs('queue metrics','collector,queue,operation').onCall(0);
        graphite.expects('send').withArgs('queue metrics','collector,queue,operation,fail').onCall(1);
		metrics.expects('total').once();
		metrics.expects('invalid').once();
		messageHandler.create({body: this.mockedMessages.missingStateMessage}, this.resApi);
		res.verify();
		metrics.verify();
		done();
	});

	it('should return 400 without tracklistApiUrl', function (done) {
		var res = sinon.mock(this.resApi).expects('status').withArgs(400).returns(this.resApi);
		var messageHandler = require('../../../src/routes/handlers/message')(this.mockQ, this.metricsApi, this.mockGraphite);
		var metrics = sinon.mock(this.metricsApi);
        var graphite = sinon.mock(this.mockGraphite);
        graphite.expects('send').withArgs('queue metrics','collector,queue,operation').onCall(0);
        graphite.expects('send').withArgs('queue metrics','collector,queue,operation,fail').onCall(1);
		metrics.expects('total').once();
		metrics.expects('invalid').once();
		messageHandler.create({body: this.mockedMessages.missingTracklistApiUrl}, this.resApi);
		res.verify();
		metrics.verify();
		done();
	});


	it('should push single messages to the queue', function (done) {
		this.q.expects('push').withExactArgs(this.message, sinon.match.func).callsArgWith(1, false);
		sinon.mock(this.resApi).expects('status').withArgs(sinon.match.number).returns(this.resApi);

		var messageHandler = require('../../../src/routes/handlers/message')(this.mockQ, this.metricsApi, this.mockGraphite);

		var metrics = sinon.mock(this.metricsApi);
        var graphite = sinon.mock(this.mockGraphite);
        graphite.expects('send').withArgs('queue metrics','collector,queue,operation').onCall(0);
        graphite.expects('send').withArgs('queue metrics','collector,queue,operation,success').onCall(1);
		metrics.expects('total').once();
		metrics.expects('valid').once();
		metrics.expects('success').once();

		messageHandler.create(this.reqApi, this.resApi);

		metrics.verify();
		this.q.verify();
		done();
	});


    it('should push array messages to the queue', function (done) {

        sinon.mock(this.resApi).expects('status').withArgs(sinon.match.number).returns(this.resApi);

        var messageHandler = require('../../../src/routes/handlers/message')(this.mockQ, this.metricsApi, this.mockGraphite);

        var metrics = sinon.mock(this.metricsApi);
        var graphite = sinon.mock(this.mockGraphite);
        for(var i=0;i<this.mockedMessages.correctArrayMessage.length;i++) {
            this.q.expects('push').withExactArgs(this.mockedMessages.correctArrayMessage[i], sinon.match.func).callsArgWith(1, false).onCall(i);
            graphite.expects('send').withArgs('queue metrics','collector,queue,operation').onCall(0+(2*i));
            graphite.expects('send').withArgs('queue metrics','collector,queue,operation,success').onCall(1+(2*i));
        }
        metrics.expects('total').exactly(this.mockedMessages.correctArrayMessage.length);
        metrics.expects('valid').exactly(this.mockedMessages.correctArrayMessage.length);
        metrics.expects('success').exactly(this.mockedMessages.correctArrayMessage.length);

        messageHandler.create({body: this.mockedMessages.correctArrayMessage}, this.resApi);

        metrics.verify();
        this.q.verify();
        done();
    });


	it('should use the failure branch if publish failed', function (done) {
		this.q.expects('push').withExactArgs(this.message, sinon.match.func).callsArgWith(1, true);
		sinon.mock(this.resApi).expects('status').withArgs(sinon.match.number).returns(this.resApi);

		var messageHandler = require('../../../src/routes/handlers/message')(this.mockQ, this.metricsApi, this.mockGraphite);
		var metrics = sinon.mock(this.metricsApi);
        var graphite = sinon.mock(this.mockGraphite);
        graphite.expects('send').withArgs('queue metrics','collector,queue,operation').onCall(0);
        graphite.expects('send').withArgs('queue metrics','collector,queue,operation,fail').onCall(1);
		metrics.expects('total').once();
		metrics.expects('valid').once();
		metrics.expects('fail').once();

		messageHandler.create(this.reqApi, this.resApi);

		metrics.verify();
		this.q.verify();
		done();
	});
});
