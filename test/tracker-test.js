'use strict';

const test = require('tape');
const expect = require('chai').expect;
const tracker = require('../lib/index');
const intercom = require('../trackers/intercom');
const ga = require('../trackers/ga');
const gtm = require('../trackers/gtm');

const intercomServer = require('../trackers/server/intercom');
const config = require('./helpers/config');
const { intercomCreatedAt } = require('../lib/utils');

test('Test tracker method', (assert) => {
	expect(tracker).to.be.a('function');
	expect(intercom).to.be.a('function');
	expect(ga).to.be.a('function');
	expect(intercomServer).to.be.a('function');
	assert.end();
});

test('Throw error if call createEvent and dont create an user before', (assert) => {
	const intercomTrackerServer = intercomServer({
		appId: config.appId,
		apiKey: config.apiKey
	});

	intercomTrackerServer.createEvent('rejectedEvent').catch((errorResult) => {
		expect(errorResult).to.be.equal('You just need to pass a valid email or userId');
		assert.end();
	});
});

test('Create user and send event', (assert) => {
	const intercomTrackerServer = intercomServer({
		appId: config.appId,
		apiKey: config.apiKey
	});

	intercomTrackerServer.createUser({
		userId: '393039',
		email: 'john@doe.com',
		name: 'John Doe'
	});

	intercomTrackerServer.createEvent(`testEvent - ${intercomCreatedAt()}`, {
		email: 'john@doe.com',
		metadata: {
			name: 'just john doe'
		}
	});

	intercomTrackerServer.createUser({
		userId: '291029',
		email: 'senado@lheira.com',
		name: 'Senado Federal'
	});

	intercomTrackerServer.createEvent(`testEvent - ${intercomCreatedAt()}`, {
		email: 'john@doe.com',
		metadata: {
			name: 'just john doe'
		}
	});

	intercomTrackerServer.createEvent(`test - ${intercomCreatedAt()}`, {
		metadata: {
			eventFor: 'last created user'
		}
	});

	expect(intercomTrackerServer).to.have.any.keys('createEvent', 'createUser');
	assert.end();
});

test('Intercom tracker (client side) test', (assert) => {
	const intercomTracker = intercom({
		appId: config.appId
	});

	// logged-out user
	intercomTracker.update();

	// logged-in user
	intercomTracker.update({
		name: 'John Doe',
		email: 'john@doe.com',
		userId: 'anonymous'
	});

	intercomTracker.shutdown();

	expect(intercomTracker).to.have.all.keys('createEvent', 'update', 'shutdown');
	assert.end();
});

test('GA Tracker (client side) test', (assert) => {
	const gaTracker = ga();

	gaTracker.createEvent('eventError');

	gaTracker.createEvent('eventError', {
		action: 'click'
	});

	gaTracker.createEvent('eventError', {
		action: 'click',
		metadata: {
			label: 'Any label'
		}
	});

	gaTracker.createEvent('eventError', {
		action: 'click',
		metadata: {
			value: 'Any value'
		}
	});

	gaTracker.createEvent('eventError', {
		action: 'click',
		metadata: {
			url: 'http://sales.com'
		}
	});

	expect(gaTracker).to.have.property('createEvent');
	assert.end();
});

test('GTM Tracker (client side)', (assert) => {
	const gtmTracker = gtm();

	gtmTracker
		.createEvent('event-test')
		.createEvent('another-event', {
			method: 'facebook',
			'validation-error': 'Not authorized'
		});

	expect(gtmTracker).to.have.property('createEvent');
	assert.end();
});

test('All trackers (client side)', (assert) => {
	const intercomTracker = intercom({
		appId: config.appId
	});
	const gaTracker = ga();
	const gtmTracker = gtm();
	const eventTracker = tracker(intercomTracker, gaTracker, gtmTracker);

	eventTracker.createEvent('store_purchase', {
		action: 'click',
		metadata: {
			value: 10,
			label: 'Product Name',
			url: 'http://www.url.com'
		},
		method: 'facebook',
		'validation-error': 'Not authorized'
	});

	expect(eventTracker).to.have.property('createEvent');
	assert.end();
});
