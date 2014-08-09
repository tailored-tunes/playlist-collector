module.exports = function (sns) {
	return {
		 store: function (message) {
			sns.publish(message);
		}
	};

};
