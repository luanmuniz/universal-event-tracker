'use strict';

const Intercom = require('intercom.io');
const { Maybe, mapKeys, intercomCreatedAt } = require('../../lib/utils');

module.exports = (config) => {
	let userInfo;
	const intercomTracker = {};
	const intercom = new Intercom(config.appId, config.apiKey);

	const userKeys = {
		userId: 'user_id',
		email: 'email',
		name: 'name'
	};

	intercomTracker.createUser = (userData) => {
		userInfo = mapKeys(userKeys, userData);
		return intercom.createUser(userInfo);
	};

	intercomTracker.createEvent = (eventName, eventData = {}) => {
		let userData = userInfo;

		if(eventData.userId || eventData.email) {
			userData = mapKeys(userKeys, eventData);
		}

		if(!userData) {
			return Promise.reject('You just need to pass a valid email or userId');
		}

		return intercom.createEvent(
			Object.assign({}, userData, {
				event_name: eventName,
				created_at: intercomCreatedAt(),
				metadata: eventData.metadata
			})
		);
	};

	intercomTracker.IntercomIO = intercom;

	return intercomTracker;
};
