'use strict';

var vscode = require('vscode');
var fileService = require('./libs/fileService');

var openController = (function openControllerIIFE() {

  var openFileWithOptions = function openFileWithOptionsAnonFn(document) {

    var config = vscode.workspace.getConfiguration('vscode-opn');

    if (config !== undefined && typeof config.perLang === 'object' && Object.keys(config.perLang).length > 0) {

      var success = false;
      var defaultOptions;
      for (var i = 0, len = config.perLang.opnOptions.length; i < len; i++) {

        var opnOptionObj = config.perLang.opnOptions[i];

        if (document.languageId === opnOptionObj.forLang) {

          fileService.openFileLocation(fileService.getFileLocation(document, config, opnOptionObj), opnOptionObj);
          success = true;
          break;

        } else if (opnOptionObj.forLang === 'default') {
          defaultOptions = opnOptionObj;
        }

      }
      if (!success) {
        fileService.openFileLocation(fileService.getFileLocation(document, config, defaultOptions), defaultOptions);
      }

    } else {

      fileService.openFileLocation(fileService.getFileLocation(document));
    }

  };

  var openFile = function openUriAnonFn(uri) {

    var editor = vscode.window.activeTextEditor;

    if (!editor && !uri.fsPath) {

      vscode.window.showInformationMessage('No active editor or URI available');
      return;

    } else {

      if (uri.fsPath && editor.document.uri.fsPath !== uri.fsPath) {

        vscode.workspace.openTextDocument(uri).then(function (document) {
          openFileWithOptions(document);
        });

      } else {

        openFileWithOptions(editor.document);

      }

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

