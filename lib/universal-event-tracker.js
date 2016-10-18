'use strict';

module.exports = function eventTracker() {
	const tracker = {};
	const trackers = Array.prototype.slice.call(arguments);

	tracker.createEvent = (eventName, eventData) => {
		trackers.forEach((tk) => {
			tk.createEvent(eventName, eventData);
		});
		return tracker;
	};

	return tracker;
};
