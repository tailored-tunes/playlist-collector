var correctMessage = {
	'source': 'deezer',
	'state': 'shared',
	'id': 'xyz',
	'userToken': 'abc123',
	'tracklistApiUrl': 'http://something',
	'time': 1407248924
};

var missingSourceMessage = {
	'id': 'xyz',
	'state': 'unshared',
	'userToken': 'abc123',
	'tracklistApiUrl': 'http://something',
	'time': 1407248924
};

var missingIdMessage = {
	'source': 'deezer',
	'state': 'shared',
	'userToken': 'abc123',
	'tracklistApiUrl': 'http://something',
	'time': 1407248924
};

var missingUserTokenMessage = {
	'source': 'deezer',
	'state': 'unshared',
	'id': 'xyz',
	'tracklistApiUrl': 'http://something',
	'time': 1407248924
};

var missingTimeMessage = {
	'source': 'deezer',
	'state': 'shared',
	'id': 'xyz',
	'tracklistApiUrl': 'http://something',
	'userToken': 'abc123'
};

var missingStateMessage = {
	'source': 'deezer',
	'id': 'xyz',
	'userToken': 'abc123',
	'tracklistApiUrl': 'http://something',
	'time': 1407248924
};

var missingTracklistApiUrl = {
	'source': 'deezer',
	'state': 'shared',
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
	missingStateMessage: missingStateMessage,
	missingTracklistApiUrl: missingTracklistApiUrl
};
