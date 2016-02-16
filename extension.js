'use strict';

var vscode = require('vscode');
var opn = require('opn');

var openController = (function openControllerIIFE() {

  var subscriptions = [];
  var editor = null;

  var openUri = function openUriAnonFn() {

    editor = vscode.window.activeTextEditor;
    if (!editor || !editor.document.uri) {
      vscode.window.showInformationMessage('No active editor or URI available');

      return;
    }

    // Bug workaround: https://github.com/Microsoft/vscode/issues/2990
    if (editor.document.uri.scheme.toString() === 'file') {
      opn('file://' + editor.document.uri.path.toString());
    } else {
      opn(editor.document.uri.toString());
    }
  };

  var disposable = vscode.commands.registerCommand('extension.opn', function openUriAnonFn() {

    try {
      openUri();
    }
    catch (error) {
      vscode.window.showInformationMessage('Error! Could not open file.');
      console.error(error.stack);
    }
  });

  var executeOpen = function executeOpenAnonFn() {

    subscriptions.push(disposable);
  };

  return {
    executeOpen: executeOpen,
  };

})();

function activate(context) {

  var controller = openController.executeOpen();
  context.subscriptions.push(controller);
}

exports.activate = activate;

function deactivate() {
}

exports.deactivate = deactivate;
