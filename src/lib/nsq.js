var nsq = require('nsqjs');

module.exports = function(config) {

	var w = new nsq.Writer(config.get('NSQ_HOST'), config.get('NSQ_PORT'), {
		messageTimeout: 1000*60*10
	});

	var messageConverter = require('./messageConverter');
	return require('./nsq-publisher')(w, messageConverter);
};
