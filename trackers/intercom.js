'use strict';

const { Maybe, isClientSide, intercomCreatedAt } = require('../lib/utils');

module.exports = (config) => {
	const intercomTracker = {};
	const intercomMapKeys = (options) => {
		const keys = {
			appId: 'app_id',
			name: 'name',
			email: 'email'
		};

		return Object.keys(keys).reduce((object, key) => {
			object[keys[key]] = options[key];
			return object;
		}, { created_at: intercomCreatedAt() });
	};

	const Intercom = (() => {
		let ic = () => '';

		/* istanbul ignore if */
		if(isClientSide()) {
			ic = window.Intercom;
		}

		return ic;
	})();

	Intercom('boot', Maybe(intercomMapKeys(config)));

	intercomTracker.update = (options) => {
		Intercom('update', Maybe(options));
		return intercomTracker;
	};

	intercomTracker.createEvent = (eventName, eventData) => {
		Intercom('createEvent', eventName, eventData);
		return intercomTracker;
	};

	intercomTracker.shutdown = () => {
		Intercom('shutdown');
		return intercomTracker;
	};

	return intercomTracker;
};
