/* global describe: true, it: true, beforeEach: true */
var sinon = require('sinon');
var message = require('../../mockedData/messages').correctMessage;
var reqApi = {body: message};

beforeEach(function(){
	this.resApi = {status:function(){},end:function(){}};
	this.mockQ = {push: function(){}};
	this.q = sinon.mock(this.mockQ);

});

describe('The message handler', function() {
	it('should push messages to the queue', function(done) {
		this.q.expects('push').withExactArgs(message, sinon.match.func).callsArgWith(1, false);
		sinon.mock(this.resApi).expects('status').withArgs(sinon.match.number).returns(this.resApi);

		var messageHandler = require('../../../src/routes/handlers/message')(this.mockQ);

		messageHandler.create(reqApi, this.resApi);

		this.q.verify();
		done();
	});


	it('should use the failure branch if publish failed', function(done) {
		this.q.expects('push').withExactArgs(message, sinon.match.func).callsArgWith(1, true);
		sinon.mock(this.resApi).expects('status').withArgs(sinon.match.number).returns(this.resApi);

		var messageHandler = require('../../../src/routes/handlers/message')(this.mockQ);
		messageHandler.create(reqApi, this.resApi);

		this.q.verify();
		done();
	});
});
