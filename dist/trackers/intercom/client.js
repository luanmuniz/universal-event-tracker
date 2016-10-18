'use strict';

var _require = require('../../lib/utils');

var isClientSide = _require.isClientSide;
var intercomCreatedAt = _require.intercomCreatedAt;

var intercomScript = require('./script');

module.exports = function (config) {
	var intercomTracker = {};
	var intercomMapKeys = function intercomMapKeys(options) {
		var keys = {
			appId: 'app_id',
			name: 'name',
			email: 'email',
			userId: 'user_id',
			userHash: 'user_hash',
			createdAt: 'created_at'
		};

		options = options || {};

		var initialObject = options.email && !options.createdAt ? {
			created_at: intercomCreatedAt()
		} : {};

		return Object.keys(keys).reduce(function (object, key) {
			var value = options[key] || key !== 'userId' && config[key];

			if (value) {
				object[keys[key]] = value;
			}
			return object;
		}, initialObject);
	};

	if (!window.Intercom) {
		intercomScript(config.appId);
	}

	intercomTracker.boot = function (options) {
		window.Intercom('boot', Object.assign({}, intercomMapKeys(options), {
			app_id: config.appId
		}));
		return intercomTracker;
	};

	if (window.Intercom && config.boot) {
		intercomTracker.boot();
	}

	intercomTracker.update = function (options) {
		window.Intercom('update', intercomMapKeys(options));
		return intercomTracker;
	};

	intercomTracker.createEvent = function (eventName, eventData) {
		window.Intercom('trackEvent', eventName, eventData);
		return intercomTracker;
	};

	intercomTracker.shutdown = function () {
		window.Intercom('shutdown');
		return intercomTracker;
	};

	return intercomTracker;
};