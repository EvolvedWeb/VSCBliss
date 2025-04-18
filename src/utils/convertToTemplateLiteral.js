/**
 * Converts a JavaScript string concatenation expression into a template literal.
 *
 * For example: `"Hello " + name + "!"` becomes `` `Hello ${name}!` ``
 *
 * @param {string} input
 * @returns {string} Template literal string (or original input if not valid)
 */
function convertConcatenationToTemplateLiteral(input) {
  if (typeof input !== 'string' || !input.includes('+')) {
    return input;
  }

  try {
    const parts = input.split('+').map(part => part.trim());
    let result = '`';

    for (const part of parts) {
      if (/^(['"`])(.*)\1$/.test(part)) {
        // String literal: strip quotes and unescape
        const unquoted = part.slice(1, -1).replace(/\\(["'`])/g, '$1');
        result += unquoted;
      }
      else {
        result += '${' + part + '}';
      }
    }

    result += '`';
    return result;
  }
  // eslint-disable-next-line no-unused-vars
  catch (err) {
    return input;
  }
}

module.exports = {
  convertConcatenationToTemplateLiteral
};
