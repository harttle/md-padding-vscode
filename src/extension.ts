// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { padMarkdown } from 'md-padding';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Extension "md-padding" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.md-padding', () => {
		const { activeTextEditor } = vscode.window;
	
		if (!activeTextEditor) {
			vscode.window.showInformationMessage('No active editor found, skiping markdown padding...');
			return;
		}
		if (activeTextEditor.document.languageId !== 'markdown') {
			vscode.window.showInformationMessage(`Language "${activeTextEditor.document.languageId}" not supported, skipping markdown padding...`);
			return;
		}
		const [range, text] = getReplacement(activeTextEditor.document);
		const edit = new vscode.WorkspaceEdit();
		edit.replace(activeTextEditor.document.uri, range, text);
		vscode.workspace.applyEdit(edit);
	});

	vscode.languages.registerDocumentFormattingEditProvider('markdown', {
		provideDocumentFormattingEdits(document: vscode.TextDocument) {
			const [range, text] = getReplacement(document);
			const edit = vscode.TextEdit.replace(range, text);
			return [edit];
		}
	});

	context.subscriptions.push(disposable);
}

function getReplacement (document: vscode.TextDocument): [vscode.Range, string] {
	const input = document.getText();
	const config = vscode.workspace.getConfiguration("mdpadding");
	const options = {
		ignoreWords: config.get("ignoreWords") as string[]
	};
	console.log(config);
	const output = padMarkdown(input, options);

	var firstLine = document.lineAt(0);
	var lastLine = document.lineAt(document.lineCount - 1);
	var textRange = new vscode.Range(firstLine.range.start, lastLine.range.end);
	return [textRange, output];
}

// this method is called when your extension is deactivated
export function deactivate() {}
