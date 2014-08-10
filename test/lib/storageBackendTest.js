/* global describe: true, it: true, beforeEach: true */
var assert = require('assert');
var sinon = require('sinon');
var chance = require('chance').Chance();

beforeEach(function(){
	this.lsApi = {getItem: function(){}, setItem: function(){}, removeItem: function(){}, clear: function(){}};
	this.mockLS = sinon.mock(this.lsApi);
	this.storage = require('../../src/lib/storageBackend')(this.lsApi);
});

describe('localStorage backen', function(){
	it('should save an item', function(done){
		var randomKey = chance.string();
		var randomValue = chance.string();
		this.mockLS.expects('setItem').withExactArgs(randomKey, randomValue).once();

		this.storage.set(randomKey, randomValue);

		this.mockLS.verify();
		done();
	});

	it('should return an item', function(done){
		var randomKey = chance.string();
		var randomValue = chance.string();
		this.mockLS.expects('getItem').withExactArgs(randomKey).returns(randomValue).once();

		var expected = randomValue;
		var actual = this.storage.get(randomKey);

		this.mockLS.verify();

		assert.deepEqual(actual, expected);
		done();
	});

	it('should remove an item', function(done){
		var randomKey = chance.string();
		this.mockLS.expects('removeItem').withExactArgs(randomKey).once();

		this.storage.remove(randomKey);

		this.mockLS.verify();
		done();
	});

	it('should clear the storage', function(done){
		this.mockLS.expects('clear').once();

		this.storage.clear();

		this.mockLS.verify();
		done();
	});

	it('should use localStorage if nothing else is provided', function(done){
		/* jshint -W020 */
		localStorage = {clear: function(){}};
		/* jshint +W020 */
		var mock = sinon.mock(localStorage);
		var storage = require('../../src/lib/storageBackend')();
		mock.expects('clear').once();
		storage.clear();

		mock.verify();
		done();
	});

	it('should be able to use the storage lib', function(done){
		/* jshint -W020 */
		localStorage = null;
		/* jshint +W020 */
		var randomKey = chance.string();
		var randomValue = chance.string();
		var storage = require('../../src/lib/storageBackend')();
		storage.set(randomKey, randomValue);
		var expected = randomValue;
		var actual = storage.get(randomKey);

		assert.deepEqual(actual, expected);

		storage.clear();
		done();
	});

});
