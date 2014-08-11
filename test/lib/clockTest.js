/* global describe: true, it: true */
var assert = require('assert');
var chance = require('chance').Chance();

describe('The clock', function () {
	it('should report uptime', function (done) {
		var startTime = chance.timestamp();
		var clock = require('../../src/lib/clock')(startTime);
		var now = new Date().getTime();
		assert.equal(Math.round(clock.uptime()/10), Math.round((now-startTime)/10));
		done();
	});
});

