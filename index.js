const curry = require('curry');

function isPromise(x) {
  return (x instanceof Promise);
}

function apply(fn, to) {
  // constant
  if (!(fn instanceof Function)) {
    return fn;
  }
  
  // promised arguments
  if (isPromise(to)) {
    return to.then(function (xs) {
      return apply(fn, xs);
    });
  }
  
  // accept one direct argument
  if (!(to instanceof Array)
      return [to];

  // promise in arguments
  if (to.find(isPromise)) {
    return Promise.all(to).then(function (xs) {
      return apply(fn, xs);
    });
  }

  return fn.apply(undefined, to);
}

module.exports = curry(apply);
