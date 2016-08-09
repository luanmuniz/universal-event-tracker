'use strict';

const test = require('tape');
const expect = require('chai').expect;
const tracker = require('../lib/index');

test('Test tracker method', (assert) => {
	expect(tracker).to.be.a('function');
	expect(tracker.intercom).to.be.a('function');
	expect(tracker.ga).to.be.a('function');
	assert.end();
});

test('Test trackers', (assert) => {
	const intercomTracker = tracker.intercom({
		appId: 'd3bvrtmw'
	});

	const gaTracker = tracker.ga({ /* ga data */});
	const eventTracker = tracker(intercomTracker, gaTracker);

	console.log('\n\n\ngaTracker', gaTracker);
	console.log('\n\n\nintercomTracker', intercomTracker);
	console.log('\n\n\neventTracker', eventTracker);

	intercomTracker.update({
		name: 'John Doe',
		email: 'john@doe.com'
	});

	eventTracker.createEvent('store_purchase', {
		price: 10,
		name: 'Product Name',
		url: 'http://www.url.com'
	});
	expect(gaTracker).to.have.property('createEvent');
	expect(intercomTracker).to.have.all.keys('createEvent', 'update');
	expect(eventTracker).to.have.property('createEvent');
	assert.end();
});
