var async = require('async');
module.exports = function(publisher) {
	var q = async.queue(function (m, callback) {
		publisher.store(m, function(err){
			if(err) {
				callback(true);
			} else {
				callback();
			}
		});
	}, 100);

	return {
		push: function(data, callback) {
			q.push(data, callback);
		}
	};
};
