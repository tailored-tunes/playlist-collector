/* global describe: true, it: true, beforeEach: true */
var assert = require('assert');
var sinon = require('sinon');
var chance = require('chance').Chance();

beforeEach(function(){
	this.mockPublisher = {store: function(){}};
	this.publisher = sinon.mock(this.mockPublisher);
});

describe('The queue', function(){
	it('should report success', function(done){
		var msg = chance.string();
		this.publisher.expects('store').withExactArgs(msg, sinon.match.func).once().callsArgWith(1, false);
		var q = require('../../src/lib/queue')(this.mockPublisher);
		q.push(msg, done);
	});

	it('should report error', function(done){
		var msg = chance.string();
		this.publisher.expects('store').withExactArgs(msg, sinon.match.func).once().callsArgWith(1, true);
		var q = require('../../src/lib/queue')(this.mockPublisher);
		q.push(msg, function(err){
			if(err) {
				done();
			} else {
				done(true);
			}
		});
	});

	it('should have a size', function(done){

		var q = require('../../src/lib/queue')(this.mockPublisher);
		assert.equal(q.size(), 0);
		q.push('a', sinon.stub());
		assert.equal(q.size(), 1);

		done();
	});
});

