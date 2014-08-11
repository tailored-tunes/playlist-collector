module.exports = function (s) {
	var storage = s;


	if (!(typeof localStorage === 'undefined' || localStorage === null)) {
		storage = storage || localStorage;
	}

	if (typeof storage === 'undefined' || storage === null) {
		var LocalStorage = require('node-localstorage').LocalStorage;
		storage = new LocalStorage('./db');
	}
	return {
		get: function (key) {
			return storage.getItem(key);
		},

		set: function (key, value) {
			storage.setItem(key, value);
		},

		remove: function (key) {
			storage.removeItem(key);
		},

		clear: function () {
			storage.clear();
		}
	};
};
