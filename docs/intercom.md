# Intercom tracker

Import the universal event tracker:

```js
const eventTracker = require('universal-event-tracker');
```

### Client side

Import the intercom tracker:

```js
const intercom = require('universal-event-tracker/trackers/intercom');
```

Configure the tracker:

```js
const intercomTracker = intercom({
	appId: '123'
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
const tracker = eventTracker(intercomTracker, <otherTracker>);

tracker.createEvent('eventName', {
	label: 'Product Name',
	value: 100
});
```
