'use strict';

module.exports = {
	Maybe: (option) => option || undefined,
	isClientSide: typeof window !== 'undefined'
};
