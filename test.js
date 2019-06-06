const { describe, it } = require('mocha');
const assume = require('assume');
const timbers = require('./');

describe('timbers', function () {
  it('is a function', function () {
    assume(timbers).is.a('function');
  });

  it('merges short flags with long flags', function () {
    const argh = { r: 'foo' };
    const result = timbers(['-r, --require'], argh);

    assume(result).is.a('object');
    assume(result).is.length(2);

    assume(result.r).equals('foo');
    assume(result.require).equals('foo');
  });

  it('merges argh with the result', function () {
    const argh = { r: 'foo', bar: 'waddup', c: true };
    const result = timbers([
      '-r, --require',
      '-c, --clean'
    ], argh);

    assume(result).is.a('object');
    assume(result).is.length(5);

    assume(result.r).equals('foo');
    assume(result.require).equals('foo');
    assume(result.c).is.true();
    assume(result.clean).is.true();
    assume(result.bar).equals('waddup');
  });

  it('does not modify the original argh object', function () {
    const argh = { r: 'foo', bar: 'waddup', c: true };
    const result = timbers([
      '-r,--require',
      '-c --clean'
    ], argh);

    assume(result).is.a('object');
    assume(result).is.length(5);

    assume(result).does.not.equal(argh);
    assume(argh).is.length(3);
  });

  it('ignores undefined flags', function () {
    const argh = { r: 'foo' };
    const result = timbers([
      '-d, --what'
    ], argh);

    assume(result).is.a('object');
    assume(result).is.length(1);
    assume(result.r).equals('foo');
  });

  it('overrides the supplied values', function () {
    const argh = { r: 'foo', require: 'waddup' };
    const result = timbers([
      '-r, --require'
    ], argh);

    assume(result).is.a('object');
    assume(result).is.length(2);

    assume(result.r).equals('foo');
    assume(result.require).equals('foo');
  });
});
