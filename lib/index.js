'use strict';

const tracker = require('./tracker');

tracker.intercom = require('./trackers/intercom');
tracker.ga = require('./trackers/ga');

module.exports = tracker;
