// @ts-check
const vscode = require('vscode');
const { convertToTemplateLiteral } = require('./commands/convertToTemplateLiteral');
const { convertJsonToJsObjectSingle, convertJsonToJsObjectDouble } = require('./commands/convertJsonToJsObject');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand(
      'vscBliss.convertToTemplateLiteral',
      convertToTemplateLiteral
      /*
      */
    ),
    vscode.commands.registerTextEditorCommand(
      'vscBliss.jsonToJsSingle',
      convertJsonToJsObjectSingle
    ),
    vscode.commands.registerTextEditorCommand(
      'vscBliss.jsonToJsDouble',
      convertJsonToJsObjectDouble
    )
  );
}

function deactivate() { }

module.exports = {
  activate,
  deactivate
};
