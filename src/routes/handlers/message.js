module.exports = function (q) {
	return {
		create: function (req, res) {
			var required = ['source', 'id', 'userToken', 'time'];
			required.map(function (att) {
				if (req.body[att] === undefined) {
					res.status(400).end();
				}
			});

			q.push(req.body, function() {});
			res.status(202).end();

		}
	};
};
