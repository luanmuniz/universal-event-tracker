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
	email: 'john@doe.com', // optional
	userId: 'abc' // optional
});
```

If user is logged in, you can update tracker:

```js
intercomTracker.update({
	name: 'John Doe',
	email: 'john@doe.com', // required, if no userId is supplied
	userId: 'abc' // required, if no email is supplied
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
	apiKey: '456' // required
});
```

Create some user:

```js
intercomTracker.createUser({
	userId: '123', // required if no email is supplied
	email: 'john@doe.com', // required if no userId is supplied
	name: 'John Doe' // optional
});
```

On server side, `intercomTracker` has an property `intercomTracker.intercomIO`, that returns all methods for [`intercom.io` package](https://github.com/tarunc/intercom.io) instance.

## Usage

Create event just for intercom:

```js
intercomTracker.createEvent('eventName', {
	email: 'john@doe.com',
	userId: '123',
	metadata: {
		label: 'Product Name',
		value: 100
	}
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
	email: 'john@doe.com',
	userId: '123',
	metadata: {
		label: 'Product Name',
		value: 100
	}
});
```

**Note:** If you are sending event for the same user created with `createUser` method, `userId` and `email` are both optional.
But, if you can send an event for another user, and the user is already created, you can pass `email` or `userId` inside `createEvent` method.
