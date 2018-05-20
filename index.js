var curry = require('curry')

function isPromise(x) {
  return (x instanceof Promise)
}

function apply(f, args) {
  if (isPromise(args)) {
    return args.then(function (xs) {
      return apply(f, xs)
    })
  }

  if (args.find(isPromise)) {
    return Promise.all(args).then(function (xs) {
      return apply(f, xs)
    })
  }

  if (typeof f !== 'function') {
    return f
  }

  return f.apply(undefined, args)
}

module.exports = curry(apply)
