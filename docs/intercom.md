# Intercom tracker

### Client side

Import the intercom tracker:

```js
const intercom = require('universal-event-tracker/trackers/intercom');
```

Configure the tracker:

```js
const intercomTracker = intercom({
	appId: '123', // required
	name: 'John Doe', // optional
	email: 'john@doe.com' // optional
});
```

If user is logged in, you can update tracker:

```js
intercomTracker.update({
	name: 'John Doe',
	email: 'john@doe.com'
});
```


### Server side

Import the intercom tracker:

```js
const intercom = require('universal-event-tracker/trackers/server/intercom');
```

Configure the tracker:

```js
const intercomTracker = intercom({
	appId: '123', // required
	apiKey: '456', // required
	name: 'John Doe', // optional
	email: 'john@doe.com', // optional
	userId: '0123', // optional
});
```

On server side, `intercomTracker` has an property `intercomTracker.intercomIO`, that returns all methods for [`intercom.io` package](https://github.com/tarunc/intercom.io) instance.

## Usage

Create event just for intercom:

```js
intercomTracker.createEvent('eventName', {
	label: 'Product Name',
	value: 100
});
```

Create event for all trackers:

```js
// Import the universal event tracker:
const eventTracker = require('universal-event-tracker');

// Configure usage for trackers
const tracker = eventTracker(intercomTracker, <otherTracker>);

// Use `createEvent` method
tracker.createEvent('eventName', {
	label: 'Product Name',
	value: 100
});
```
