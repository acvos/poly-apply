const apply = require("./index.js")

const concat = function (x, y) { return x + y }

test('applies sync values', function () {
  expect(apply(concat, ['doge', 'wow'])).toBe('dogewow')
})

test('applies promised values', function () {
  expect(apply(concat, [Promise.resolve('doge'), 'wow'])).resolves.toBe('dogewow')
  expect(apply(concat, ['doge', Promise.resolve('wow')])).resolves.toBe('dogewow')
  expect(apply(concat, [Promise.resolve('doge'), Promise.resolve('wow')])).resolves.toBe('dogewow')
})

test('applies promise of values', function () {
  expect(apply(concat, Promise.resolve(['doge', 'wow']))).resolves.toBe('dogewow')
})
