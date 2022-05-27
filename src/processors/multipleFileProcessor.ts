import { ObsidianUtils } from '../obsidianUtils';

export class MultipleFileProcessor {
	private utils: ObsidianUtils;

	private regex = /!\[\[(.*)\]\]/gm;
	private obsidianImageRegex = /!\[\[(.*(?:jpg|png|jpeg|gif|bmp|webp|svg))\s*\|?\s*([^\]]*)??\]\]\s?(<!--.*-->)?/i;
	private excalidrawRegex = /(.*\.excalidraw)/i;

	constructor(utils: ObsidianUtils) {
		this.utils = utils;
	}

	process(markdown: string): string {
		return markdown
			.split('\n')
			.map((line, index) => {
				if (this.regex.test(line) && !this.obsidianImageRegex.test(line)) {
					return this.transformLine(line);
				}
				return line;
			})
			.join('\n');
	}

	private transformLine(line: string) {

		let comment = '';
		if (line.includes('<!--')) {
			comment = line.substring(line.indexOf('<!--'));
		}

		let link: string = line.replace('![[', '').replace(']]', '').replace(comment, '').trim();
		let header: string = null;

		if (link.includes('#')) {
			const split = link.split('#');
			link = split[0];
			header = split[1];
		}

		const fileName = this.getMarkdownFile(link);

		if (fileName === null) {
			return line;
		}

		const content = this.utils.parseFile(fileName, header);

		if (content) {
			if (comment.length > 0) {
				return this.process(content + comment);
			} else {
				return this.process(content);
			}

		} else {
			return line;
		}

	}

	private getMarkdownFile(line: string) {
		if (this.excalidrawRegex.test(line)) {
			return null; // Do not import excalidraw files
		}

		let file = line;
		if (!line.toLowerCase().endsWith('.md')) {
			file = file + '.md';
		}
		return file;
	}
}
