# poly-apply
[![Build Status](https://travis-ci.org/acvos/poly-apply.svg?branch=master)](https://travis-ci.org/acvos/poly-apply)
Polymorhic curried functional applicator

## Motivation
Removing the difference between Promises and syncronous function arguments greatly simplifies tool-building

## Features
- Seamlessly applies functions to promises and synchronous values
- Supports functions of one or many arguments

## Installation

```
npm install poly-apply
```

## Usage

```javascript
import apply from 'poly-apply'

const wow = (x, y) => `wow ${x} ${y}!`

console.log(apply(wow, ['such', 'doge']))
// -> wow such doge!

apply(wow, ['much', Promise.resolve('approve')]).then(console.log)
// -> wow much approve!

apply(wow, Promise.resolve(['very', 'such'])).then(console.log)
// -> wow very such!

```

## Testing

```
npm test
```
