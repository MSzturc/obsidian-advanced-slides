import { readFileSync } from "fs-extra";
import _ from "lodash";
import { App, FileSystemAdapter } from "obsidian";
import path from "path";
import { ImageCollector } from "./imageCollector";
import { AdvancedSlidesSettings } from "./main";


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

	getTemplateSettings(options: any) {
		const properties = ['enableOverview', 'enableChalkboard'];

		const globalSettings = _.pick(this.settings, properties);
		const slideSettings = _.pick(options, properties);

		return _.defaults({}, globalSettings, slideSettings);
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
		const expDir = this.settings.exportDirectory.startsWith("/")
			? this.settings.exportDirectory.substring(1)
			: this.settings.exportDirectory

		const imgFile = this.app.vault.getFiles()
			.filter(item => item.path.contains(imagePath) && !item.path.contains(expDir))
			.first();

		let base = '';
		if (!ImageCollector.getInstance().shouldCollect()) {
			base = '/';
		}

		if (imgFile) {
			return base + imgFile.path;
		} else {
			return imagePath;
		}
	}

	findImageEx(filePath: string) {
		const expDir = this.settings.exportDirectory.startsWith("/")
			? this.settings.exportDirectory.substring(1)
			: this.settings.exportDirectory

		let imagePath = filePath + '.svg';
		let imgFile = this.app.vault.getFiles()
			.filter(item => item.path.contains(imagePath) && !item.path.contains(expDir))
			.first();

		let base = '';
		if (!ImageCollector.getInstance().shouldCollect()) {
			base = '/';
		}

		if (imgFile) {
			return base+ imagePath;
		}

		imagePath = filePath + '.png';
		imgFile = this.app.vault.getFiles().filter(item => item.path.contains(imagePath) && !item.path.contains(expDir)).first();

		if (imgFile) {
			return base + imagePath;
		}
		return null;
	}

	parseFile(file: string, header: string) {

		const fileContent = readFileSync(file, { encoding: 'utf-8' });

		if (header === null) {
			return fileContent.replace(this.yamlRegex, '');
		} else {

			const lines = fileContent.split('\n');

			let startIdx = null;
			let endIdx = null;
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
