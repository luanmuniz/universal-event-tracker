'use strict';

const { isClientSide, intercomCreatedAt } = require('../../lib/utils');
const intercomScript = require('./script');

module.exports = (config) => {
	const intercomTracker = {};
	const intercomMapKeys = (options) => {
		const keys = {
			appId: 'app_id',
			name: 'name',
			email: 'email',
			userId: 'user_id',
			userHash: 'user_hash',
			createdAt: 'created_at'
		};

		options = options || {};

		const initialObject = options.email && !options.createdAt ? {
			created_at: intercomCreatedAt()
		} : {};

		return Object.keys(keys).reduce((object, key) => {
			const value = options[key] || (key !== 'userId' && config[key]);

			if(value) {
				object[keys[key]] = value;
			}
			return object;
		}, initialObject);
	};

	if(!window.Intercom) {
		intercomScript(config.appId);
	}

	intercomTracker.boot = (options) => {
		window.Intercom('boot', Object.assign({}, intercomMapKeys(options), {
			app_id: config.appId
		}));
		return intercomTracker;
	};

	if(window.Intercom && config.boot) {
		intercomTracker.boot();
	}

	intercomTracker.update = (options) => {
		window.Intercom('update', intercomMapKeys(options));
		return intercomTracker;
	};

	intercomTracker.createEvent = (eventName, eventData) => {
		window.Intercom('trackEvent', eventName, eventData);
		return intercomTracker;
	};

	intercomTracker.shutdown = () => {
		window.Intercom('shutdown');
		return intercomTracker;
	};

	return intercomTracker;
};
