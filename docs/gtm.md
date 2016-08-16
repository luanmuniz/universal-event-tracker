# Google Tag Manager tracker

> This tracker just works on client side.

Import the Google Tag Manager tracker:

```js
const gtmTracker = require('universal-event-tracker/trackers/gtm');
```

This tracker returns a function, and don't need any configuration. You can import and execute at the same time:

```js
const gtmTracker = require('universal-event-tracker/trackers/gtm')();
```

## Usage

Create event just for Google Tag Manager. Supported params:

- `eventName`;
- `method`;
- `validation-error`.

```js
gtmTracker.createEvent('eventName', {
	method: 'facebook',
	'validation-error': 'No email specified'
});
```

Create event for all trackers:

```js
// Import the universal event tracker:
const eventTracker = require('universal-event-tracker');

// Configure usage for trackers
const tracker = eventTracker(gtmTracker, <otherTracker>);

// Use `createEvent` method
tracker.createEvent('eventName', {
	method: 'facebook',
	'validation-error': 'No email specified'
});
```
