'use strict';

const { Maybe, isClientSide } = require('../lib/utils');

// Google Analytics Tracker

module.exports = () => {
	const gaTracker = {};
	const ga = (() => {
		let GA = () => '';

		/* istanbul ignore if */
		if(isClientSide) {
			GA = window.ga;
			window.ga = undefined;
		}

		return GA;
	})();

	gaTracker.createEvent = (eventName, eventData) => {
		if(eventName && eventData) {
			ga('send', {
				hitType: 'event',
				eventCategory: eventName,
				eventAction: Maybe(eventData.action),
				eventLabel: Maybe(eventData.label),
				eventValue: Maybe(eventData.value)
			});
		}

		return gaTracker;
	};

	return gaTracker;
};
