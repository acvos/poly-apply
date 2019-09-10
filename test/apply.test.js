const expect = require("expect")

const apply = require("../index.js")

const concat = function (x, y) { return x + y }

describe("apply()", function () {
  it('applies sync values', function () {
    expect(apply(concat, ['doge', 'wow'])).toBe('dogewow')
  })

  it('applies promised values', function () {
    expect(apply(concat, [Promise.resolve('doge'), 'wow'])).resolves.toBe('dogewow')
    expect(apply(concat, ['doge', Promise.resolve('wow')])).resolves.toBe('dogewow')
    expect(apply(concat, [Promise.resolve('doge'), Promise.resolve('wow')])).resolves.toBe('dogewow')
  })

  it('applies promise of values', function () {
    expect(apply(concat, Promise.resolve(['doge', 'wow']))).resolves.toBe('dogewow')
  })

  it('supports constants', function () {
    expect(apply('such much', ['doge', 'wow'])).toBe('such much')
    expect(apply('such much', [Promise.resolve('doge'), 'wow'])).resolves.toBe('such much')
    expect(apply('such much', ['doge', Promise.resolve('wow')])).resolves.toBe('such much')
    expect(apply('such much', [Promise.resolve('doge'), Promise.resolve('wow')])).resolves.toBe('such much')
    expect(apply('such much', Promise.resolve(['doge', 'wow']))).resolves.toBe('such much')
  })

  it('curried', function () {
    const concatApplicator = apply(concat)
    expect(concatApplicator(['doge', 'wow'])).toBe('dogewow')
    expect(concatApplicator([Promise.resolve('doge'), 'wow'])).resolves.toBe('dogewow')
    expect(concatApplicator(['doge', Promise.resolve('wow')])).resolves.toBe('dogewow')
    expect(concatApplicator([Promise.resolve('doge'), Promise.resolve('wow')])).resolves.toBe('dogewow')
    expect(concatApplicator(Promise.resolve(['doge', 'wow']))).resolves.toBe('dogewow')
  })
})