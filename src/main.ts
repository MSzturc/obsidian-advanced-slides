import { Plugin, FileSystemAdapter, addIcon, TAbstractFile } from 'obsidian';
import { URL } from 'url';
import { ICON_DATA } from './constants';
import { RevealPreviewView, REVEAL_PREVIEW_VIEW } from './revealPreviewView';
import { RevealServer } from './revealServer';
import { version } from '../package.json';
import path from 'path';
import { existsSync, outputFileSync } from 'fs-extra';
import request from 'request';
import JSZip from 'jszip';

export default class AdvancedSlidesPlugin extends Plugin {

	private previewView: RevealPreviewView;
	private revealServer: RevealServer;

	private vaultDirectory: String;
	private target: string;

	async onload() {
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

		this.revealServer = new RevealServer(this.app, this.vaultDirectory);
		this.revealServer.start();

		this.registerView(
			REVEAL_PREVIEW_VIEW,
			(leaf) => {
				this.previewView = new RevealPreviewView(leaf, this.revealServer.getUrl());
				return this.previewView;
			}
		);
		this.registerEvent(this.app.vault.on("modify", this.onChange.bind(this)));

		addIcon("slides", ICON_DATA);

		this.addRibbonIcon("slides", "Show Reveal Preview", () => {
			this.showView();
		});
	}

	onChange(file: TAbstractFile) {
		if(this.previewView){
			this.previewView.onUpdate();
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
}
