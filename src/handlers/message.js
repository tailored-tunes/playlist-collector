module.exports = function () {
	return {
		create: function (req, res) {
			var required = ['source', 'id', 'userToken', 'time'];
			required.map(function (att) {
				if (req.body[att] === undefined) {
					res.status(400).end();
				}
			});
			res.status(200).end();
		}
	};
};
