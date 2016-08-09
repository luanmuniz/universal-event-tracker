# universal-event-tracker

> A universal event tracker for analytcs

[![Build Status][travis-image]][travis-url]
[![Coveralls Coverage Status][coverage-image]][coverage-url]
[![Code Climate Coverage][codeclimate-coverage-image]][codeclimate-coverage-url]
[![Code Climate][codeclimate-image]][codeclimate-url]
[![License][license-image]][license-url]

## Usage

```js
// First of all, add scripts for Analytics and/or Intercom on your code.
// Then, import universal event tracker:
const eventTracker = require('universal-event-tracker');

// Then, configure some tracker (or trackers):
const intercomTracker = eventTracker.intercom({
	appId: '123', // required
	name: 'John Doe', // optional
	email: 'john@doe.com' // optional
});

// After that, you can create some event:
intercomTracker.createEvent('eventName', { /* some data */ })

// If user is logged in, you can update tracker:
intercomTracker.update({
	name: 'John Doe',
	email: 'John Doe'
});

// You may configure another trackers:
const gaTracker = eventTracker.ga({ /* config */ })

// And, for using all trackers at the same time, just do it:
const tracker = eventTracker(intercomTracker, gaTracker);
tracker.createEvent('eventName', { /* some data */ });

// Specific options for Google Analytics, but can be used for others:
gaTracker.createEvent('eventName', { // eventName is "category"
	action: 'click', // or another action
	label: 'Product name',
	value: 100
});
```

## Scripts

### Development

- `npm run test:watch` - Run tests and watch all files

### Run once

- `npm run lint` - Check for lint errors on all files
- `npm run lint:fix` - Fix lint errors
- `npm test` - Run unit tests

### Deploy

- `npm version <version>` - Update project version

## License

[MIT][license-url] &copy; Zimp

[travis-image]: https://img.shields.io/travis/ZimpFidelidade/universal-event-tracker.svg?style=flat-square
[travis-url]: https://travis-ci.org/ZimpFidelidade/universal-event-tracker
[coverage-image]: https://img.shields.io/coveralls/ZimpFidelidade/universal-event-tracker/master.svg?style=flat-square
[coverage-url]: https://coveralls.io/r/ZimpFidelidade/universal-event-tracker?branch=master
[codeclimate-coverage-image]: https://img.shields.io/codeclimate/coverage/github/ZimpFidelidade/universal-event-tracker.svg?style=flat-square
[codeclimate-coverage-url]: https://codeclimate.com/github/ZimpFidelidade/universal-event-tracker
[codeclimate-image]: https://img.shields.io/codeclimate/github/ZimpFidelidade/universal-event-tracker.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/ZimpFidelidade/universal-event-tracker
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: https://zimp.mit-license.org/
