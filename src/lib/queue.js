var async = require('async');
module.exports = function(publisher) {
	var q = async.queue(function (m, callback) {
		publisher.store(m, callback);
	}, 10);

	return {
		push: function(data, callback) {
			q.push(data, callback);
		},

		size: function() {
			return q.length();
		}
	};
};
