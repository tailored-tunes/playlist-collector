module.exports = function (nsq, converter) {
	return {
		 store: function (message, callback) {
			sns.publish(converter.toSNSMessage(message), callback);
		}
	};

};
