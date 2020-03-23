const curry = require('curry');

function isPromise(value) {
	return (value instanceof Promise);
}

function apply(fn, to) {
	// promised arguments
	if (isPromise(to)) {
		return to.then(function (newArgs) {
			return apply(fn, newArgs);
		});
	}

	// accept one direct argument
	if (!(to instanceof Array)){
		to = [to];
	}

	// promise in arguments
	if (to.find(isPromise)) {
		return Promise.all(to).then(function (newArgs) {
			return apply(fn, newArgs);
		});
	}
	
	// constant
 	if (!(fn instanceof Function)) {
		return fn;
	}

	return fn.apply(undefined, to);
}

module.exports = curry(apply);
