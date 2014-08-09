/* global describe: true, it: true */
var assert = require('assert');
var chance = require('chance').Chance();

var incomingMessage = {
	'source': chance.string(),
	'id': chance.string(),
	'userToken': chance.string(),
	'time': chance.timestamp()
};

var messageConverter = require('../../src/lib/messageConverter');

describe('Message converter', function(){
	it('should convert internal message to SNS messages', function(done){

		var expected = {Message: JSON.stringify(incomingMessage)};

		var actual = messageConverter.toSNSMessage(incomingMessage);

		assert.deepEqual(actual, expected);

		done();
	});
});
