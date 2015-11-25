module.exports = function(config) {

	var AWS = require('aws-sdk');
	AWS.config.update({
		region: config.get('AWS_REGION') || 'us-east-1',
		maxRetries: config.get('RETRY_COUNT') || 3
	});

	var sns = new AWS.SNS({params: {TopicArn: config.get('SNS_TOPIC')}});
	var messageConverter = require('./messageConverter');
	return require('./aws-publisher')(sns, messageConverter);
};
