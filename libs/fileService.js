'use strict';

var vscode = require('vscode');
var opn = require('opn');
var path = require('path');
var url = require('url');

var fileService = function fileServiceAnonFn() {

  var fileLocationFsPath = function fileLocationFsPathAnonFn(document) {

    return document.uri.fsPath.toString();

  };

  var fixedEncodeURI = function fixedEncodeURIAnonFn(str) {

    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');

  };

  var fileLocationUri = function fileLocationUriAnonFn(document) {

    // Bug workaround: https://github.com/Microsoft/vscode/issues/2990
    if (document.uri.scheme.toString() === 'file') {

      return 'file://' + fixedEncodeURI(document.uri.path.toString());

    } else {

      return document.uri.toString();

    }

  };

  var fileLocationUrl = function fileLocationUrlAnonFn(document, config) {

    var relativePath = path.relative(vscode.workspace.rootPath, document.fileName);
    var relativeUrl = fixedEncodeURI(relativePath.replace(/\\/g, '/'));

    var urlObj = {
      protocol: config.webServerProtocol,
      hostname: config.webServerHostname,
      port: ((typeof config.webServerPort === 'number' && config.webServerPort > 0) ? config.webServerPort : 80),
      pathname: relativeUrl,
    };

    return url.format(urlObj);

  };

  var getFileLocation = function getFileLocationAnonFn(document, config, opnOptionObj) {

    if (opnOptionObj === undefined) {

      return fileLocationUri(document);

    } else if (opnOptionObj.isUseWebServer) {

      return fileLocationUrl(document, config);

    } else if (opnOptionObj.isUseFsPath) {

      return fileLocationFsPath(document);

    } else {

      return fileLocationUri(document);
    }

  };

  var checkIsWaitForAppExit = function CheckIsWaitForAppExitAnonFn(opnOptionObj) {

    if (opnOptionObj.isWaitForAppExit === undefined) {

      return true;

    } else if (typeof opnOptionObj.isWaitForAppExit === 'boolean') {

      return opnOptionObj.isWaitForAppExit;

    } else {

      return true;

    }

  };

  var openFileLocation = function openFileLocationAnonFn(fileLocation, opnOptionObj) {

    if (opnOptionObj !== undefined) {

      var argsArr = [];

      if (opnOptionObj.openInAppArgs !== undefined) {

        for (var i = 0, len = opnOptionObj.openInAppArgs.length; i < len; i++) {

          argsArr.push(opnOptionObj.openInAppArgs[i]);

        }

      }

      argsArr.unshift(opnOptionObj.openInApp);

      var objAppWithArgs = {
        wait: checkIsWaitForAppExit(opnOptionObj),
        app: argsArr,
      };

      opn(fileLocation, objAppWithArgs);

    } else {

      opn(fileLocation);

    }

  };

  return {
    openFileLocation: openFileLocation,
    getFileLocation: getFileLocation,
  };

};

module.exports = fileService();
