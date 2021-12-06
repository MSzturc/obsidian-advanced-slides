import { Plugin, ItemView, App, PluginManifest } from 'obsidian';
import { RevealPreviewView, REVEAL_PREVIEW_VIEW } from './revealPreviewView';
import { RevealServer } from './revealServer';

export default class AdvancedSlidesPlugin extends Plugin {

	private previewView: RevealPreviewView;
	private revealServer: RevealServer;

	async onload() {

		this.revealServer = new RevealServer();
		this.revealServer.start();

		this.registerView(
			REVEAL_PREVIEW_VIEW,
			(leaf) => {
				this.previewView = new RevealPreviewView(leaf);
				return this.previewView;
			}
		);

		this.addRibbonIcon("dice", "Activate view", () => {
			this.activateView();
			this.previewView.setUrl(this.revealServer.getUrl());
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
