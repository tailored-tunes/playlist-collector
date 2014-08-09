/* global describe: true, it: true */
//var assert = require('assert');
var sinon = require('sinon');
var chance = require('chance').Chance();

describe('The publisher', function() {
	it('should publish stuff', function(done) {
		var mockSnsApi = { publish: function () {} };
		var mockSns = sinon.mock(mockSnsApi);
		var expectation = mockSns.expects('publish');

		var message = chance.string();

		expectation.once().withArgs(message);

		var publisher = require('../../src/lib/publisher')(mockSnsApi);

		publisher.publish(message);

		expectation.callArgWith(1, false, 0);
		expectation.callArgWith(1, true, 0);

		mockSns.verify();

		done();
	});
});
