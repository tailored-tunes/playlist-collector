var correctMessage = {
	'source': 'deezer',
	'state': 'shared',
	'id': 'xyz',
	'userToken': 'abc123',
	'time': 1407248924
};

var missingSourceMessage = {
	'id': 'xyz',
	'state': 'unshared',
	'userToken': 'abc123',
	'time': 1407248924
};

var missingIdMessage = {
	'source': 'deezer',
	'state': 'shared',
	'userToken': 'abc123',
	'time': 1407248924
};

var missingUserTokenMessage = {
	'source': 'deezer',
	'state': 'unshared',
	'id': 'xyz',
	'time': 1407248924
};

var missingTimeMessage = {
	'source': 'deezer',
	'state': 'shared',
	'id': 'xyz',
	'userToken': 'abc123'
};

var missingStateMessage = {
	'source': 'deezer',
	'id': 'xyz',
	'userToken': 'abc123',
	'time': 1407248924
};


module.exports = {
	correctMessage: correctMessage,
	missingSourceMessage: missingSourceMessage,
	missingIdMessage: missingIdMessage,
	missingUserTokenMessage: missingUserTokenMessage,
	missingTimeMessage: missingTimeMessage,
	missingStateMessage: missingStateMessage
};
