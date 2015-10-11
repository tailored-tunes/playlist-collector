module.exports = function (nsq, converter) {
	return {
		store: function (message, callback) {
			nsq.connect();
			nsq.on('ready', function () {
				nsq.publish(process.env.SNS_TOPIC, converter.toSNSMessage(message), callback);
			});
		}
	};

};
