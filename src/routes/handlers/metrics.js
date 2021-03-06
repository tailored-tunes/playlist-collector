module.exports = function(db, clock, q) {
	function getData(key) {
		return db.get(key) || 0;
	}

	return {
		data: function(req, res) {

			var result = {
				'qsize': q.size(),
				'total': getData('total'),
				'valid': getData('valid'),
				'invalid': getData('invalid'),
				'success': getData('success'),
				'fail': getData('fail'),
				'uptime': clock.uptime()
			};
			res.set('Content-Type', 'application/json');
			res.status(200).end(JSON.stringify(result));
		}
	};
};
