# universal-event-tracker

> A universal event tracker for analytcs

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
