var correctMessage = {
  'source': 'deezer',
  'id': 'xyz',
  'userToken': 'abc123',
  'time': 1407248924
};

var missingSourceMessage = {
  'id': 'xyz',
  'userToken': 'abc123',
  'time': 1407248924
};

var missingIdMessage = {
  'source': 'deezer',
  'userToken': 'abc123',
  'time': 1407248924
};

var missingUserTokenMessage = {
  'source': 'deezer',
  'id': 'xyz',
  'time': 1407248924
};

var missingTimeMessage = {
  'source': 'deezer',
  'id': 'xyz',
  'userToken': 'abc123'
};


module.exports = {
  correctMessage : correctMessage,
  missingSourceMessage : missingSourceMessage,
  missingIdMessage : missingIdMessage,
  missingUserTokenMessage : missingUserTokenMessage,
  missingTimeMessage : missingTimeMessage
};
