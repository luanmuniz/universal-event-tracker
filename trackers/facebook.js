'use strict';

const { Maybe, isClientSide, is } = require('../lib/utils');

const isValidEvent = (eventName) => {
	const events = [
		'ViewContent',
		'Search',
		'AddToCart',
		'AddToWishlist',
		'InitiateCheckout',
		'AddPaymentInfo',
		'Purchase',
		'Lead',
		'CompleteRegistration'
	];
	return events.find((e) => e === eventName);
};

const getMetaData = (metadata) => {
	if (metadata && metadata.value) {
		return {
			value: metadata.value,
			currency: metadata.currency || 'BRL'
		};
	}

	return;
};

// Facebook Tracker

module.exports = () => {
	const facebookTracker = {};
	const facebook = (() => {
		let fbq = () => '';

		/* istanbul ignore if */
		if(isClientSide()) {
			fbq = window.fbq || fbq;
		}
		return fbq;
	})();

	const areAllFieldsOk = (fbFields) => {
		if(!fbFields || !is('object', fbFields)) {
			return false;
		}

		return true;
	};

	facebookTracker.createEvent = (eventName, eventData) => {
		if(isValidEvent(eventName) && areAllFieldsOk(eventData)) {
			const metadata = getMetaData(eventData.metadata);
			facebook('track', eventName, metadata);
		}

		return facebookTracker;
	};

	return facebookTracker;
};
