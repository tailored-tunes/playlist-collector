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
        name: 'tracklistApiUrl',
        validate: isString
    },
    {
        name: 'state',
        validate: function (value) {
            if (!isString(value)) {
                return false;
            }

            var validStatuses = ['shared', 'unshared'];
            return (validStatuses.indexOf(value) > -1);
        }
    }
];
module.exports = function (q, metrics, graphite) {
    return {
        create: function (req, res) {

            var body = req.body;
            if (!(body instanceof Array)) {
                body = [body];
            }

            var failure = false;
            body.forEach(function (data) {
                graphite.send('queue metrics', 'collector,queue,operation');
                metrics.total();
                required.map(function (validator) {
                    if (!validator.validate(data[validator.name])) {
                        failure = true;
                    }
                });
            });

            if (failure) {
                res.status(400).end();
                metrics.invalid();
            } else {
                body.forEach(function (data) {
                    metrics.valid();
                    q.push(data, function (err) {
                        if (err) {
                            graphite.send('queue metrics', 'collector,queue,operation,fail');
                            metrics.fail();
                        } else {
                            graphite.send('queue metrics', 'collector,queue,operation,success');
                            metrics.success();
                        }
                    });
                });
                res.status(202).end();
            }
        }
    };
};

