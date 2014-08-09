/* global describe: true, it: true, beforeEach: true */
//var assert = require('assert');
var sinon = require('sinon');
var chance = require('chance').Chance();

var mockSnsApi = { publish: function () {} };
var mockSns, message;

beforeEach(function() {
	mockSns = sinon.mock(mockSnsApi);
	message = chance.string();
});

describe('The publisher', function() {
	it('should call the 3rd party publisher with the correct message', function(done) {
		mockSns.expects('publish').once().withArgs(message);

		var publisher = require('../../src/lib/publisher')(mockSnsApi);

		publisher.store(message);

		mockSns.verify();

		done();
	});
});
