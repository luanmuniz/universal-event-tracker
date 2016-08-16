'use strict';

const { Maybe, isClientSide, is } = require('../lib/utils');

// Google Tag Manager Tracker

module.exports = () => {
	const gtmTracker = {};

	const gtmMapKeys = (eventData) => {
		const keys = [
			'method',
			'validation-error'
		];

		eventData = eventData || {};

		return keys.filter((key) => eventData[key]).reduce((object, key) => {
			object[key] = eventData[key];
			return object;
		}, {});
	};

	const gtm = (() => {
		let dataLayer = [];

		/* istanbul ignore if */
		if(isClientSide()) {
			dataLayer = window.dataLayer;
		}

		return dataLayer;
	})();

	gtmTracker.createEvent = (eventName, eventData) => {
		const formattedData = Object.assign({
			event: eventName
		}, gtmMapKeys(eventData));

		gtm.push(formattedData);
		return gtmTracker;
	};

	return gtmTracker;
};
