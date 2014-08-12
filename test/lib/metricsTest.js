/* global describe: true, it: true, beforeEach: true */
var sinon = require('sinon');
var chance = require('chance').Chance();

describe('The metrics library', function () {
	beforeEach(function () {
		this.mockDB = {set: function () {}, get: function(){}};
		this.db = sinon.mock(this.mockDB);
	});

	it('should store the total increment', function (done) {
		var num = chance.integer();
		this.db.expects('get').withExactArgs('total').returns(num);
		this.db.expects('get').withExactArgs('valid').returns(num);
		this.db.expects('get').withExactArgs('invalid').returns(num);
		this.db.expects('get').withExactArgs('success').returns(num);
		this.db.expects('get').withExactArgs('fail').returns(num);
		this.db.expects('set').withExactArgs('total', num+1).once();
		var metrics = require('../../src/lib/metrics')(this.mockDB);
		metrics.total();
		this.db.verify();
		done();
	});

	it('should store the success increment', function (done) {
		var num = chance.integer();
		this.db.expects('get').withExactArgs('total').returns(num);
		this.db.expects('get').withExactArgs('valid').returns(num);
		this.db.expects('get').withExactArgs('invalid').returns(num);
		this.db.expects('get').withExactArgs('success').returns(num);
		this.db.expects('get').withExactArgs('fail').returns(num);
		this.db.expects('set').withExactArgs('success', num+1).once();
		var metrics = require('../../src/lib/metrics')(this.mockDB);
		metrics.success();
		this.db.verify();
		done();
	});

	it('should store the failure increment', function (done) {
		var num = chance.integer();
		this.db.expects('get').withExactArgs('total').returns(num);
		this.db.expects('get').withExactArgs('valid').returns(num);
		this.db.expects('get').withExactArgs('invalid').returns(num);
		this.db.expects('get').withExactArgs('success').returns(num);
		this.db.expects('get').withExactArgs('fail').returns(num);
		this.db.expects('set').withExactArgs('fail', num+1).once();
		var metrics = require('../../src/lib/metrics')(this.mockDB);
		metrics.fail();
		this.db.verify();
		done();
	});

	it('should store the valid increment', function (done) {
		var num = chance.integer();
		this.db.expects('get').withExactArgs('total').returns(num);
		this.db.expects('get').withExactArgs('valid').returns(num);
		this.db.expects('get').withExactArgs('invalid').returns(num);
		this.db.expects('get').withExactArgs('success').returns(num);
		this.db.expects('get').withExactArgs('fail').returns(num);
		this.db.expects('set').withExactArgs('valid', num+1).once();
		var metrics = require('../../src/lib/metrics')(this.mockDB);
		metrics.valid();
		this.db.verify();
		done();
	});

	it('should store the invalid increment', function (done) {
		var num = chance.integer();
		this.db.expects('get').withExactArgs('total').returns(num);
		this.db.expects('get').withExactArgs('valid').returns(num);
		this.db.expects('get').withExactArgs('invalid').returns(num);
		this.db.expects('get').withExactArgs('success').returns(num);
		this.db.expects('get').withExactArgs('fail').returns(num);
		this.db.expects('set').withExactArgs('invalid', num+1).once();
		var metrics = require('../../src/lib/metrics')(this.mockDB);
		metrics.invalid();
		this.db.verify();
		done();
	});

	it('total should default to 0', function (done) {
		this.db.expects('get').withExactArgs(sinon.match.string).returns(null).atLeast(5);
		this.db.expects('set').withExactArgs('total', 1).once();
		var metrics = require('../../src/lib/metrics')(this.mockDB);
		metrics.total();
		this.db.verify();
		done();
	});

	it('valid should default to 0', function (done) {
		this.db.expects('get').withExactArgs(sinon.match.string).returns(null).atLeast(5);
		this.db.expects('set').withExactArgs('valid', 1).once();
		var metrics = require('../../src/lib/metrics')(this.mockDB);
		metrics.valid();
		this.db.verify();
		done();
	});

	it('invalid should default to 0', function (done) {
		this.db.expects('get').withExactArgs(sinon.match.string).returns(null).atLeast(5);
		this.db.expects('set').withExactArgs('invalid', 1).once();
		var metrics = require('../../src/lib/metrics')(this.mockDB);
		metrics.invalid();
		this.db.verify();
		done();
	});

	it('success should default to 0', function (done) {
		this.db.expects('get').withExactArgs(sinon.match.string).returns(null).atLeast(5);
		this.db.expects('set').withExactArgs('success', 1).once();
		var metrics = require('../../src/lib/metrics')(this.mockDB);
		metrics.success();
		this.db.verify();
		done();
	});

	it('failure should default to 0', function (done) {
		this.db.expects('get').withExactArgs(sinon.match.string).returns(null).atLeast(5);
		this.db.expects('set').withExactArgs('fail', 1).once();
		var metrics = require('../../src/lib/metrics')(this.mockDB);
		metrics.fail();
		this.db.verify();
		done();
	});

});
