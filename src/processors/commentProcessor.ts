import { CommentParser } from 'src/comment';

export class CommentProcessor {
	private readCommentRegex = /<!--.*-->/;

	private parser: CommentParser = new CommentParser();

	process(markdown: string) {
		return markdown
			.split('\n')
			.map(line => {
				if (this.parser.lineHasComment(line)) {
					return line.replace(this.readCommentRegex, this.parser.commentToString(this.parser.parseLine(line)));
				} else {
					return line;
				}
			})
			.join('\n');
	}
}
