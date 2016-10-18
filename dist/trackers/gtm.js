'use strict';

var _require = require('../lib/utils');

var Maybe = _require.Maybe;
var isClientSide = _require.isClientSide;
var is = _require.is;

// Google Tag Manager Tracker

module.exports = function () {
	var gtmTracker = {};

	var gtmMapKeys = function gtmMapKeys(eventData) {
		var keys = ['method', 'validation-error'];

		eventData = eventData || {};

		return keys.filter(function (key) {
			return eventData[key];
		}).reduce(function (object, key) {
			object[key] = eventData[key];
			return object;
		}, {});
	};

	var gtm = function () {
		var dataLayer = [];

		/* istanbul ignore if */
		if (isClientSide()) {
			dataLayer = window.dataLayer;
		}

		return dataLayer;
	}();

	gtmTracker.createEvent = function (eventName, eventData) {
		var formattedData = Object.assign({
			event: eventName
		}, gtmMapKeys(eventData));

		gtm.push(formattedData);
		return gtmTracker;
	};

	return gtmTracker;
};