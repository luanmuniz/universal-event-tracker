# Google Analytics tracker

> This tracker just works on client side.

Import the Google Analytics tracker:

```js
const gaTracker = require('universal-event-tracker/trackers/ga');
```

This tracker returns a function, and don't need any configuration. You can import and execute at the same time:

```js
const gaTracker = require('universal-event-tracker/trackers/ga')();
```

## Usage

Create event just for Google Analytics:

```js
gaTracker.createEvent('eventName', { // eventName is "category"
	action: 'click', // or another action
	label: 'Product name',
	value: 100
});
```

Create event for all trackers:

```js
// Import the universal event tracker:
const eventTracker = require('universal-event-tracker');

// Configure usage for trackers
const tracker = eventTracker(gaTracker, <otherTracker>);

// Use `createEvent` method
tracker.createEvent('eventName', {
	action: 'click',
	label: 'Product Name',
	value: 100
});
```
