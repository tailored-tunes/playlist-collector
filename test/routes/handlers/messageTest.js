/* global describe: true, it: true, beforeEach: true */
var sinon = require('sinon');
var mockedMessages = require('../../mockedData/messages');

beforeEach(function(){
	this.resApi = {status:function(){return {end:function(){}};}};
	this.reqApi = {body:mockedMessages.correctMessage};
	this.mockQ = {push: function(){}};
	this.q = sinon.mock(this.mockQ);

});

describe('The message handler', function() {
	it('should push messages to the queue', function(done) {
		var msg = mockedMessages.correctMessage;
		this.q.expects('push').withExactArgs(msg, sinon.match.func).callsArgWith(1, false);

		var messageHandler = require('../../../src/routes/handlers/message')(this.mockQ);
		messageHandler.create(this.reqApi, this.resApi);

		this.q.verify();
		done();
	});


	it('should use the failure branch if publish failed', function(done) {
		var msg = mockedMessages.correctMessage;
		this.q.expects('push').withExactArgs(msg, sinon.match.func).callsArgWith(1, true);

		var messageHandler = require('../../../src/routes/handlers/message')(this.mockQ);
		messageHandler.create(this.reqApi, this.resApi);

		this.q.verify();
		done();
	});
});
