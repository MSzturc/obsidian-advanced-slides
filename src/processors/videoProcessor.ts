/* eslint-disable no-var */
import { VideoCollector } from 'src/videoCollector';
import { CommentParser } from '../comment';
import { ObsidianUtils } from '../obsidianUtils';

export class VideoProcessor {
	private utils: ObsidianUtils;
	private parser: CommentParser;

	private markdownVideoRegex = /^[ ]{0,3}!\[([^\]]*)\]\((.*(?:mp4)?)\)\s?(<!--.*-->)?/gim;

	private obsidianVideoRegex = /!\[\[(.*?(?:mp4))\s*\|?\s*([^\]]*)??\]\]\s?(<!--.*-->)?/ig;
	private obsidianVideoReferenceRegex = /\[\[(.*?(?:mp4))\|?([^\]]*)??\]\]/gi;

	private htmlVideoRegex = /<\s*video[^>]*>(\s*)(.*?)(\s*)<\s*\/\s*video>/gim;
	private htmlSrcRegex = /src="[^\s]*/im;

	constructor(utils: ObsidianUtils) {
		this.utils = utils;
		this.parser = new CommentParser();
	}

	process(markdown: string) {
		return markdown
			.split('\n')
			.map(line => {
				// Transform ![[myVideo.mp4]] to ![](myVideo.mp4)
				if (this.obsidianVideoRegex.test(line)) {
					return this.transformVideoString(line);
				}
				// Transform referenced videos to absolute paths (ex. in bg annotation)
				if (this.obsidianVideoReferenceRegex.test(line)) {
					return this.transformVideoReferenceString(line);
				}
				return line;
			})
			.map(line => {
				// Transform ![](myVideo.mp4) to html
				if (this.markdownVideoRegex.test(line)) {
					return this.htmlify(line); 
				} else if (this.htmlVideoRegex.test(line) && this.htmlSrcRegex.test(line)) {
					// The video is inserted as html already. Just add it to the collector
					// Find the source tag to get the file path
					// Remove the absolute path from the html
					if (VideoCollector.getInstance().shouldCollect()) {
						const srcMatch = this.htmlSrcRegex.exec(line);
						const srcString = srcMatch[0];
						const filePath = srcString.substring("src=/\"".length, srcString.length - 1);
						VideoCollector.getInstance().addVideo(filePath);
						const newVideoHtml = line.slice(0, srcMatch["index"] + "src=\"".length) + line.slice(srcMatch["index"] + "src=\"/".length);
						return newVideoHtml;
					}
					return line;
				} else {
					return line;
				}
			})
			.join('\n');
	}
	transformVideoReferenceString(line: string): string {
		let result = line;

		let m;
		this.obsidianVideoReferenceRegex.lastIndex = 0;

		while ((m = this.obsidianVideoReferenceRegex.exec(result)) !== null) {
			if (m.index === this.obsidianVideoReferenceRegex.lastIndex) {
				this.obsidianVideoReferenceRegex.lastIndex++;
			}

			const [match, image] = m;
			const filePath = this.utils.findFile(image);
			result = result.replaceAll(match, filePath);
		}

		return result;
	}

	private transformVideoString(line: string) {

		let result = "";

		let m;
		this.obsidianVideoRegex.lastIndex = 0;

		while ((m = this.obsidianVideoRegex.exec(line)) !== null) {
			if (m.index === this.obsidianVideoRegex.lastIndex) {
				this.obsidianVideoRegex.lastIndex++;
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
		this.markdownVideoRegex.lastIndex = 0;

		while ((m = this.markdownVideoRegex.exec(line)) !== null) {
			if (m.index === this.markdownVideoRegex.lastIndex) {
				this.markdownVideoRegex.lastIndex++;
			}
			// eslint-disable-next-line prefer-const
			let [, alt, filePath, commentString] = m;

			if (alt && alt.includes('|')) {
				commentString = this.buildComment(alt.split('|')[1], commentString) ?? '';
			}

			const comment = this.parser.parseLine(commentString) ?? this.parser.buildComment('element');

			if (result.length > 0) {
				result = result + '\n';
			}

			if (VideoCollector.getInstance().shouldCollect()) {
				VideoCollector.getInstance().addVideo(filePath);
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
			const videoHtml = `<video data-autoplay="" controls="" loop="" data-paused-by-reveal=""> <source src="${filePath}" alt="${alt}" ${this.parser.buildAttributes(comment)} type="video/mp4"></video>`;
			result = result + videoHtml;

		}
		return result + '\n';
	}

	private transformAbsoluteFilePath(path: string) {
		const pathURL = new URL(path);
		if (pathURL) {
			return '/localFileSlash' + pathURL.pathname;
		}
		return path;
	}
}
