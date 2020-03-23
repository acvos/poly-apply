const curry = require('curry');

function isPromise(x) {
	return (x instanceof Promise);
}

function apply(fn, to) {
	// promised arguments
	if (isPromise(to)) {
		return to.then(function (xs) {
			return apply(fn, xs);
		});
	}

	// accept one direct argument
	if (!(to instanceof Array)){
		to = [to];
	}

	// promise in arguments
	if (to.find(isPromise)) {
		return Promise.all(to).then(function (xs) {
			return apply(fn, xs);
		});
	}
	
	// constant
 	if (!(fn instanceof Function)) {
		return fn;
	}

	return fn.apply(undefined, to);
}

module.exports = curry(apply);
