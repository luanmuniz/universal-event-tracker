'use strict';

var _require = require('../lib/utils');

var Maybe = _require.Maybe;
var isClientSide = _require.isClientSide;
var is = _require.is;


var isValidEvent = function isValidEvent(eventName) {
	var events = ['ViewContent', 'Search', 'AddToCart', 'AddToWishlist', 'InitiateCheckout', 'AddPaymentInfo', 'Purchase', 'Lead', 'CompleteRegistration'];
	return events.find(function (e) {
		return e === eventName;
	});
};

var getMetaData = function getMetaData(metadata) {
	if (metadata && metadata.value) {
		return {
			value: metadata.value,
			currency: metadata.currency || 'BRL'
		};
	}

	return;
};

// Facebook Tracker

module.exports = function () {
	var facebookTracker = {};
	var facebook = function () {
		var fbq = function fbq() {
			return '';
		};

		/* istanbul ignore if */
		if (isClientSide()) {
			fbq = window.fbq;
		}
		return fbq;
	}();

	var areAllFieldsOk = function areAllFieldsOk(fbFields) {
		if (!fbFields || !is('object', fbFields)) {
			return false;
		}

		return true;
	};

	facebookTracker.createEvent = function (eventName, eventData) {
		if (isValidEvent(eventName) && areAllFieldsOk(eventData)) {
			var metadata = getMetaData(eventData.metadata);
			fbq('track', eventName, metadata);
		}

		return facebookTracker;
	};

	return facebookTracker;
};