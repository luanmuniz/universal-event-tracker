'use strict';

var _require = require('../lib/utils');

var Maybe = _require.Maybe;
var isClientSide = _require.isClientSide;
var is = _require.is;

// Google Analytics Tracker

module.exports = function () {
	var gaTracker = {};
	var ga = function () {
		var GA = function GA() {
			return '';
		};

		/* istanbul ignore if */
		if (isClientSide()) {
			GA = window.ga;
		}
		return GA;
	}();

	var areAllFieldsOk = function areAllFieldsOk(gaFields) {
		if (!gaFields || !is('object', gaFields)) {
			return false;
		}

		if (!gaFields.metadata) {
			return false;
		}

		if (!gaFields.metadata.label && !gaFields.metadata.value) {
			return false;
		}

		return true;
	};

	gaTracker.createEvent = function (eventName, eventData) {
		if (eventName && areAllFieldsOk(eventData)) {
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