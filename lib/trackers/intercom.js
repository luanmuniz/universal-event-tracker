'use strict';

const { Maybe, isClientSide } = require('../utils');

module.exports = (config) => {
	const intercomTracker = {};
	const now = () => Math.round((new Date()).getTime / 1000);
	const intercomMapKeys = (options) => {
		const keys = {
			appId: 'app_id',
			name: 'name',
			email: 'email'
		};

		return Object.keys(keys).reduce((object, key) => {
			object[keys[key]] = options[key];
			return object;
		}, { created_at: now() });
	};

	const Intercom = (() => {
		let ic = () => '';

		/* istanbul ignore if */
		if(isClientSide) {
			ic = window.Intercom;
			window.Intercom = undefined;
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

	return intercomTracker;
};
