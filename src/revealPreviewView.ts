import { ItemView, WorkspaceLeaf } from 'obsidian';

export const REVEAL_PREVIEW_VIEW = "reveal-preview-view";

export class RevealPreviewView extends ItemView {

	private viewHeader: Element;
	private viewContent: Element;
	private url: String = 'about:blank';

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
		this.viewHeader = this.containerEl.children[0];
		this.viewContent = this.containerEl.children[1];
	}

	getViewType() {
		return REVEAL_PREVIEW_VIEW;
	}

	getDisplayText() {
		return "Slide Preview";
	}

	setUrl(url: String) {
		this.url = url;
	}

	private async renderView() {

		this.viewContent.empty();
		this.viewContent.addClass('reveal-preview-view');
		const element = this.viewContent.createEl("iframe",
			{
				attr: {
					src: this.url
				}
			});
	}

	async onOpen() {
		this.renderView();
	}

	async onClose() {
		// Nothing to clean up.
	}
}
