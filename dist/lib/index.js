'use strict';

module.exports = function eventTracker() {
	var tracker = {};
	var trackers = Array.prototype.slice.call(arguments);

	tracker.createEvent = function (eventName, eventData) {
		trackers.forEach(function (tk) {
			tk.createEvent(eventName, eventData);
		});
		return tracker;
	};

	return tracker;
};