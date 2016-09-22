'use strict';

var vscode = require('vscode');
var fileService = require('./libs/fileService');

var openController = (function openControllerIIFE() {

  var openFileWithOptions = function openFileWithOptionsAnonFn(activeTextEditor) {

    var config = vscode.workspace.getConfiguration('vscode-opn');

    if (config !== undefined && typeof config.perLang === 'object' && Object.keys(config.perLang).length > 0) {

      for (var i = 0, len = config.perLang.opnOptions.length; i < len; i++) {

        var opnOptionObj = config.perLang.opnOptions[i];

        if (activeTextEditor.document.languageId === opnOptionObj.forLang) {
          fileService.openFileLocation(fileService.getFileLocation(activeTextEditor, config, opnOptionObj), opnOptionObj);
          break;
        }

      }

    } else {
      fileService.openFileLocation(fileService.getFileLocation(activeTextEditor));
    }

  };

  var activeEditor = function activeEditor(editor) {
		
		if (editor && editor.document) {
			openFileWithOptions(editor);
    } else {
			editor = { document: editor };
			openFileWithOptions(editor);
    }

	};

  var openFile = function openFile(uri) {

		var editor = vscode.window.activeTextEditor;

		if (!editor && !fileService.isFile(uri)) {
			vscode.window.showInformationMessage('No active editor or URI available');
      return;
		}

		if (uri && fileService.isFile(uri)) {
			vscode.workspace.openTextDocument(uri).then(activeEditor);
		} else {
			activeEditor(editor);
		}

  };

  var disposable = vscode.commands.registerCommand('extension.opn', function openUriAnonFn(uri) {

    try {
      openFile(uri);
    }
    catch (error) {
      vscode.window.showInformationMessage('Error! Could not open file.');
      console.error(error.stack);
    }

  });

  var executeOpen = function executeOpenAnonFn() {
    var subscriptions = [];
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
