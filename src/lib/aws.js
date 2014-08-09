module.exports = (function(){
	var AWS = require('aws-sdk');
	AWS.config.update({region: process.env.AWS_REGION || 'us-east-1'});
	var sns = new AWS.SNS({params: {TopicArn: process.env.SNS_TOPIC}});
	var messageConverter = require('./messageConverter');
	return require('./publisher')(sns, messageConverter);
}());