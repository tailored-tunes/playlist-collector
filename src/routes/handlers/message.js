module.exports = function (q, metrics) {
	return {
		create: function (req, res) {
			var required = ['source', 'id', 'userToken', 'time'];
			var failure = false;
			required.map(function (att) {
				if (req.body[att] === undefined) {
					res.status(400).end();
					metrics.invalid();
					failure = true;
				}
			});
			metrics.total();
			if (!failure) {
				metrics.valid();
				q.push(req.body, function (err) {
					if (err) {
						metrics.fail();
					} else {
						metrics.success();
					}
				});
				res.status(202).end();

			}
		}
	};
};
