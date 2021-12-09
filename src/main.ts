import { Plugin, FileSystemAdapter, addIcon, TAbstractFile } from 'obsidian';
import { URL } from 'url';
import { ICON_DATA } from './constants';
import { RevealPreviewView, REVEAL_PREVIEW_VIEW } from './revealPreviewView';
import { RevealServer } from './revealServer';

export default class AdvancedSlidesPlugin extends Plugin {

	private previewView: RevealPreviewView;
	private revealServer: RevealServer;

	private vaultDirectory: String;
	private target: string;

	async onload() {
		const fileSystemAdapter: FileSystemAdapter = this.app.vault.adapter as FileSystemAdapter;
		this.vaultDirectory = fileSystemAdapter.getBasePath();

		this.revealServer = new RevealServer(this.app, this.vaultDirectory);
		this.revealServer.start();

		this.registerView(
			REVEAL_PREVIEW_VIEW,
			(leaf) => {
				this.previewView = new RevealPreviewView(leaf);
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
		this.previewView.onUpdate();
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
