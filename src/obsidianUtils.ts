import { readFileSync } from 'fs-extra';
import { App, FileSystemAdapter, resolveSubpath, TFile } from 'obsidian';
import path from 'path';
import { ImageCollector } from './imageCollector';
import { AdvancedSlidesSettings } from './main';

export class ObsidianUtils {
	private app: App;
	private fileSystem: FileSystemAdapter;
	private settings: AdvancedSlidesSettings;

	private yamlRegex = /^---[^-]*---/;

	constructor(app: App, settings: AdvancedSlidesSettings) {
		this.app = app;
		this.fileSystem = this.app.vault.adapter as FileSystemAdapter;
		this.settings = settings;
	}

	getVaultName(): string {
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

	getExportDirectory(): string {
		return path.join(this.getVaultDirectory(), this.settings.exportDirectory);
	}

	getSettings(): AdvancedSlidesSettings {
		return this.settings;
	}

	private getTFile(filename: string): TFile | undefined {
		return this.app.vault
			.getFiles()
			.filter(item => {
				return item.path.contains(filename);
			})
			.first();
	}

	/** TODO: Refactoring ************************** */

	getAbsolutePath(relativePath: string): string {
		const markdownFile = this.getTFile(relativePath);
		return this.absolute(markdownFile?.path);
	}

	absolute(relativePath: string) {
		if (relativePath) return this.fileSystem.getFullPath(relativePath);
		else {
			return null;
		}
	}

	findFile(imagePath: string) {
		let base = '';
		if (!ImageCollector.getInstance().shouldCollect()) {
			base = '/';
		}

		const activeFile = this.app.workspace.getActiveFile()?.path;
		if (activeFile) {
			const allLinks = this.app.metadataCache.resolvedLinks;
			const fileLinks = allLinks[activeFile];

			for (const key in fileLinks) {
				if (key.contains(imagePath)) {
					return base + key;
				}

			}
		}

		const expDir = this.settings.exportDirectory.startsWith('/')
			? this.settings.exportDirectory.substring(1)
			: this.settings.exportDirectory;

		const imgFile = this.app.vault
			.getFiles()
			.filter(item => item.path.contains(imagePath) && !item.path.contains(expDir))
			.first();

		if (imgFile) {
			return base + imgFile.path;
		} else {
			return imagePath;
		}

	}

	findImageEx(filePath: string) {
		let base = '';
		if (!ImageCollector.getInstance().shouldCollect()) {
			base = '/';
		}

		const expDir = this.settings.exportDirectory.startsWith('/')
			? this.settings.exportDirectory.substring(1)
			: this.settings.exportDirectory;

		let imagePath = filePath + '.svg';
		let imgFile = this.app.vault
			.getFiles()
			.filter(item => item.path.contains(imagePath) && !item.path.contains(expDir))
			.first();

		if (imgFile) {
			return base + imagePath;
		}

		imagePath = filePath + '.png';
		imgFile = this.app.vault
			.getFiles()
			.filter(item => item.path.contains(imagePath) && !item.path.contains(expDir))
			.first();

		if (imgFile) {
			return base + imagePath;
		}
		return null;
	}

	parseFile(relativeFilePath: string, header: string) {
		const tfile = this.getTFile(relativeFilePath);

		if (!tfile) {
			return null;
		}

		const absoluteFilePath = this.absolute(tfile?.path);
		const fileContent = readFileSync(absoluteFilePath, { encoding: 'utf-8' });

		if (header === null) {
			return fileContent.replace(this.yamlRegex, '');
		} else {
			const lines = fileContent.split('\n');
			const cache = this.app.metadataCache.getFileCache(tfile);
			const resolved = resolveSubpath(cache, header);

			if (resolved && resolved.start && resolved.start.line) {
				let result = "";
				if (resolved.end && resolved.end.line) {
					if (resolved.end.line == resolved.start.line) {
						result = lines.slice(resolved.start.line, resolved.end.line + 1).join('\n');
					} else {
						result = lines.slice(resolved.start.line, resolved.end.line).join('\n');
					}
				} else {
					result = lines.slice(resolved.start.line).join('\n');
				}
				result = result.replaceAll(/\^[^\n]+/g, "");
				console.log(`result: ${result}`);
				return result;
			} else {
				return '![[' + relativeFilePath + '#' + header + ']]';
			}
		}
	}
}
