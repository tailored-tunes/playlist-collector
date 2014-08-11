module.exports = function(db) {
	function getData(key) {
		return db.get(key) || 0;
	}

	return {
		data: function(req, res) {

			var result = {
				'total': getData('total'),
				'valid': getData('valid'),
				'invalid': getData('invalid'),
				'attempts': getData('attempts'),
				'success': getData('success'),
				'fail': getData('fail')
			};
			res.set('Content-Type', 'application/json');
			res.status(200).end(JSON.stringify(result));
		}
	};
};
