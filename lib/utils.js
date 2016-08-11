'use strict';

/* istanbul ignore next */
module.exports = {
	Maybe: (option) => option || undefined,

	isClientSide: () => !!(typeof window !== 'undefined' && window.document && window.document.createElement),

	intercomCreatedAt: () => Math.round((new Date()).getTime() / 1000),

	mapKeys: (objectKeys, objectAllProperties, initialObject) => (
		Object.keys(objectKeys).reduce((acc, key) => {
			acc[objectKeys[key]] = objectAllProperties[key];
			return acc;
		}, initialObject || {})
	),

	is: (elementType, element) => {
		const lower = elementType.toLowerCase();
		const type = lower[0].toUpperCase() + lower.slice(1);

		return Object.prototype.toString.call(element) === `[object ${type}]`;
	}
};
