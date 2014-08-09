/* global describe: true, it: true, beforeEach: true */
//var assert = require('assert');
var sinon = require('sinon');
var chance = require('chance').Chance();

var mockSnsApi = { publish: function () {} };
var converterApi = { toSNSMessage: function () {} };
var mockSns, mockConverter, message;

beforeEach(function() {
	mockSns = sinon.mock(mockSnsApi);
	mockConverter = sinon.mock(converterApi);
	message = chance.string();
});

describe('The publisher', function() {
	it('should call the 3rd party publisher with the correct message', function(done) {
		var randomMessage = chance.string();
		mockConverter.expects('toSNSMessage').once().withArgs(message).returns(randomMessage);
		mockSns.expects('publish').once().withArgs(randomMessage);

		var publisher = require('../../src/lib/publisher')(mockSnsApi, converterApi);

		publisher.store(message);

		mockSns.verify();

		done();
	});
});
