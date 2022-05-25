import { ObsidianUtils } from '../obsidianUtils';

export class MultipleFileProcessor {
	private utils: ObsidianUtils;

	private regex = /!\[\[(.*)\]\]/gm;
	private excalidrawRegex = /(.*\.excalidraw)/i;

	constructor(utils: ObsidianUtils) {
		this.utils = utils;
	}

	process(markdown: string): string {
		return markdown
			.split('\n')
			.map((line, index) => {
				if (this.regex.test(line)) return this.transformLine(line);
				return line;
			})
			.join('\n');
	}

	private transformLine(line: string) {
		let link: string = line.replace('![[', '').replace(']]', '');
		let header: string = null;

		if (link.includes('#')) {
			const split = link.split('#');
			link = split[0];
			header = split[1];
		}

		const res = this.getMarkdownFile(link);

		if (res === null) {
			return line;
		}

		return this.process(this.utils.parseFile(res, header));
	}

	private getMarkdownFile(line: string) {
		if (this.excalidrawRegex.test(line)) {
			return null; // Do not import excalidraw files
		}

		let file = line;
		if (!line.toLowerCase().endsWith('.md')) {
			file = file + '.md';
		}
		return this.utils.getAbsolutePath(file);
	}
}
