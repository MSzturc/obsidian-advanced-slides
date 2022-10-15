/* eslint-disable no-var */
import { ImageCollector } from 'src/imageCollector';
import { CommentParser } from '../comment';
import { ObsidianUtils } from '../obsidianUtils';

export class ImageProcessor {
	private utils: ObsidianUtils;
	private parser: CommentParser;

	private markdownImageRegex = /^[ ]{0,3}!\[([^\]]*)\]\((.*(?:jpg|png|jpeg|gif|bmp|webp|svg)?)\)\s?(<!--.*-->)?/gim;

	private obsidianImageRegex = /!\[\[(.*?(?:jpg|png|jpeg|gif|bmp|webp|svg))\s*\|?\s*([^\]]*)??\]\]\s?(<!--.*-->)?/ig;
	private obsidianImageReferenceRegex = /\[\[(.*?(?:jpg|png|jpeg|webp|gif|bmp|svg))\|?([^\]]*)??\]\]/gi;

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
				// Transform referenced images to absolute paths (ex. in bg annotation)
				if (this.obsidianImageReferenceRegex.test(line)) {
					return this.transformImageReferenceString(line);
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
	transformImageReferenceString(line: string): string {
		let result = line;

		let m;
		this.obsidianImageReferenceRegex.lastIndex = 0;

		while ((m = this.obsidianImageReferenceRegex.exec(result)) !== null) {
			if (m.index === this.obsidianImageReferenceRegex.lastIndex) {
				this.obsidianImageReferenceRegex.lastIndex++;
			}

			const [match, image] = m;
			const filePath = this.utils.findFile(image);
			result = result.replaceAll(match, filePath);
		}

		return result;
	}

	private transformImageString(line: string) {

		let result = "";

		let m;
		this.obsidianImageRegex.lastIndex = 0;

		while ((m = this.obsidianImageRegex.exec(line)) !== null) {
			if (m.index === this.obsidianImageRegex.lastIndex) {
				this.obsidianImageRegex.lastIndex++;
			}
			const [, image, ext, comment] = m;

			const filePath = this.utils.findFile(image);
			const commentAsString = this.buildComment(ext, comment) ?? '';
			result = result + `\n![](${filePath}) ${commentAsString}`;
		}
		return result;
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

		let result = "";

		let m;
		this.markdownImageRegex.lastIndex = 0;

		while ((m = this.markdownImageRegex.exec(line)) !== null) {
			if (m.index === this.markdownImageRegex.lastIndex) {
				this.markdownImageRegex.lastIndex++;
			}
			// eslint-disable-next-line prefer-const
			let [, alt, filePath, commentString] = m;

			if (alt && alt.includes('|')) {
				commentString = this.buildComment(alt.split('|')[1], commentString) ?? '';
			}

			const comment = this.parser.parseLine(commentString) ?? this.parser.buildComment('element');

			const isIcon = this.isIcon(filePath);

			if (result.length > 0) {
				result = result + '\n';
			}

			if (isIcon) {
				result = result + `<i class="${filePath}" ${this.parser.buildAttributes(comment)}></i>`;
			} else {
				if (ImageCollector.getInstance().shouldCollect()) {
					ImageCollector.getInstance().addImage(filePath);
				}

				if (filePath.startsWith('file:/')) {
					filePath = this.transformAbsoluteFilePath(filePath);
				}

				if (comment.hasStyle('width')) {
					comment.addStyle('object-fit', 'fill');
				}

				if (!comment.hasStyle('align-self')) {
					if (comment.hasAttribute('align')) {

						const align = comment.getAttribute('align');

						switch (align) {
							case 'left':
								comment.addStyle('align-self', 'start');
								break;
							case 'right':
								comment.addStyle('align-self', 'end');
								break;
							case 'center':
								comment.addStyle('align-self', 'center');
								break;
							case 'stretch':
								comment.addStyle('align-self', 'stretch');
								comment.addStyle('object-fit', 'cover');
								comment.addStyle('height', '100%');
								comment.addStyle('width', '100%');
								break;
							default:
								break;
						}
						comment.deleteAttribute('align');
					}
				}

				if (!comment.hasStyle('object-fit')) {
					comment.addStyle('object-fit', 'scale-down');
				}
				const imageHtml = `<img src="${filePath}" alt="${alt}" ${this.parser.buildAttributes(comment)}>`;
				result = result + imageHtml;
			}

		}
		return result + '\n';
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
