# vscode-opn

![vscode-opn](vscode-opn.png)

> Opens files in the default application for the file type set in the OS

## Dependencies

- [opn](https://github.com/sindresorhus/opn)

## Install

### Packaged Extension (.vsix)

Download the latest `vscode-opn.vsix` from [GitHub Releases](release) 

You can manually install the VS Code extension packaged in a .vsix file. 

Option 1) 

Execute the VS Code command line below providing the path to the .vsix file;

    code myExtensionFolder\vscode-opn.vsix  

Depending on your platform `myExtensionFolder` is located:

- Windows:- `%USERPROFILE%\.vscode\extensions`
- Mac:- `$HOME/.vscode/extensions`
- Linux:- `$HOME/.vscode/extensions`

Option 2)

Start VS Code. 

From within VS Code open the 'File' menu, select 'Open File...' or press Ctrl+O, navigate to the .vsix file location and select it to open.

The extension will be installed under your user .vscode/extensions folder.

<!--
1. Press <kbd>F1</kbd>, then type `ext install`

2. Select `Extensions: Install Extension` and click or press <kbd>Enter</kbd>

3. Wait a few seconds for the list to download and type `vscode-opn`

4. Click the install icon next to the `vscode-opn` extension in the list
-->

## Usage

Execute the extension with the keyboard shortcut;

- **Mac**: <kbd>Command</kbd> + <kbd>Alt</kbd> + <kbd>O</kbd>
- **Windows/Linux**: <kbd>Command</kbd> + <kbd>Alt</kbd> + <kbd>O</kbd>


## Tested

- Tested in MS Win 10 environment.

- Works with plain text based file types including;
 - `.html` 
 - `.htm` 
 - `.xml` 
 - `.json`
 - `.log`
 - `.txt` 
 
- Does not work with other file types including;
  - `.png`
  - `.gif`
  - `.jpg`
  - `.docx`
  - `.xlsx`
  - `.pdf`
   
## Contributions

- Please use [Github Issues](issues), for feedback, feature suggestions, comments and reporting bugs.
- Feel free to fork this project and create pull requests with new features and/or bug fixes
- Help with bugs/issues specific to other platforms such as OSX and Linux is particularly welcome

## License
[MIT](LICENSE.txt)

