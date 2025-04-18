/**
 * @typedef {Object} JsonToJsOptions
 * @property {boolean} [singleQuotes=true] - Use single quotes instead of double
 * @property {boolean} [multiline=false] - Format output across multiple lines
 * @property {boolean} [insertSpaces=true] - use spaces instead of tabs
 * @property {number} [indentSize=2] - Number of spaces to use for indentation
 * @property {number} [baseLevel=0] - Starting level to use for indentation
 * currentIndentLevel
 */

const RESERVED_WORDS = new Set([
  'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger',
  'default', 'delete', 'do', 'else', 'export', 'extends', 'finally',
  'for', 'function', 'if', 'import', 'in', 'instanceof', 'new',
  'return', 'super', 'switch', 'this', 'throw', 'try', 'typeof',
  'var', 'void', 'while', 'with', 'yield', 'enum', 'await', 'implements',
  'interface', 'let', 'package', 'private', 'protected', 'public', 'static'
]);

const SAFE_KEY_RE = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;

/**
 * Converts a JSON-parsed value into JavaScript code with unquoted keys (when valid),
 * and string values using either single or double quotes, and optional formatting rules.
 *
 * @param {any} value - Parsed JSON value
 * @param {JsonToJsOptions} [options={}] - Formatting options
 * @returns {string} - JavaScript object string
 */
function jsonToJs(value, options) {
  const {
    singleQuotes = true,
    multiline = true,
    insertSpaces = true,
    indentSize = 2,
    baseLevel =0
  } = options || {};

  const newline = multiline ? '\n' : '';
  const quote = singleQuotes ? '\'' : '"';
  const escapeQuote = singleQuotes ? /'/g : /"/g;


  function indent(level) {
    if (!multiline) return '';

    return insertSpaces
      ? ' '.repeat(indentSize * level)
      : '\t'.repeat(level);
  }

  /**
   * Escapes string values properly.
   * @param {string} str
   */
  const escapeString = (str) => quote + str.replace(/\\/g, '\\\\').replace(escapeQuote, '\\' + quote) + quote;

  /**
   * Determines if an object key can be safely unquoted.
   * @param {string} key
   */
  const isSafeKey = (key) => SAFE_KEY_RE.test(key) && !RESERVED_WORDS.has(key);

  /**
   * Recursively formats the value as JavaScript source code.
   * @param {any} val
   * @param {number} level
   */
  function format(val, level) {
    if (typeof val === 'string') {
      return escapeString(val);
    }

    if (typeof val === 'number' || typeof val === 'boolean' || val === null) {
      return String(val);
    }

    if (Array.isArray(val)) {
      const items = val.map(v => format(v, level + 1));
      return `[${newline}${items.map(i => indent(level + 1) + i).join(`,${newline}`)}${newline}${indent(level)}]`;
    }

    if (typeof val === 'object') {
      const entries = Object.entries(val).map(([key, v]) => {
        const formattedKey = isSafeKey(key) ? key : escapeString(key);
        const valueStr = format(v, level + 1);
        return `${indent(level + 1)}${formattedKey}: ${valueStr}`;
      });
      return `{${newline}${entries.join(`,${newline}`)}${newline}${indent(level)}}`;
    }

    return 'undefined';
  };

  return format(value, baseLevel);
}

module.exports = {
  jsonToJs
};
