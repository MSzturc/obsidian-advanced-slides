import { Plugin, ItemView, WorkspaceLeaf } from 'obsidian';

export default class AdvancedSlidesPlugin extends Plugin {

	async onload() {
		this.registerView(
			VIEW_TYPE_EXAMPLE,
			(leaf) => new ExampleView(leaf)
		);

		this.addRibbonIcon("dice", "Activate view", () => {
			this.activateView();
		});
	}

	onunload() {
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_EXAMPLE);
	}

	async activateView() {
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_EXAMPLE);

		await this.app.workspace.getLeaf(true).setViewState({
			type: VIEW_TYPE_EXAMPLE,
			active: true,
		});

		this.app.workspace.revealLeaf(
			this.app.workspace.getLeavesOfType(VIEW_TYPE_EXAMPLE)[0]
		);
	}
}

export const VIEW_TYPE_EXAMPLE = "example-view";

export class ExampleView extends ItemView {

	iframe: HTMLIFrameElement;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_TYPE_EXAMPLE;
	}

	getDisplayText() {
		return "Reveal.js Preview";
	}

	async onOpen() {
		const container = this.containerEl.children[1];
		container.empty();
		container.setAttr('style','padding: 0;');

		const inner = container.createDiv({
            cls: "markdown-preview-view",
            attr: { style: "padding: 0;overflow:hidden;" }
        });

		inner.createEl("iframe",
			{
				attr: {
					src: 'http://www.google.de',
					style: 'border-style:none;width: 100%; height: 100%'
				}
			});
	}

	async onClose() {
		// Nothing to clean up.
	}
}
