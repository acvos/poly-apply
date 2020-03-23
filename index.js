const curry = require('curry');

function isPromise(x) {
  return (x instanceof Promise);
}

module.exports = function apply(fn, args) {
  // constant
  if (!(fn instanceof Function)) {
    return fn;
  }
  
  // promised arguments
  if (isPromise(args)) {
    return args.then(function (xs) {
      return apply(fn, xs);
    });
  }

  // promise in arguments
  if (args.find(isPromise)) {
    return Promise.all(args).then(function (xs) {
      return apply(fn, xs);
    });
  }

  return fn.apply(undefined, args);
}
