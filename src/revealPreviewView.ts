import { ItemView, WorkspaceLeaf } from 'obsidian';

export const REVEAL_PREVIEW_VIEW = "reveal-preview-view";

export class RevealPreviewView extends ItemView {

	private _viewHeader: any;
	private _viewContent: any;
	private _url: String = 'about:blank';

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
		this._viewHeader = this.containerEl.children[0];
		this._viewContent = this.containerEl.children[1];
	}

	getViewType() {
		return REVEAL_PREVIEW_VIEW;
	}

	getDisplayText() {
		return "Slide Preview";
	}

	setUrl(url: String) {
		this._url = url;
		this.renderView();
	}

	private renderView() {
		this._viewContent.empty();
		this._viewContent.addClass('reveal-preview-view');
		this._viewContent.createEl("iframe",
			{
				attr: {
					src: this._url
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
