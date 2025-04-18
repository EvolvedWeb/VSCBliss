const vscode = require('vscode');
const { jsonToJs } = require('../utils/jsonToJs');

/**
 * @param {vscode.TextEditor} editor
 * @param {vscode.TextEditorEdit} edit
 * @param {boolean} singleQuotes
 */
function convertJsonToJsObject(editor, edit, singleQuotes = true) {
  const config = vscode.workspace.getConfiguration('vscBliss');
  const multiline = config.get('format.multiline', false);

  const tabSize = Number(editor.options.tabSize);
  const insertSpaces = editor.options.insertSpaces === true;
  const indentSize = insertSpaces ? tabSize : 1;
  const document = editor.document;
  const selections = editor.selections;

  for (const selection of selections) {
    const range = selection.isEmpty
      ? document.lineAt(selection.start.line).range
      : selection;

    const rawText = document.getText(range);

    // Save leading and trailing whitespace
    const leadingWhitespace = rawText.match(/^\s*/)?.[0] ?? '';
    const trailingWhitespace = rawText.match(/\s*$/)?.[0] ?? '';
    const firstLineText = document.lineAt(range.start.line).text;
    const firstLineWhitespace = firstLineText.match(/^\s*/)?.[0] ?? '';
    const baseLevel = Math.floor(firstLineWhitespace.length / indentSize);
    console.log('--------------------------------------------------------------');
    console.log(`leadingWhitespace(${leadingWhitespace.length}) = '${leadingWhitespace}'`);
    console.log(`trailingWhitespace(${trailingWhitespace.length}) = '${trailingWhitespace}'`);
    console.log(`firstLineWhitespace(${firstLineWhitespace.length}) = '${firstLineWhitespace}'`);

    // Trim only the middle content
    let text = rawText.trim();

    try {
      const parsed = JSON.parse(text);
      const converted = jsonToJs(parsed, { singleQuotes, multiline, indentSize, insertSpaces,baseLevel });

      // Restore whitespace
      const finalOutput = leadingWhitespace + converted + trailingWhitespace;

      edit.replace(range, finalOutput);
    }
    catch (err) {
      vscode.window.showErrorMessage('VSCBliss: Invalid JSON input.');
    }
  }
}

function convertJsonToJsObjectSingle(editor, edit) {
  convertJsonToJsObject(editor, edit, true);
}

function convertJsonToJsObjectDouble(editor, edit) {
  convertJsonToJsObject(editor, edit, false);
}

module.exports = {
  convertJsonToJsObjectSingle,
  convertJsonToJsObjectDouble
};
