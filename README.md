# vscode-opn

![vscode-opn](public/assets/vscode-opn.png)

> Microsoft Visual Studio Code extension integrating node.js module: opn
 
> Opens files in the default application for the file type set in the OS

## Dependencies

- [opn](https://github.com/sindresorhus/opn)

## Install

### Easiest from the Extension Gallery

1. Start VS Code.

2. From within VS Code press `F1`, then type `ext install`.

3. Select `Extensions: Install Extension` and click or press `Enter`.

4. Wait a few seconds for the list to populate and type `Open File in App`.

5. Click the install icon next to the `Open File in App` extension.

6. Restart VS Code to complete installing the extension.

### Alternatively, with the Packaged Extension (.vsix) file

Download the latest `vscode-opn.vsix` from [GitHub Releases](../../releases). 

You can manually install the VS Code extension packaged in a .vsix file. 

Option 1) 

Execute the VS Code command line below providing the path to the .vsix file;

    code myExtensionFolder\vscode-opn.vsix  

Depending on your platform replace `myExtensionFolder\` with;

- Windows:- `%USERPROFILE%\.vscode\extensions\`
- Mac:- `$HOME/.vscode/extensions/`
- Linux:- `$HOME/.vscode/extensions/`

Option 2)

Start VS Code. 

From within VS Code open the 'File' menu, select 'Open File...' or press Ctrl+O, navigate to the .vsix file location and select it to open.

The extension will be installed under your user .vscode/extensions folder.

## Usage

Execute the extension with the keyboard shortcut;

- **Mac**: `Command` + `Alt` + `O`
- **Windows/Linux**: `Ctrl` + `Alt` + `O`


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

- Please use [Github Issues](../../issues), for feedback, feature suggestions, comments and reporting bugs.
- Feel free to fork this project and create pull requests with new features and/or bug fixes.
- Help with bugs/issues specific to other platforms such as OSX and Linux is particularly welcome.

## License
[MIT](LICENSE.txt)
