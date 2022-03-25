/* eslint-disable no-var */
import { ImageCollector } from 'src/imageCollector';
import { CommentParser } from '../comment';
import { ObsidianUtils } from '../obsidianUtils';

export class ImageProcessor {
	private utils: ObsidianUtils;
	private parser: CommentParser;

	private markdownImageRegex = /^[ ]{0,3}!\[([^\]]*)\]\((.*?)\)\s?(<!--.*-->)?/im;

	private obsidianImageRegex = /!\[\[(.*(?:jpg|png|jpeg|gif|bmp|svg))\|?([^\]]*)??\]\]\s?(<!--.*-->)?/i;

	constructor(utils: ObsidianUtils) {
		this.utils = utils;
		this.parser = new CommentParser();
	}

	process(markdown: string) {
		return markdown
			.split('\n')
			.map(line => {
				// Transform ![[myImage.png]] to ![](myImage.png)
				if (this.obsidianImageRegex.test(line)) {
					return this.transformImageString(line);
				}
				return line;
			})
			.map(line => {
				// Transform ![](myImage.png) to html
				if (this.markdownImageRegex.test(line)) {
					return this.htmlify(line);
				} else {
					return line;
				}
			})
			.join('\n');
	}

	private transformImageString(line: string) {
		const [, image, ext, comment] = this.obsidianImageRegex.exec(line);

		const filePath = this.utils.findFile(image);
		const commentAsString = this.buildComment(ext, comment) ?? '';

		return `![](${filePath}) ${commentAsString}`;
	}

	private buildComment(ext: string, commentAsString: string) {
		const comment = commentAsString ? this.parser.parseComment(commentAsString) : this.parser.buildComment('element');

		if (ext) {
			if (ext.includes('x')) {
				var [width, height] = ext.split('x');
			} else {
				var width = ext;
			}
			comment.addStyle('width', `${width}px`);

			if (height) {
				comment.addStyle('height', `${height}px`);
			}
		}
		return this.parser.commentToString(comment);
	}

	private htmlify(line: string) {
		// eslint-disable-next-line prefer-const
		let [, alt, filePath, commentString] = this.markdownImageRegex.exec(line);
		const comment = this.parser.parseLine(commentString) ?? this.parser.buildComment('element');

		const isIcon = this.isIcon(filePath);

		if (isIcon) {
			return `<i class="${filePath}" ${this.parser.buildAttributes(comment)}></i>`;
		} else {
			if (ImageCollector.getInstance().shouldCollect()) {
				ImageCollector.getInstance().addImage(filePath);
			}

			if (filePath.startsWith('file:/')) {
				filePath = this.transformAbsoluteFilePath(filePath);
			}

			const imageHtml = `<img src="${filePath}" alt="${alt}" ${this.parser.buildAttributes(comment)}></img>`;
			const pHtml = `<p ${this.parser.buildAttributes(
				this.parser.buildComment('element', ['line-height: 0'], ['reset-paragraph']),
			)}>${imageHtml}</p>\n`;
			return pHtml;
		}
	}

	private isIcon(path: string) {
		return path.startsWith('fas') || path.startsWith('far') || path.startsWith('fal') || path.startsWith('fad') || path.startsWith('fab');
	}

	private transformAbsoluteFilePath(path: string) {
		const pathURL = new URL(path);
		if (pathURL) {
			return '/localFileSlash' + pathURL.pathname;
		}
		return path;
	}
}
