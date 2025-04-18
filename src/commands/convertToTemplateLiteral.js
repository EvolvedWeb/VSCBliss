const vscode = require('vscode');
const { convertConcatenationToTemplateLiteral } = require('../utils/convertToTemplateLiteral');

/**
 * Command: Convert selected concatenated string to template literal
 *
 * @param {vscode.TextEditor} editor
 * @param {vscode.TextEditorEdit} editBuilder
 */
function convertToTemplateLiteral(editor, editBuilder) {
  const document = editor.document;
  const selections = editor.selections;

  for (const selection of selections) {
    const range = selection.isEmpty
      ? document.lineAt(selection.start.line).range
      : selection;

    const text = document.getText(range);
    const converted = convertConcatenationToTemplateLiteral(text);

    if (converted !== text) {
      editBuilder.replace(range, converted);
    }
    else {
      vscode.window.showInformationMessage('No conversion performed.');
    }
  }
}


module.exports = {
  convertToTemplateLiteral
};