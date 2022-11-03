export class LatexProcessor {
	private singleLine = /\$(.*?)\$/g;

	process(markdown: string) {
		const withoutEscapedCharaters = this.markEscapedCharacters(markdown);
		const processedMultiline = this.processMultiLine(withoutEscapedCharaters);
		const multiWithoutEscapedCharaters = this.markEscapedCharacters(processedMultiline);
		const processedSingleLine = this.processSingleLine(multiWithoutEscapedCharaters);
		const finalResult = this.unmarkEscapedCharacters(processedSingleLine);
		return finalResult;
	}

	private markEscapedCharacters(markdown: string) {
		return (
			markdown
				//Escaped $ signs
				.replaceAll('\\$', '~~d~~')
				//Multiline in backticks
				.replaceAll(/`\$\$/gm, '~~s~~')
				.replaceAll(/\$\$`/gm, '~~e~~')
				//Singleline in backticks
				.replaceAll(/`\$/gm, '~~ss~~')
				.replaceAll(/\$`/gm, '~~se~~')
		);
	}

	private unmarkEscapedCharacters(markdown: string) {
		return markdown
			.replaceAll('~~d~~', '\\$')
			.replaceAll('~~e~~', '$$$$`')
			.replaceAll('~~s~~', '`$$$$')
			.replaceAll('~~ss~~', '`$')
			.replaceAll('~~se~~', '$$`');
	}

	private processSingleLine(markdown: string) {
		return markdown
			.split('\n')
			.map(line => {
				if (line.includes('$')) {
					line = line.replaceAll(this.singleLine, '`$$$1$$`');
				}
				return line;
			})
			.join('\n');
	}

	private processMultiLine(markdown: string) {
		if (markdown.includes('$$')) {
			return markdown
				.split('$$')
				.map((line, index) => {
					if (this.isOdd(index)) {
						return line;
					} else {
						return '`' + line + '`';
					}
				})
				.join('$$')
				.slice(1, -1);
		}
		return markdown;
	}

	private isOdd(number: number) {
		return number & 1;
	}
}
