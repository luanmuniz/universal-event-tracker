'use strict';

const { Maybe, isClientSide, is } = require('../lib/utils');

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

	const areAllFieldsOk = (gaFields) => {
		if(!gaFields || !is('object', gaFields)) {
			return false;
		}

		if(!gaFields.metadata) {
			return false;
		}

		if(!gaFields.metadata.label && !gaFields.metadata.value) {
			return false;
		}

		return true;
	};

	gaTracker.createEvent = (eventName, eventData) => {
		if(eventName && areAllFieldsOk(eventData)) {
			ga('send', {
				hitType: 'event',
				eventCategory: eventName,
				eventAction: Maybe(eventData.action),
				eventLabel: Maybe(eventData.metadata.label),
				eventValue: Maybe(eventData.metadata.value)
			});
		}

		return gaTracker;
	};

	return gaTracker;
};
