import { CommentParser } from '../comment';
import { Options } from '../options';

export class FragmentProcessor {
	private parser: CommentParser;
	private fragmentCounter = 1;
	private orderedListRegex = /\d\) /g;
	private codeBlockRegex = /```[^\n]*(?:\n[^`]*\n)```/g;

	constructor() {
		this.parser = new CommentParser();
	}

	process(markdown: string, options: Options) {
		const separatorRegexp = new RegExp(`${options.separator}|${options.verticalSeparator}`, 'gmi');

		// Detect line ranges containing Markdown code blocks so we can ignore them
		const codeBlockLines = Array.from(markdown.matchAll(this.codeBlockRegex)).map(({ 0: match, index }) => ({
			from: markdown.substring(0, index).split('\n').length - 1,
			to: markdown.substring(0, index + match.length).split('\n').length - 1,
		}));

		const output = markdown
			.split('\n')
			.map((line, lineNumber) => {
				if (`\n${line}\n`.match(separatorRegexp)) {
					// Reset counter when encountered slide separator
					this.fragmentCounter = 1;
					return line;
				}

				const isCodeblockLine = codeBlockLines.some(({ from, to }) => lineNumber >= from && lineNumber <= to);
				if (isCodeblockLine) {
					return line;
				}

				if (line.trim().startsWith('+ ') || this.orderedListRegex.test(line.trim())) {
					return this.transformLine(line);
				}
				return line;
			})
			.join('\n');

		return output;
	}

	transformLine(line: string) {
		const comment = this.parser.parseLine(line) ?? this.parser.buildComment('element');

		if (line.includes('<!--')) {
			line = line.substring(0, line.indexOf('<!--'));
		}

		line = line.replaceAll('+ ', '- ');
		line = line.replaceAll(this.orderedListRegex, '1. ');

		if (!comment.hasAttribute('data-fragment-index')) {
			comment.addAttribute('data-fragment-index', this.fragmentCounter.toString());
			if (!comment.hasClass('fragment')) {
				comment.addClass('fragment');
			}
			this.fragmentCounter++;
		}
		const output = line + this.parser.commentToString(comment);
		return output;
	}
}
