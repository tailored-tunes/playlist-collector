module.exports = (function(){
	var AWS = require('aws-sdk');
	AWS.config.update({region: process.env.AWS_REGION || 'us-east-1'});
	var sns = new AWS.SNS();
	return require('./publisher')(sns);
}());
