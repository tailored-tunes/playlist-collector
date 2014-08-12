/* global describe: true, it: true, beforeEach: true */
var sinon = require('sinon');
var chance = require('chance').Chance();

beforeEach(function () {
	this.resApi = {status: function () {}, end:function(){}, set:function(){}};
	this.reqApi = {body: ''};
	this.clockApi = {uptime:function(){}};
	this.mockDB = {get: function () {
	}};
	this.db = sinon.mock(this.mockDB);

});

describe('The metrics handler', function () {
	it('should return the metrics', function (done) {

		var total = chance.integer();
		var valid = chance.integer();
		var invalid = chance.integer();
		var success = chance.integer();
		var fail = chance.integer();
		var uptime = chance.integer();

		this.db.expects('get').withExactArgs('total').returns(total).once();
		this.db.expects('get').withExactArgs('valid').returns(valid).once();
		this.db.expects('get').withExactArgs('invalid').returns(invalid).once();
		this.db.expects('get').withExactArgs('success').returns(success).once();
		this.db.expects('get').withExactArgs('fail').returns(fail).once();

		var expectedMessage = JSON.stringify({
			'total': total,
			'valid': valid,
			'invalid': invalid,
			'success': success,
			'fail': fail,
			'uptime': uptime
		});

		var response = sinon.mock(this.resApi);

		response.expects('set').withExactArgs('Content-Type', 'application/json').once().returns(this.resApi);
		response.expects('end').withExactArgs(expectedMessage).once();
		response.expects('status').withExactArgs(200).once().returns(this.resApi);

		var clock = sinon.mock(this.clockApi).expects('uptime').returns(uptime).once();

		var metrics = require('../../../src/routes/handlers/metrics')(this.mockDB, this.clockApi);

		metrics.data(this.reqApi, this.resApi);

		this.db.verify();
		response.verify();
		clock.verify();

		done();
	});
});
