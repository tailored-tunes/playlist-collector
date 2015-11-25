var logger = require('winston');
module.exports = function (nsq, converter) {

	logger.log("Connecting to publisher");
	nsq.connect();

	return {
		store: function (message, callback) {
			nsq.publish(process.env.SNS_TOPIC, converter.toSNSMessage(message), callback);
		}
	};

};
