import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('extension existence', () => {
        assert.ok(vscode.extensions.getExtension('harttle.md-padding-vscode'));
	});

	test('extension.md-padding command', async function() {
		this.timeout(10000);

        // Create a new untitled document
        const document = await vscode.workspace.openTextDocument({ content: '- I can speak普通话', language: 'markdown' });
		await vscode.window.showTextDocument(document);

		// format
		await vscode.commands.executeCommand('extension.md-padding');

        // Ensure the document is formatted as expected
        const actualText = document.getText();
        assert.strictEqual(actualText, '- I can speak 普通话');
    });

	test('editor.action.formatDocument command', async function() {
		this.timeout(10000);

        // Create a new untitled document
        const document = await vscode.workspace.openTextDocument({ content: '- I can speak普通话', language: 'markdown' });
		await vscode.window.showTextDocument(document);

		// format
		await vscode.commands.executeCommand('editor.action.formatDocument');

        // Ensure the document is formatted as expected
        const actualText = document.getText();
        assert.strictEqual(actualText, '- I can speak 普通话');
    });
});
