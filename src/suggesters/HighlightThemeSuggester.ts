// Credits go to Liam's Periodic Notes Plugin: https://github.com/liamcain/obsidian-periodic-notes
import { FileSystemAdapter } from 'obsidian';
import path from 'path';
import fs from 'fs';
import { TextInputSuggest } from './Suggest';

export class HighlightThemeSuggest extends TextInputSuggest<string> {
	getSuggestions(inputStr: string): string[] {
		const adapter = this.app.vault.adapter as FileSystemAdapter;
		const vaultDirectory = adapter.getBasePath();
		const pluginDirectory = path.join(vaultDirectory, this.app.vault.configDir, 'plugins/obsidian-advanced-slides/');
		const cssDirectory = path.join(pluginDirectory, 'css/');
		const themeDirectory = path.join(pluginDirectory, 'plugin/highlight/');

		const cssFiles = this.formatCss(this.getFiles([cssDirectory]));
		const themeFiles = this.formatTheme(this.getFiles([themeDirectory]));

		const allFiles = [...cssFiles, ...themeFiles];

		const files: string[] = [];
		const lowerCaseInputStr = inputStr.toLowerCase();

		allFiles.forEach((file: string) => {
			if (file.toLowerCase().includes(lowerCaseInputStr)) {
				files.push(file);
			}
		});
		return files;
	}

	formatCss(input: Set<string>) {
		return Array.of(...input)
			.filter(value => value.endsWith('.css'))
			.map(value => 'css/' + value);
	}

	formatTheme(input: Set<string>) {
		return Array.of(...input)
			.filter(value => value.endsWith('.css'))
			.map(value => value.replaceAll('.css', ''));
	}

	getFiles(directories: string[]) {
		const result = new Set<string>();

		for (const directory of directories) {
			fs.readdirSync(directory).forEach(file => {
				result.add(file);
			});
		}

		return result;
	}

	renderSuggestion(file: string, el: HTMLElement): void {
		el.setText(file);
	}

	selectSuggestion(file: string): void {
		this.inputEl.value = file;
		this.inputEl.trigger('input');
		this.close();
	}
}
