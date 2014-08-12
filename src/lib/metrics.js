module.exports = function(db){

	var total = db.get('total') || 0;
	var valid = db.get('valid') || 0;
	var invalid = db.get('invalid') || 0;
	var success = db.get('success') || 0;
	var fail = db.get('fail') || 0;


	return {
		total: function() {
			db.set('total', ++total);
		},

		success: function() {
			db.set('success', ++success);
		},

		fail: function() {
			db.set('fail', ++fail);
		},

		valid: function() {
			db.set('valid', ++valid);
		},

		invalid: function() {
			db.set('invalid', ++invalid);
		}
	};
};
