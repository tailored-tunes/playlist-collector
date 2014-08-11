/* global describe: true, it: true, beforeEach: true */
var assert = require('assert');
var sinon = require('sinon');
var chance = require('chance').Chance();

beforeEach(function() {
	this.mockSnsApi = { publish: function () {} };
	this.converterApi = { toSNSMessage: function () {} };
	this.mockSns = sinon.mock(this.mockSnsApi);
	this.mockConverter = sinon.mock(this.converterApi);
	this.message = chance.string();
});

describe('The publisher', function() {
	it('should call the 3rd party publisher with the correct message', function(done) {
		var randomMessage = chance.string();
		var cb = sinon.stub();
		this.mockConverter.expects('toSNSMessage').once().withArgs(this.message).returns(randomMessage);
		this.mockSns.expects('publish').once().withArgs(randomMessage, cb).callsArgWith(1, false);

		var publisher = require('../../src/lib/publisher')(this.mockSnsApi, this.converterApi);

		publisher.store(this.message, cb);
		assert.equal(cb.calledWith(false), true);
		this.mockSns.verify();

		done();
	});

	it('should handle errors', function(done) {
		var randomMessage = chance.string();
		var cb = sinon.stub();
		this.mockConverter.expects('toSNSMessage').once().withArgs(this.message).returns(randomMessage);
		this.mockSns.expects('publish').once().withArgs(randomMessage, cb).callsArgWith(1, true);

		var publisher = require('../../src/lib/publisher')(this.mockSnsApi, this.converterApi);

		publisher.store(this.message, cb);

		assert.equal(cb.calledWith(true), true);
		this.mockSns.verify();

		done();
	});
});
