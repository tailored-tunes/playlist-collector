module.exports = function (sns, converter) {
	return {
		 store: function (message) {
			sns.publish(converter.toSNSMessage(message), function(){});
		}
	};

};
