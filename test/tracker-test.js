'use strict';

const test = require('tape');
const expect = require('chai').expect;
const tracker = require('../lib/index');
const intercom = require('../trackers/intercom');
const ga = require('../trackers/ga');

const intercomServer = require('../trackers/server/intercom');
const config = require('./helpers/config');

test('Test tracker method', (assert) => {
	expect(tracker).to.be.a('function');
	expect(intercom).to.be.a('function');
	expect(ga).to.be.a('function');
	expect(intercomServer).to.be.a('function');
	assert.end();
});

test('Test trackers', (assert) => {
	const intercomTracker = intercom({
		appId: config.appId
	});

	const intercomTrackerServer = intercomServer({
		appId: config.appId,
		apiKey: config.apiKey
	});

	const gaTracker = ga();
	const eventTracker = tracker(intercomTracker, gaTracker);

	intercomTracker.update({
		name: 'John Doe',
		email: 'john@doe.com'
	});

	gaTracker.createEvent('eventError');

	eventTracker.createEvent('store_purchase', {
		action: 'click',
		value: 10,
		label: 'Product Name',
		url: 'http://www.url.com'
	});

	intercomTrackerServer.createEvent('testEvent', {
		action: 'someAction',
		value: 10,
		label: 'Product Name',
		url: 'http://www.url.com'
	});

	expect(gaTracker).to.have.property('createEvent');
	expect(intercomTracker).to.have.all.keys('createEvent', 'update');
	expect(eventTracker).to.have.property('createEvent');
	assert.end();
});
