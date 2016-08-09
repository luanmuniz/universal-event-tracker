'use strict';

module.exports = (...trackers) => {
	const tracker = {};

	tracker.createEvent = (eventName, eventData) => {
		trackers.forEach((tk) => {
			tk.createEvent(eventName, eventData);
		});
		return tracker;
	};

	return tracker;
};
