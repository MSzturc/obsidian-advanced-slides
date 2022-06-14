import { ItemView, MarkdownView, Menu, WorkspaceLeaf } from 'obsidian';
import { AdvancedSlidesSettings } from './main';
import { Options } from './options';
import { YamlParser } from './yamlParser';

export const REVEAL_PREVIEW_VIEW = 'reveal-preview-view';

export class RevealPreviewView extends ItemView {
	url = 'about:blank';
	private home: URL;

	private urlRegex = /#\/(\d*)(?:\/(\d*))?(?:\/(\d*))?/;
	private yaml: YamlParser;

	constructor(leaf: WorkspaceLeaf, home: URL, settings: AdvancedSlidesSettings) {
		super(leaf);
		this.home = home;
		this.yaml = new YamlParser(settings);

		this.addAction('slides', 'Open in Browser', () => {
			window.open(home);
		});

		this.addAction('grid', 'Show Grid', () => {
			settings.showGrid = !settings.showGrid;
			this.reloadIframe();
		});

		this.addAction('refresh', 'Refresh Slides', () => {
			this.reloadIframe();
		});

		window.addEventListener('message', this.onMessage.bind(this));
	}

	onMoreOptionsMenu(menu: Menu): void {
		super.onMoreOptionsMenu(menu);

		menu.addSeparator();
		menu.addItem(item => {
			item
				.setIcon('document')
				.setTitle('Print Presentation')
				.onClick(() => {
					window.open(this.home.toString() + '?print-pdf');
				});
		});
		menu.addItem(item => {
			item
				.setIcon('install')
				.setTitle('Export as html')
				.onClick(() => {
					const url = new URL(this.url);
					url.searchParams.append('export', 'true');
					this.setUrl(url.toString());
				});
		});
	}

	onMessage(msg: MessageEvent) {
		if (msg.data.includes('?export')) {
			this.setUrl(msg.data.split('?')[0]);
			return;
		}

		this.setUrl(msg.data, false);

		const url = new URL(msg.data);
		let filename = decodeURI(url.pathname);
		filename = filename.substring(filename.lastIndexOf('/') + 1);

		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (view && view.file.name.includes(filename)) {
			const line = this.getTargetLine(url, view.data);
			view.editor.setCursor(view.editor.lastLine());
			view.editor.setCursor({ line: line, ch: 0 });
		}
	}

	onLineChanged(line: number) {
		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		const viewContent = this.containerEl.children[1];
		const iframe = viewContent.getElementsByTagName('iframe')[0];

		if (view && iframe) {
			const [x, y] = this.getTargetSlide(line, view.data);
			iframe.contentWindow.postMessage(`{"method":"setState","args":[{"indexh":${x},"indexv":${y},"paused":false}]}`, this.url);
		}
	}

	getTargetSlide(line: number, source: string): [number, number] {
		const { yamlOptions, markdown } = this.yaml.parseYamlFrontMatter(source);
		const separators = this.yaml.getSlideOptions(yamlOptions);
		const yamlLength = source.indexOf(markdown);
		const offset = source.substring(0, yamlLength).split(/^/gm).length;
		const slides = this.getSlideLines(markdown, separators);

		const cursorPosition = line - (offset > 0 ? offset - 1 : 0);

		let resultKey = null;
		for (const [key, value] of slides.entries()) {
			if (value <= cursorPosition) {
				resultKey = key;
			} else {
				break;
			}
		}

		if (resultKey) {
			const keys = resultKey.split(',');
			return [Number.parseInt(keys[0]), Number.parseInt(keys[1])];
		} else {
			return [0, 0];
		}
	}

	getTargetLine(url: URL, source: string): number {
		const pageString = url.href.substring(url.href.lastIndexOf('#'));
		const [, h, v] = this.urlRegex.exec(pageString);
		const { yamlOptions, markdown } = this.yaml.parseYamlFrontMatter(source);
		const separators = this.yaml.getSlideOptions(yamlOptions);
		const yamlLength = source.indexOf(markdown);
		const offset = source.substring(0, yamlLength).split(/^/gm).length;
		const slides = this.getSlideLines(markdown, separators);

		const hX = parseInt(h) || 0;
		const vX = parseInt(v) || 0;

		return slides.get([hX, vX].join(',')) + offset;
	}

	getSlideLines(source: string, separators: Options) {
		let store = new Map<number, string>();

		const l = this.getIdxOfRegex(/^/gm, source);
		const h = this.getIdxOfRegex(RegExp(separators.separator, 'gm'), source);

		for (const item of h) {
			for (let index = 0; index < l.length; index++) {
				const line = l[index];
				if (line > item) {
					store.set(index, 'h');
					break;
				}
			}
		}

		const v = this.getIdxOfRegex(RegExp(separators.verticalSeparator, 'gm'), source);

		for (const item of v) {
			for (let index = 0; index < l.length; index++) {
				const line = l[index];
				if (line > item) {
					store.set(index, 'v');
					break;
				}
			}
		}

		store.set(0, 'h');

		store = new Map(
			[...store].sort((a, b) => {
				return a[0] - b[0];
			}),
		);

		const result = new Map<string, number>();

		let hV = -1;
		let vV = 0;
		for (const [key, value] of store.entries()) {
			if (value == 'h') {
				hV++;
				vV = 0;
			}

			if (value == 'v') {
				vV++;
			}

			result.set([hV, vV].join(','), key);
		}
		return result;
	}

	getIdxOfRegex(regex: RegExp, source: string): number[] {
		const idxs: Array<number> = new Array<number>();
		let m;
		do {
			m = regex.exec(source);
			if (m) {
				if (m.index === regex.lastIndex) {
					regex.lastIndex++;
				}
				idxs.push(m.index);
			}
		} while (m);
		return idxs;
	}

	getViewType() {
		return REVEAL_PREVIEW_VIEW;
	}

	getDisplayText() {
		return 'Slide Preview';
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
		window.removeEventListener('message', this.onMessage);
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
		viewContent.createEl('iframe', {
			attr: {
				// @ts-ignore:
				src: this.url,
				sandbox: 'allow-scripts allow-same-origin allow-popups',
			},
		});
	}
}
