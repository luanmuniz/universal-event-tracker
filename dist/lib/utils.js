'use strict';

/* istanbul ignore next */

module.exports = {
	Maybe: function Maybe(option) {
		return option || undefined;
	},

	isClientSide: function isClientSide() {
		return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	},

	intercomCreatedAt: function intercomCreatedAt() {
		return Math.round(new Date().getTime() / 1000);
	},

	mapKeys: function mapKeys(objectKeys, objectAllProperties, initialObject) {
		return Object.keys(objectKeys).reduce(function (acc, key) {
			acc[objectKeys[key]] = objectAllProperties[key];
			return acc;
		}, initialObject || {});
	},

	is: function is(elementType, element) {
		var lower = elementType.toLowerCase();
		var type = lower[0].toUpperCase() + lower.slice(1);

		return Object.prototype.toString.call(element) === '[object ' + type + ']';
	}
};