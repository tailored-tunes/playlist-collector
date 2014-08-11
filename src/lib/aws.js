var AWS = require('aws-sdk');
AWS.config.update({
	region: process.env.AWS_REGION || 'us-east-1',
	maxRetries: process.env.RETRY_COUNT || 3
});

var sns = new AWS.SNS({params: {TopicArn: process.env.SNS_TOPIC}});
var messageConverter = require('./messageConverter');
var publisher = require('./publisher')(sns, messageConverter);


module.exports = publisher;
