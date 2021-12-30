import { ItemView, Menu, WorkspaceLeaf } from 'obsidian';

export const REVEAL_PREVIEW_VIEW = "reveal-preview-view";

export class RevealPreviewView extends ItemView {
	private url = 'about:blank';
	private home : URL;

	constructor(leaf: WorkspaceLeaf, home: URL) {
		super(leaf);
		this.home = home;

		this.addAction('slides', 'Open in Browser', () => {
			window.open(home);
		});

		this.addAction('refresh', 'Refresh Slides', () => {
			this.reloadIframe();
		});

		window.addEventListener("message", this.onMessage.bind(this));
	}

	onMoreOptionsMenu(menu: Menu): void {

		super.onMoreOptionsMenu(menu);

		menu.addSeparator();
		menu.addItem((item) => {
			item.setIcon("document")
				.setTitle("Print Presentation")
				.onClick(() => {
					window.open(this.home.toString() + '?print-pdf');
				});
		});

	}

	onMessage(msg: MessageEvent) {
		this.setUrl(msg.data, false);
	}

	getViewType() {
		return REVEAL_PREVIEW_VIEW;
	}

	getDisplayText() {
		return "Slide Preview";
	}

	setUrl(url: string, rerender = true) {
		this.url = url;
		if (rerender) {
			this.renderView();
		}
	}

	onChange() {
		this.reloadIframe();
	}

	async onClose() {
		window.removeEventListener("message", this.onMessage);
	}

	private reloadIframe() {
		const viewContent = this.containerEl.children[1];
		const iframe = viewContent.getElementsByTagName('iframe')[0];
		iframe.contentWindow.postMessage('reload', this.url);
	}

	private renderView() {

		const viewContent = this.containerEl.children[1];

		viewContent.empty();
		viewContent.addClass('reveal-preview-view');
		viewContent.createEl("iframe",
			{
				attr: {
					// @ts-ignore:
					src: this.url,
					sandbox: 'allow-scripts allow-same-origin'

				}
			});
	}
}
