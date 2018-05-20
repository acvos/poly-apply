var flatten = require('array-flatten')

function isPromise(x) {
  return (x instanceof Promise)
}

function apply(f, args) {
  if (typeof f !== 'function') {
    return f
  }

  if (isPromise(args)) {
    return args.then(function (xs) {
      return apply(f, xs)
    })
  }

  if (args.find(isPromise)) {
    return Promise.all(args).then(function (xs) {
      return f.apply(undefined, xs)
    })
  }

  return f.apply(undefined, args)
}

module.exports = apply
