import {
	Plugin,
	addIcon,
	TAbstractFile,
	PluginSettingTab,
	App,
	Setting,
	EditorSuggest,
	Editor,
	EditorPosition,
	EditorSuggestContext,
	EditorSuggestTriggerInfo,
	TFile,
} from 'obsidian';
import { ICON_DATA, REFRESH_ICON } from './constants';
import { RevealPreviewView, REVEAL_PREVIEW_VIEW } from './revealPreviewView';
import { RevealServer } from './revealServer';
import { version } from '../package.json';
import path from 'path';
import { existsSync, outputFileSync, readFileSync } from 'fs-extra';
import request from 'request';
import JSZip from 'jszip';
import _ from 'lodash';
import { ObsidianUtils } from './obsidianUtils';
import { FolderSuggest } from './suggesters/FolderSuggester';
import { ThemeSuggest } from './suggesters/ThemeSuggester';
import { HighlightThemeSuggest } from './suggesters/HighlightThemeSuggester';
import { AutoCompleteSuggest } from './suggesters/AutoCompleteSuggester';
import { load } from 'js-yaml';


interface EmbeddedSlideParameters {
	slide: string;
	page?: number;
}

export interface AdvancedSlidesSettings {
	port: string;
	autoReload: boolean;
	exportDirectory: string;
	enableOverview: boolean;
	enableChalkboard: boolean;
	enableMenu: boolean;
	enableTimeBar: boolean;
	theme: string;
	highlightTheme: string;
	transition: string;
	transitionSpeed: string;
	controls: boolean;
	progress: boolean;
	slideNumber: boolean;
	showGrid: boolean;
	autoComplete: string;
}

const DEFAULT_SETTINGS: AdvancedSlidesSettings = {
	port: '3000',
	autoReload: true,
	exportDirectory: '/export',
	enableChalkboard: false,
	enableOverview: false,
	enableMenu: false,
	enableTimeBar: false,
	theme: 'black',
	highlightTheme: 'zenburn',
	transition: 'slide',
	transitionSpeed: 'default',
	controls: true,
	progress: true,
	slideNumber: false,
	showGrid: false,
	autoComplete: 'inPreview'
};

export default class AdvancedSlidesPlugin extends Plugin {
	settings: AdvancedSlidesSettings;

	private revealServer: RevealServer;
	private obsidianUtils: ObsidianUtils;
	private autoCompleteSuggester: AutoCompleteSuggest;

	private target: TAbstractFile;

	async onload() {
		await this.loadSettings();

		this.obsidianUtils = new ObsidianUtils(this.app, this.settings);

		const pluginDirectory = this.obsidianUtils.getPluginDirectory();
		const distDirectory = this.obsidianUtils.getDistDirectory();

		if (this.autoCompleteSuggester) {
			if (this.settings.autoComplete == "always") {
				this.autoCompleteSuggester.activate();
			} else {
				this.autoCompleteSuggester.deactivate();
			}
		}

		if (!existsSync(distDirectory) || this.isOldVersion(pluginDirectory)) {
			//Download binary
			const downloadUrl = `https://github.com/MSzturc/obsidian-advanced-slides/releases/download/${version}/obsidian-advanced-slides.zip`;

			const bufs: Uint8Array[] = [];
			let buf: Uint8Array;
			request
				.get(downloadUrl)
				.on('end', () => {
					buf = Buffer.concat(bufs);
					const zip = new JSZip();
					zip
						.loadAsync(buf)
						.then(contents => {
							Object.keys(contents.files).forEach(function (filename) {
								if (!contents.files[filename].dir) {
									zip
										.file(filename)
										.async('nodebuffer')
										.then(function (content) {
											const dest = path.join(pluginDirectory, filename);
											outputFileSync(dest, content);
										});
								}
							});
						})
						.catch(error => {
							console.log(error);
						});
				})
				.on('error', error => {
					console.log(error);
				})
				.on('data', d => {
					bufs.push(d);
				});
		}

		this.revealServer = new RevealServer(this.obsidianUtils, this.settings.port);
		this.revealServer.start();

		try {
			this.registerView(REVEAL_PREVIEW_VIEW, leaf => new RevealPreviewView(leaf, this.revealServer.getUrl(), this.settings));

			this.registerEvent(this.app.vault.on('modify', this.onChange.bind(this)));

			this.registerEditorSuggest(new LineSelectionListener(this.app, this));

			this.registerMarkdownPostProcessor((element, context) => {
				const paragraphs = element.querySelectorAll<HTMLParagraphElement>("p");
				for (let index = 0; index < paragraphs.length; index++) {
					const paragraph = paragraphs.item(index);

					if (paragraph.innerText.startsWith(":::")) {
						paragraph.remove();
					}
				}
			});

			addIcon('slides', ICON_DATA);
			addIcon('refresh', REFRESH_ICON);

			this.addRibbonIcon('slides', 'Show Slide Preview', async () => {
				await this.showView();
			});

			this.addCommand({
				id: 'open-advanced-slides-preview',
				name: 'Show Slide Preview',
				hotkeys: [{ modifiers: ['Mod', 'Shift'], key: 'E' }],
				callback: async () => {
					await this.toggleView();
				},
			});

			this.addCommand({
				id: 'reload-advanced-slides-preview',
				name: 'Reload Slide Preview',
				hotkeys: [{ modifiers: ['Mod', 'Shift'], key: 'R' }],
				callback: () => {
					const instance = this.getViewInstance();

					if (!instance) {
						return;
					}
					instance.onChange();
				},
			});

			this.addSettingTab(new AdvancedSlidesSettingTab(this.app, this));


			this.app.workspace.onLayoutReady(() => {
				this.autoCompleteSuggester = new AutoCompleteSuggest(this.app);

				if (this.settings.autoComplete == "always") {
					this.autoCompleteSuggester.activate();
				} else {
					this.autoCompleteSuggester.deactivate();
				}
				this.registerEditorSuggest(this.autoCompleteSuggester);

				const instance = this.getViewInstance();

				if (instance) {
					if (instance.url == 'about:blank') {
						this.showView();
					}
				}
			});

			this.registerMarkdownCodeBlockProcessor("slide", async (src, el) => {

				try {
					const parameters = this.readParameters(src);
					const page = parameters.page ? `${parameters.page}` : '0';

					const url = new URL(`http://localhost:${this.settings.port}/embed/${parameters.slide}#/${page}`);
					url.searchParams.append('embed', 'true');

					const viewContent = el.createDiv();

					viewContent.empty();
					viewContent.addClass('reveal-preview-view');

					viewContent.createEl('iframe', {
						attr: {
							src: url.toString(),
							sandbox: 'allow-scripts allow-same-origin allow-popups',
						},
					});

				} catch (e) {
					el.createEl("h2", { text: "Parameters invalid: " + e.message });
				}
			});

			// eslint-disable-next-line no-empty
		} catch (err) { }
	}

	readParameters(src: string): EmbeddedSlideParameters {
		const params = load(src) as EmbeddedSlideParameters;
		params.slide = this.obsidianUtils.findFile(params.slide);
		return params;
	}

	getViewInstance(): RevealPreviewView {
		for (const leaf of this.app.workspace.getLeavesOfType(REVEAL_PREVIEW_VIEW)) {
			const view = leaf.view;
			if (view instanceof RevealPreviewView) {
				return view;
			}
		}
		return null;
	}

	isOldVersion(dir: string) {
		const versionFile = path.join(dir, 'distVersion.json');
		if (!existsSync(versionFile)) {
			return true;
		} else {
			const rawdata = readFileSync(versionFile, { encoding: 'utf-8' });
			const distVersion = JSON.parse(rawdata).version;
			return distVersion != version;
		}
	}

	onChange(file: TAbstractFile) {
		if (!this.settings.autoReload) {
			return;
		}

		const instance = this.getViewInstance();

		if (!instance) {
			return;
		}

		if (file == this.target) {
			instance.onChange();
		}
	}

	async toggleView() {
		const instance = this.getViewInstance();

		if (instance) {
			this.app.workspace.detachLeavesOfType(REVEAL_PREVIEW_VIEW);
			instance.onClose();
			if (this.settings.autoComplete == "inPreview") {
				this.autoCompleteSuggester.deactivate();
			}
		} else {
			if (this.settings.autoComplete != "never") {
				this.autoCompleteSuggester.activate();
			}
			this.showView();
		}
	}

	async showView() {
		const targetDocument = this.app.workspace.getActiveFile();

		if (!targetDocument) {
			return;
		}

		if (targetDocument == this.target && this.app.workspace.getLeavesOfType(REVEAL_PREVIEW_VIEW).length > 0) {
			return;
		}

		this.target = targetDocument;
		await this.activateView();

		const url = this.revealServer.getUrl();
		url.pathname = this.fixedEncodeURIComponent(this.target.path);

		this.openUrl(url);
	}

	private fixedEncodeURIComponent(str: string) {
		return str.replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16);
		});
	}


	private async openUrl(url: URL) {
		const instance = this.getViewInstance();
		instance.setUrl(url.toString());
	}

	async activateView() {
		this.app.workspace.detachLeavesOfType(REVEAL_PREVIEW_VIEW);

		await this.app.workspace.getLeaf(true).setViewState({
			type: REVEAL_PREVIEW_VIEW,
			active: false,
		});

		this.app.workspace.revealLeaf(this.app.workspace.getLeavesOfType(REVEAL_PREVIEW_VIEW)[0]);
	}

	onunload() {
		const instance = this.getViewInstance();

		if (instance) {
			this.app.workspace.detachLeavesOfType(REVEAL_PREVIEW_VIEW);
			instance.onClose();
		}
		this.revealServer.stop();
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
		this.onunload();
		this.onload();
	}
}

class LineSelectionListener extends EditorSuggest<string> {
	private plugin: AdvancedSlidesPlugin;

	constructor(app: App, plugin: AdvancedSlidesPlugin) {
		super(app);
		this.plugin = plugin;
	}

	onTrigger(cursor: EditorPosition, editor: Editor, file: TFile): EditorSuggestTriggerInfo {
		const instance = this.plugin.getViewInstance();

		if (instance) {
			if (instance.url == 'about:blank') {
				this.plugin.showView();
			}
			instance.onLineChanged(cursor.line);
		}
		return null;
	}
	getSuggestions(context: EditorSuggestContext): string[] | Promise<string[]> {
		throw new Error('Method not implemented.');
	}
	renderSuggestion(value: string, el: HTMLElement): void {
		throw new Error('Method not implemented.');
	}
	selectSuggestion(value: string, evt: MouseEvent | KeyboardEvent): void {
		throw new Error('Method not implemented.');
	}
}

class AdvancedSlidesSettingTab extends PluginSettingTab {
	plugin: AdvancedSlidesPlugin;

	constructor(app: App, plugin: AdvancedSlidesPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: 'General Settings' });

		new Setting(containerEl)
			.setName('Port')
			.setDesc('On which port should Advanced Slides run? (default: 3000)')
			.addText(text =>
				text
					.setPlaceholder('3000')
					.setValue(this.plugin.settings.port)
					.onChange(
						_.debounce(async value => {
							this.plugin.settings.port = value;
							await this.plugin.saveSettings();
						}, 750),
					),
			);

		new Setting(containerEl)
			.setName('Auto Reload')
			.setDesc('Should the slide preview window be updated when a change in source file is detected?')
			.addToggle(value =>
				value.setValue(this.plugin.settings.autoReload).onChange(
					_.debounce(async value => {
						this.plugin.settings.autoReload = value;
						await this.plugin.saveSettings();
					}, 750),
				),
			);

		new Setting(containerEl)
			.setName('Auto Complete')
			.setDesc('Do you want to auto-complete inputs?')
			.addDropdown(cb => {
				cb.addOption('always', 'Always')
					.addOption('inPreview', 'only in Slide Preview')
					.addOption('never', 'Never')
					.setValue(this.plugin.settings.autoComplete)
					.onChange(
						_.debounce(async value => {
							this.plugin.settings.autoComplete = value;
							await this.plugin.saveSettings();
						}, 750),
					);
			});

		new Setting(containerEl)
			.setName('Export Directory')
			.setDesc('Where should Advanced Slides export presentations?')
			.addSearch(cb => {
				new FolderSuggest(this.app, cb.inputEl);
				cb.setPlaceholder('Folder')
					.setValue(this.plugin.settings.exportDirectory)
					.onChange(
						_.debounce(async value => {
							this.plugin.settings.exportDirectory = value;
							await this.plugin.saveSettings();
						}, 750),
					);
			});

		containerEl.createEl('h2', { text: 'Slide Settings' });

		new Setting(containerEl)
			.setName('Theme')
			.setDesc('Which theme should be used for your slides?')
			.addSearch(cb => {
				new ThemeSuggest(this.app, cb.inputEl);
				cb.setPlaceholder('black')
					.setValue(this.plugin.settings.theme)
					.onChange(
						_.debounce(async value => {
							this.plugin.settings.theme = value;
							await this.plugin.saveSettings();
						}, 750),
					);
			});

		new Setting(containerEl)
			.setName('Highlight Theme')
			.setDesc('Which highlight theme should be used for your slides?')
			.addSearch(cb => {
				new HighlightThemeSuggest(this.app, cb.inputEl);
				cb.setPlaceholder('zenburn')
					.setValue(this.plugin.settings.highlightTheme)
					.onChange(
						_.debounce(async value => {
							this.plugin.settings.highlightTheme = value;
							await this.plugin.saveSettings();
						}, 750),
					);
			});

		new Setting(containerEl)
			.setName('Transition Style')
			.setDesc('How should the transition between slides look like?')
			.addDropdown(cb => {
				cb.addOption('none', 'none')
					.addOption('fade', 'fade')
					.addOption('slide', 'slide')
					.addOption('convex', 'convex')
					.addOption('concave', 'concave')
					.addOption('zoom', 'zoom')
					.setValue(this.plugin.settings.transition)
					.onChange(
						_.debounce(async value => {
							this.plugin.settings.transition = value;
							await this.plugin.saveSettings();
						}, 750),
					);
			});

		new Setting(containerEl)
			.setName('Transition Speed')
			.setDesc('How fast should the transition between two slides be?')
			.addDropdown(cb => {
				cb.addOption('slow', 'slow')
					.addOption('normal', 'default')
					.addOption('fast', 'fast')
					.setValue(this.plugin.settings.transitionSpeed)
					.onChange(
						_.debounce(async value => {
							this.plugin.settings.transitionSpeed = value;
							await this.plugin.saveSettings();
						}, 750),
					);
			});

		containerEl.createEl('h2', { text: 'Plugins' });

		new Setting(containerEl)
			.setName('Controls')
			.setDesc('Display presentation control arrows?')
			.addToggle(value =>
				value.setValue(this.plugin.settings.controls).onChange(
					_.debounce(async value => {
						this.plugin.settings.controls = value;
						await this.plugin.saveSettings();
					}, 750),
				),
			);

		new Setting(containerEl)
			.setName('Progress Bar')
			.setDesc('Display presentation progress bar?')
			.addToggle(value =>
				value.setValue(this.plugin.settings.progress).onChange(
					_.debounce(async value => {
						this.plugin.settings.progress = value;
						await this.plugin.saveSettings();
					}, 750),
				),
			);

		new Setting(containerEl)
			.setName('Slide Numbers')
			.setDesc('Display the page number of the current slide?')
			.addToggle(value =>
				value.setValue(this.plugin.settings.slideNumber).onChange(
					_.debounce(async value => {
						this.plugin.settings.slideNumber = value;
						await this.plugin.saveSettings();
					}, 750),
				),
			);

		new Setting(containerEl)
			.setName('Menu')
			.setDesc('Display presentation menu button?')
			.addToggle(value =>
				value.setValue(this.plugin.settings.enableMenu).onChange(
					_.debounce(async value => {
						this.plugin.settings.enableMenu = value;
						await this.plugin.saveSettings();
					}, 750),
				),
			);

		new Setting(containerEl)
			.setName('Overview')
			.setDesc('Display presentation  overview button?')
			.addToggle(value =>
				value.setValue(this.plugin.settings.enableOverview).onChange(
					_.debounce(async value => {
						this.plugin.settings.enableOverview = value;
						await this.plugin.saveSettings();
					}, 750),
				),
			);

		new Setting(containerEl)
			.setName('Chalkboard')
			.setDesc('Should the slides contain a chalkboard ?')
			.addToggle(value =>
				value.setValue(this.plugin.settings.enableChalkboard).onChange(
					_.debounce(async value => {
						this.plugin.settings.enableChalkboard = value;
						await this.plugin.saveSettings();
					}, 750),
				),
			);

		new Setting(containerEl)
			.setName('Elapsed Time Bar')
			.setDesc('Display elapsed time bar?')
			.addToggle(value =>
				value.setValue(this.plugin.settings.enableTimeBar).onChange(
					_.debounce(async value => {
						this.plugin.settings.enableTimeBar = value;
						await this.plugin.saveSettings();
					}, 750),
				),
			);
	}
}
