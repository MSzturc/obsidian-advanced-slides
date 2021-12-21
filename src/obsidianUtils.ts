import { readFileSync } from "fs-extra";
import { App, FileSystemAdapter } from "obsidian";
import path from "path";


export class ObsidianUtils {

	private app: App;
	private fileSystem: FileSystemAdapter;
	
	private yamlRegex = /^---[^-]*---/;

	constructor(app: App) {
		this.app = app;
		this.fileSystem = this.app.vault.adapter as FileSystemAdapter;
	}

	getVaultName(): string{
		return this.app.vault.getName();
	}

	getVaultDirectory(): string {
		return this.fileSystem.getBasePath();
	}

	getPluginDirectory(): string {
		return path.join(this.getVaultDirectory(), this.app.vault.configDir, 'plugins/obsidian-advanced-slides/');
	}

	getDistDirectory(): string {
		return path.join(this.getPluginDirectory(), '/dist/');
	}

	/** TODO: Refactoring ************************** */

	getAbsolutePath(filename: string): string {
		const markdownFile = this.app.vault.getMarkdownFiles().filter((item: { path: string | any[]; }) => {
			return item.path.contains(filename)
		}
		).first();
		if (markdownFile)
			return this.fileSystem.getFullPath(markdownFile.path);
		else {
			return null;
		}
	}

	findFile(imagePath: string) {
		const imgFile = this.app.vault.getFiles()
			.filter(item => item.path.contains(imagePath))
			.first();

		if (imgFile) {
			return '/' + imgFile.path;
		} else {
			return imagePath;
		}
	}

	findImageEx(filePath: string){

		var imagePath = filePath + '.svg';
		var imgFile = this.app.vault.getFiles()
		.filter(item => item.path.contains(imagePath))
		.first();

		if(imgFile){
			return imagePath;
		}
		
		imagePath = filePath + '.png';
		imgFile = this.app.vault.getFiles().filter(item => item.path.contains(imagePath)).first();

		if(imgFile){
			return imagePath;
		}
		return null;
	}

	parseFile(file: string, header: string) {

		var fileContent = readFileSync(file, { encoding: 'utf-8' });

		if (header === null) {
			return fileContent.replace(this.yamlRegex,'');
		} else {

			var lines = fileContent.split('\n');

			var startIdx = null;
			var endIdx = null;
			for (let i = 0; i < lines.length; i++) {

				if (startIdx != null && lines[i].startsWith('#')) {
					endIdx = i;
					break;
				}

				if (lines[i].includes(header)) {
					startIdx = i;
				}
			}

			if (startIdx === null) {
				return "![[" + file + "#" + header + "]]";
			}

			if (endIdx === null) {
				return lines.slice(startIdx).join('\n');
			} else {
				return lines.slice(startIdx, endIdx).join('\n');
			}
		}
	}
	

}
