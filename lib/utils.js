'use strict';

/* istanbul ignore next */
module.exports = {
	Maybe: (option) => option || undefined,
	isClientSide: !!(typeof window !== 'undefined' && window.document && window.document.createElement)
};
