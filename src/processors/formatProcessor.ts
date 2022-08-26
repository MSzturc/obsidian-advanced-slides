export class FormatProcessor {
	private boldRegex = /(?<=[^_]|^)__([^_]+)__(?!_)/gm;
	private markRegex = /==([^=]*)==/gm;
	private commentRegex = /%%([^%]*)%%/gm;

	process(markdown: string) {

		let insideCodeBlock = false;

		return markdown.split('\n')
			.map((line) => {
				if (line.indexOf('```') > -1) {
					insideCodeBlock = !insideCodeBlock;
				}

				if (insideCodeBlock) {
					return line;
				}
				else {
					return line
						.replaceAll(this.boldRegex, (sub, args) => `**${args.trim()}**`)
						.replaceAll(this.markRegex, '<mark>$1</mark>')
						.replaceAll(this.commentRegex, '');
				}
			})
			.join('\n')
			.replaceAll(this.commentRegex, '');
	}
}
