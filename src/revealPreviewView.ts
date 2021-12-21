import { ItemView, WorkspaceLeaf } from 'obsidian';
import { shell } from 'electron';

export const REVEAL_PREVIEW_VIEW = "reveal-preview-view";

export class RevealPreviewView extends ItemView {
	private url: string = 'about:blank';

	constructor(leaf: WorkspaceLeaf, serverUrl: string) {
		super(leaf);
		
		this.addAction('slides','Open in Browser',() => {
			shell.openExternal(serverUrl);
		});

		this.addAction('refresh','Refresh Slides',() => {
			this.renderView();
		});

		window.addEventListener("message", this.onMessage.bind(this));
	}

	onMessage(msg : MessageEvent){
		this.setUrl(msg.data);
	}

	getViewType() {
		return REVEAL_PREVIEW_VIEW;
	}

	getDisplayText() {
		return "Slide Preview";
	}

	setUrl(url: string) {
		this.url = url;
	}

	async onOpen() {
		this.renderView();
	}

	async onClose() {
		window.removeEventListener("message", this.onMessage);
	}

	private async renderView() {

		const viewContent = this.containerEl.children[1];

		viewContent.empty();
		viewContent.addClass('reveal-preview-view');
		viewContent.createEl("iframe",
			{
				attr: {
					// @ts-ignore:
					src: this.url
				}
			});
	}
}
