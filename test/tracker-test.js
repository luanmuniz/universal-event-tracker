'use strict';

const test = require('tape');
const expect = require('chai').expect;
const tracker = require('../lib/index');

test('Test tracker method', (assert) => {
	expect(tracker).to.be.a('function');
	expect(tracker()).to.be.equal('tracker');
	expect(tracker.intercom).to.be.equal('intercom');
	expect(tracker.ga).to.be.equal('ga');
	assert.end();
});
