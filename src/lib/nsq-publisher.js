module.exports = function (nsq, converter) {
	return {
		store: function (message, callback) {
			nsq.connect();
			nsq.on('ready', function () {
				w.publish(process.env.SNS_TOPIC, message, callback);
			});
		}
	};

};
