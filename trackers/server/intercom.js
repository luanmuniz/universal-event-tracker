'use strict';

const Intercom = require('intercom.io');
const { Maybe } = require('../../lib/utils');

module.exports = (config) => {
	const intercomTracker = {};
	const intercom = new Intercom(config.appId, config.apiKey);

	intercomTracker.createEvent = (eventName, eventData) => {
		return intercom.createEvent(Object.assign({}, eventData, {
			userId: Maybe(config.userId),
			name: Maybe(config.name),
			email: Maybe(config.email),
			event_name: eventName
		}));
	};

	intercomTracker.IntercomIO = intercom;

	return intercomTracker;
};
