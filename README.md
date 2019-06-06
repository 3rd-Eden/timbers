# timbers

Argh! Shiver me timbers. The `timbers` library is a natural extension to `argh`.
It allows you to easily transform short hand CLI flags into their long hand
counter parts.

## Installation

The package is published to npm and can be installed by running:

```
npm install --save timbers
```

## Usage

```js
const timbers = require('timbers');
const argh = require('argh');

const defaults = {
  cwd: process.cwd().
  foo: 'bar'
};

const args = timbers([
  '-c, --cwd'
], { ...defaults, ...argh.argv });

console.log(args);

//
// { cwd: process.cwd(), foo: 'bar' }   // No values passed
// { cwd: 'bar', foo: 'bar' }           // -c bar
// { cwd: 'bar', foo: 'bar' }           // --cwd bar
//
```

While the library was designed with [argh] in mind, it will work with any
object. It accepts the following arguments:

- `flags`, **Array**, An array of strings that contain the mapping of short to
  long flags. For example: `-r, --require`. You can also map multiple short
  flags to a long flag: `-r, -e, --require`.
- `arg`, **Object**, Object with values that should be used as data source.

## License

[MIT](LICENSE)
[argh]: https://github.com/3rd-Eden/argh#readme
