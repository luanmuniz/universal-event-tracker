'use strict';

var Intercom = require('intercom.io');

var _require = require('../../lib/utils');

var Maybe = _require.Maybe;
var mapKeys = _require.mapKeys;
var intercomCreatedAt = _require.intercomCreatedAt;


module.exports = function (config) {
	var userInfo = void 0;
	var intercomTracker = {};
	var intercom = new Intercom(config.appId, config.apiKey);

	var userKeys = {
		userId: 'user_id',
		email: 'email',
		name: 'name'
	};

	intercomTracker.createUser = function (userData) {
		userInfo = mapKeys(userKeys, userData);
		return intercom.createUser(userInfo);
	};

	intercomTracker.createEvent = function (eventName) {
		var eventData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		var userData = userInfo;

		return intercom.createEvent(Object.assign({}, userData, {
			email: config.email,
			name: config.name,
			user_hash: config.userHash,
			user_id: config.userId,
			event_name: eventName,
			created_at: intercomCreatedAt(),
			metadata: eventData.metadata
		}));
	};

	intercomTracker.IntercomIO = intercom;

	return intercomTracker;
};