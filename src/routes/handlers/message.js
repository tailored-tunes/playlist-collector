var isString = function (value) {
	return typeof value === 'string';
};

var isInt = function (value) {
	return typeof value === 'number';
};


var required = [
	{
		name: 'source',
		validate: isString
	},
	{
		name: 'id',
		validate: isString
	},
	{
		name: 'userToken',
		validate: isString
	},
	{
		name: 'time',
		validate: isInt
	},
	{
		name: 'state',
		validate: function(value) {
			if(!isString(value)) {
				return false;
			}

			var validStatuses = ['shared', 'unshared'];
			return (validStatuses.indexOf(value) > -1);
		}
	}
];
module.exports = function (q, metrics) {
	return {
		create: function (req, res) {

			var failure = false;
			required.map(function (validator) {
				if (!validator.validate(req.body[validator.name])) {
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
			} else {
				res.status(400).end();
				metrics.invalid();
			}
		}
	};
};
