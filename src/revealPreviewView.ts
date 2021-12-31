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
			const pageString = url.href.substring(url.href.lastIndexOf('#'));
			const [,h,v,s] = this.urlRegex.exec(pageString);

			if(h){
				const str = view.data.trim();
				let target : number = Number.parseInt(h);
				if(str.startsWith('---')){
					target = target + 2;
				}

				const split = str.split('\n');

				for (let idx = 0; idx < split.length; idx++) {
					const element = split[idx];
					if(element.includes('---')){
						target = target - 1;
					}
					if(target < 1){
						view.editor.setCursor(view.editor.lastLine());
						view.editor.setCursor({line: idx, ch: 0});
						break;
					}
				}


			} else {
				view.editor.scrollTo(1);
			}
		}

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
