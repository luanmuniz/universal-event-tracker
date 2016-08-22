'use strict';

/* istanbul ignore next */
module.exports = {
	Maybe(option) {
		return option || undefined;
	},

	isClientSide() {
		return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	},

	intercomCreatedAt() {
		return Math.round((new Date()).getTime() / 1000);
	},

	mapKeys(objectKeys, objectAllProperties, initialObject) {
		return Object.keys(objectKeys).reduce(function(acc, key) {
			acc[objectKeys[key]] = objectAllProperties[key];
			return acc;
		}, initialObject || {});
	},

	is(elementType, element) {
		var lower = elementType.toLowerCase(),
			type = lower[0].toUpperCase() + lower.slice(1);

		return Object.prototype.toString.call(element) === `[object ${type}]`;
	}
};
