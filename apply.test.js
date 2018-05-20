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

test('supports constants', function () {
  expect(apply('such much', ['doge', 'wow'])).toBe('such much')
  expect(apply('such much', [Promise.resolve('doge'), 'wow'])).resolves.toBe('such much')
  expect(apply('such much', ['doge', Promise.resolve('wow')])).resolves.toBe('such much')
  expect(apply('such much', [Promise.resolve('doge'), Promise.resolve('wow')])).resolves.toBe('such much')
  expect(apply('such much', Promise.resolve(['doge', 'wow']))).resolves.toBe('such much')
})

test('curried', function () {
  const concatApplicator = apply(concat)
  expect(concatApplicator(['doge', 'wow'])).toBe('dogewow')
  expect(concatApplicator([Promise.resolve('doge'), 'wow'])).resolves.toBe('dogewow')
  expect(concatApplicator(['doge', Promise.resolve('wow')])).resolves.toBe('dogewow')
  expect(concatApplicator([Promise.resolve('doge'), Promise.resolve('wow')])).resolves.toBe('dogewow')
  expect(concatApplicator(Promise.resolve(['doge', 'wow']))).resolves.toBe('dogewow')
})
