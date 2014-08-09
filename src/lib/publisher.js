/* global console: false */
module.exports = function (sns) {
	return {
		 publish: function (message) {
			sns.publish(message, function (err, data) {
				if (!err) {
					console.log('Message published');
				}
				else {
					console.log(err, data);
				}
			});
		}
	};

};
