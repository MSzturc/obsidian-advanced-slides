import { Plugin, ItemView, App, PluginManifest, FileSystemAdapter } from 'obsidian';
import { RevealPreviewView, REVEAL_PREVIEW_VIEW } from './revealPreviewView';
import { RevealServer } from './revealServer';
import path from 'path';

export default class AdvancedSlidesPlugin extends Plugin {

	private previewView: RevealPreviewView;
	private revealServer: RevealServer;

	private vaultDirectory: String;

	async onload() {
		const fileSystemAdapter: FileSystemAdapter = this.app.vault.adapter as FileSystemAdapter;
		this.vaultDirectory = fileSystemAdapter.getBasePath();

		this.revealServer = new RevealServer(this.vaultDirectory);
		this.revealServer.start();

		this.registerView(
			REVEAL_PREVIEW_VIEW,
			(leaf) => {
				this.previewView = new RevealPreviewView(leaf);
				return this.previewView;
			}
		);

		this.addRibbonIcon("dice", "Activate view", () => {
			const targetDocument = this.app.workspace.getActiveFile().path;
			this.activateView();

			let url = new URL(this.revealServer.getUrl());
			url.pathname = targetDocument;

			this.previewView.setUrl(url.toString());
		});
	}

	onunload() {
		this.app.workspace.detachLeavesOfType(REVEAL_PREVIEW_VIEW);
		this.revealServer.stop();
	}

	async activateView() {
		this.app.workspace.detachLeavesOfType(REVEAL_PREVIEW_VIEW);

		await this.app.workspace.getLeaf(true).setViewState({
			type: REVEAL_PREVIEW_VIEW,
			active: true,
		});

		this.app.workspace.revealLeaf(
			this.app.workspace.getLeavesOfType(REVEAL_PREVIEW_VIEW)[0]
		);
	}
}
