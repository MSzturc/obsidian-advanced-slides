import { Plugin, addIcon, TAbstractFile, PluginSettingTab, App, Setting } from 'obsidian';
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

interface AdvancedSlidesSettings {
	port: string;
}

const DEFAULT_SETTINGS: AdvancedSlidesSettings = {
	port: '3000'
}


export default class AdvancedSlidesPlugin extends Plugin {
	settings: AdvancedSlidesSettings;

	private revealServer: RevealServer;
	private obsidianUtils: ObsidianUtils;

	private target: string;

	async onload() {

		await this.loadSettings();

		if (!this.obsidianUtils) {
			this.obsidianUtils = new ObsidianUtils(this.app);
		}

		const pluginDirectory = this.obsidianUtils.getPluginDirectory();
		const distDirectory = this.obsidianUtils.getDistDirectory();

		if (!existsSync(distDirectory) || this.isOldVersion(pluginDirectory)) {
			//Download binary
			const downloadUrl = `https://github.com/MSzturc/obsidian-advanced-slides/releases/download/${version}/obsidian-advanced-slides.zip`;

			const bufs: any = [];
			let buf: Uint8Array;
			request
				.get(downloadUrl)
				.on('end', () => {
					buf = Buffer.concat(bufs);
					const zip = new JSZip();
					zip.loadAsync(buf).then((contents) => {

						Object.keys(contents.files).forEach(function (filename) {
							if (!contents.files[filename].dir) {
								zip.file(filename).async('nodebuffer').then(function (content) {
									const dest = path.join(pluginDirectory, filename);
									outputFileSync(dest, content);
								});
							}

						});
					}).catch((error) => {
						console.log(error);
					});

				})
				.on('error', (error) => {
					console.log(error);
				})
				.on('data', (d) => {
					bufs.push(d);
				})

		}

		this.revealServer = new RevealServer(this.obsidianUtils, this.settings.port);
		this.revealServer.start();


		try {
			this.registerView(REVEAL_PREVIEW_VIEW, (leaf) => new RevealPreviewView(leaf, this.revealServer.getUrl()));

			this.registerEvent(this.app.vault.on("modify", this.onChange.bind(this)));

			addIcon("slides", ICON_DATA);
			addIcon("refresh", REFRESH_ICON);

			this.addRibbonIcon("slides", "Show Slide Preview", async () => {
				await this.showView();
			});

			this.addCommand({
				id: 'open-advanced-slides-preview',
				name: 'Show Slide Preview',
				hotkeys: [
					{ modifiers: ["Mod", "Shift"], key: "E" },
				],
				callback: async () => {
					await this.toggleView();
				}
			});

			this.addSettingTab(new AdvancedSlidesSettingTab(this.app, this));
		} catch (err) { }

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
		const instance = this.getViewInstance();

		if (! instance) {
			return;
		}

		if (file.path.startsWith(this.target)){
				instance.onOpen();
		}

	}

	async toggleView() {
		const instance = this.getViewInstance();

		if (instance) {
			this.app.workspace.detachLeavesOfType(REVEAL_PREVIEW_VIEW);
			instance.onClose();
		}
		else {
			this.showView();
		}
	}

	async showView() {

		const targetDocument = this.app.workspace.getActiveFile().path;

		if (targetDocument.startsWith(this.target)
			&& this.app.workspace.getLeavesOfType(REVEAL_PREVIEW_VIEW).length > 0) {
			return;
		}

		this.target = targetDocument;
		await this.activateView();

		const url = this.revealServer.getUrl();
		url.pathname = targetDocument;

		this.openUrl(url);
	}

	private async openUrl(url: URL) {
		const instance = this.getViewInstance();
		instance.setUrl(url.toString());
		instance.onOpen();
	}

	async activateView() {
		this.app.workspace.detachLeavesOfType(REVEAL_PREVIEW_VIEW);

		await this.app.workspace.getLeaf(true).setViewState({
			type: REVEAL_PREVIEW_VIEW,
			active: false,
		});

		this.app.workspace.revealLeaf(
			this.app.workspace.getLeavesOfType(REVEAL_PREVIEW_VIEW)[0]
		);
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


class AdvancedSlidesSettingTab extends PluginSettingTab {
	plugin: AdvancedSlidesPlugin;

	constructor(app: App, plugin: AdvancedSlidesPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: 'Advanced Slides Settings' });

		new Setting(containerEl)
			.setName('Port')
			.setDesc('On which port should Advanced Slides run? (default: 3000)')
			.addText(text => text
				.setPlaceholder('3000')
				.setValue(this.plugin.settings.port)
				.onChange(_.debounce(async (value) => {
					this.plugin.settings.port = value;
					await this.plugin.saveSettings();
				}, 750)));
	}
}
