import { ItemView, MarkdownView, Menu, WorkspaceLeaf } from 'obsidian';

export const REVEAL_PREVIEW_VIEW = "reveal-preview-view";

export class RevealPreviewView extends ItemView {
	private url = 'about:blank';
	private home : URL;

	private urlRegex = /#\/(\d*)(?:\/(\d*))?(?:\/(\d*))?/;

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

		const url = new URL(msg.data);
		let filename = decodeURI(url.pathname);
		filename = filename.substring(filename.lastIndexOf("/")+1);

		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		if(view && view.file.name.includes(filename)){
			const line = this.getTargetLine(url, view.data);
			view.editor.setCursor(view.editor.lastLine());
			view.editor.setCursor({line: line, ch: 0});
		}

	}

	getTargetLine(url : URL, source: string) : number {
		const pageString = url.href.substring(url.href.lastIndexOf('#'));
		const [,h,v,s] = this.urlRegex.exec(pageString);

		if(h){
			let hSeparators : number = Number.parseInt(h);
			if(source.trim().startsWith('---')){
				hSeparators = hSeparators + 2;
			}

			const lines = source.split(/^/gm)
			.map((v, i) => v.match(/---/gm) ? i + 1 : 0)
			.filter(a => a);

			return lines[hSeparators-1];
		} 
		return 0;
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
