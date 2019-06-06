/**
 * Pre-cached regular expressons.
 *
 * @type {Object}
 * @private
 */
const regexp = {
  split: /[\s\,]+?/,
  prefix: /^[\-]+?/
};

/**
 * Transform short cli flags, into their long cli flag pairs.
 *
 * @param {Array} flags Array that contains the various flags to normalize.
 * @param {Object} argh Parsed flags, defaults, or what even we need to as value.
 * @returns {Object} Object with the flags assigned.
 * @public
 */
function timbers(flags, argh) {
  return Object.assign({}, argh, flags.reduce(function reduced(result, flag) {
    let long;

    flag.split(regexp.split)
    .filter(Boolean)
    .filter(function filter(value) {
      const match = value.slice(0, 2) === '--';

      if (match) long = value.slice(2);
      return !match;
    }).map(function clean(value) {
      return value.replace(regexp.prefix, '');
    }).forEach(function each(value) {
      if (long && value in argh) {
        result[long] = argh[value];
      }
    });

    return result;
  }, {}));
}

//
// Return the interface.
//
module.exports = timbers;
