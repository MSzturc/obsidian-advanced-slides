import { Plugin, FileSystemAdapter, addIcon, TAbstractFile, PluginSettingTab, App, Setting, WorkspaceLeaf } from 'obsidian';
import { URL } from 'url';
import { ICON_DATA, REFRESH_ICON } from './constants';
import { RevealPreviewView, REVEAL_PREVIEW_VIEW } from './revealPreviewView';
import { RevealServer } from './revealServer';
import { version } from '../package.json';
import path from 'path';
import { existsSync, outputFileSync } from 'fs-extra';
import request from 'request';
import JSZip from 'jszip';
import _ from 'lodash';
import { throws } from 'assert';

interface AdvancedSlidesSettings {
	port: string;
}

const DEFAULT_SETTINGS: AdvancedSlidesSettings = {
	port: '3000'
}


export default class AdvancedSlidesPlugin extends Plugin {
	settings: AdvancedSlidesSettings;

	private previewView: RevealPreviewView;
	private revealServer: RevealServer;

	private vaultDirectory: String;
	private target: string;

	async onload() {

		await this.loadSettings();

		const fileSystemAdapter: FileSystemAdapter = this.app.vault.adapter as FileSystemAdapter;
		this.vaultDirectory = fileSystemAdapter.getBasePath();

		const pluginDirectory = path.join(this.vaultDirectory.toString(), '/.obsidian/plugins/obsidian-advanced-slides/');
		const distDirectory = path.join(pluginDirectory, '/dist/');

		if (!existsSync(distDirectory)) {

			//Download binary
			const downloadUrl = `https://github.com/MSzturc/obsidian-advanced-slides/releases/download/${version}/obsidian-advanced-slides.zip`;

			let bufs: any = [];
			let buf: Uint8Array;
			request
				.get(downloadUrl)
				.on('end', () => {
					buf = Buffer.concat(bufs);
					var zip = new JSZip();
					zip.loadAsync(buf).then((contents) => {

						Object.keys(contents.files).forEach(function (filename) {
							if (!contents.files[filename].dir) {
								zip.file(filename).async('nodebuffer').then(function (content) {
									var dest = path.join(pluginDirectory, filename);
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

		this.revealServer = new RevealServer(this.app, this.vaultDirectory, this.settings.port);
		this.revealServer.start();


		try {
			this.registerView(REVEAL_PREVIEW_VIEW, this.viewCreator.bind(this));
			this.registerEvent(this.app.vault.on("modify", this.onChange.bind(this)));

			addIcon("slides", ICON_DATA);
			addIcon("refresh", REFRESH_ICON);

			this.addRibbonIcon("slides", "Show Slide Preview", () => {
				this.showView();
			});

			this.addCommand({
				id: 'open-advanced-slides-preview',
				name: 'Show Slide Preview',
				hotkeys: [
					{ modifiers: ["Mod", "Shift"], key: "E" },
				],
				callback: () => {
					this.toggleView();
				}
			});

			this.addSettingTab(new AdvancedSlidesSettingTab(this.app, this));
		} catch (err) { }

	}

	viewCreator(leaf: WorkspaceLeaf, ext?: string): RevealPreviewView {
		this.previewView = new RevealPreviewView(leaf, this.revealServer.getUrl());
		return this.previewView;
	}

	onChange(file: TAbstractFile) {
		if (this.previewView) {
			this.previewView.onUpdate();
		}
	}

	toggleView() {
		if (this.app.workspace.getLeavesOfType(REVEAL_PREVIEW_VIEW).length > 0) {
			this.app.workspace.detachLeavesOfType(REVEAL_PREVIEW_VIEW);
			if (this.previewView) {
				this.previewView.destroy();
			}
		}
		else {
			this.showView();
		}
	}

	showView() {

		const targetDocument = this.app.workspace.getActiveFile().path;

		if (targetDocument.startsWith(this.target)
			&& this.app.workspace.getLeavesOfType(REVEAL_PREVIEW_VIEW).length > 0) {
			return;
		}

		this.target = targetDocument;
		this.activateView();

		let url = new URL(this.revealServer.getUrl());
		url.pathname = targetDocument;

		this.previewView.setUrl(url.toString());

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
		this.app.workspace.detachLeavesOfType(REVEAL_PREVIEW_VIEW);
		if (this.previewView) {
			this.previewView.destroy();
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
