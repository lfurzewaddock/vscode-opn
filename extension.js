'use strict';

var fs = require('fs');
var path = require('path');
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

		if (!editor || !editor.document.uri) {
      vscode.window.showInformationMessage('No active editor or URI available');
      return;
    }

		openFileWithOptions(editor);

	};

  var openFile = function openFile(filePath) {

		if (filePath) {

			var ext = path.extname(filePath);
			var filename = path.basename(filePath, ext);

			vscode.window.showTextDocument({
				fileName: filename,
				uri: vscode.Uri.parse('file:///' + filePath)
			}).then(activeEditor);

		} else {
    	var editor = vscode.window.activeTextEditor;
			activeEditor(editor);
		}
  };

	var normalizePath = function normalizePath(dir) {

    if (process.platform === 'win32') {
			dir = dir.replace(/\\/g, '/');
    }
    return dir;

	};

	var verifyFileFromPath = function verifyFileFromPath(path) {

    var dir = fs.statSync(path);
    path = normalizePath(path);

    if (dir.isFile()) {
			return path;
    } else {
			return null;
		}

	};

  var disposable = vscode.commands.registerCommand('extension.opn', function openUriAnonFn(uri) {

		var same = false;
		var filePath = null;
		var active = vscode.window.activeTextEditor;

		if (active) {
			same = vscode.window.activeTextEditor.document.uri.fsPath === uri.fsPath;
		}

		if (uri && !same) {
			filePath = verifyFileFromPath(uri.fsPath);
		}		

    try {
      openFile(filePath);
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
