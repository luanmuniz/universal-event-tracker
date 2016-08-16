'use strict';

const { Maybe, isClientSide, intercomCreatedAt } = require('../lib/utils');

module.exports = (config) => {
	const intercomTracker = {};
	const intercomMapKeys = (options) => {
		const keys = {
			appId: 'app_id',
			name: 'name',
			email: 'email',
			userId: 'user_id'
		};

		options = options || {};

		if(!options.email) {
			options.userId = 'anonymous';
		}

		if(options.email && options.userId === 'anonymous') {
			options.userId = null;
		}

		const initialObject = options.email ? { created_at: intercomCreatedAt() } : {};

		return Object.keys(keys).reduce((object, key) => {
			const value = options[key] || (key !== 'userId' && config[key]);

			if(value) {
				object[keys[key]] = value;
			}
			return object;
		}, initialObject);
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
		Intercom('update', Maybe(intercomMapKeys(options)));
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
