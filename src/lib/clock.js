module.exports = function(startTime){
	return {
		uptime: function() {
			var end = new Date().getTime();
			var time = end - startTime;
			return time;
		}
	};
};
