import { CommentParser } from "./comment";

export class FragmentProcessor {

	private parser: CommentParser;
	private fragmentCounter: number = 1;
	private orderedListRegex = /\d\) /g;

	constructor() {
		this.parser = new CommentParser();
	}

	process(markdown: string, options: any) {
		var output = markdown;

		markdown
			.split(new RegExp(options.separator, 'gmi'))
			.map((slidegroup) => {
				return slidegroup
					.split(new RegExp(options.verticalSeparator, 'gmi'))
					.map((slide) => {
						this.fragmentCounter = 1;

						var newSlide = slide.split('\n')
							.map((line) => {
								if (line.trim().startsWith("+ ") || this.orderedListRegex.test(line.trim())) {
									return this.transformLine(line);
								}
								return line;
							})
							.join('\n');
						output = output.replace(slide, newSlide);
						return newSlide;

					})
					.join(options.verticalSeparator);
			})
			.join(options.separator);

		return output;
	}

	transformLine(line: string) {
		var comment = this.parser.parseLine(line) ?? this.parser.buildComment('element');

		if (line.includes('<!--')) {
			line = line.substring(0, line.indexOf('<!--'));
		}

		line = line.replaceAll("+ ", "- ");
		line = line.replaceAll(this.orderedListRegex, '1. ');

		if (!comment.attributes.get('data-fragment-index')) {
			comment.attributes.set("data-fragment-index", this.fragmentCounter.toString());
			if (!comment.clazz.contains('fragment')) {
				comment.clazz.push('fragment');
			}
			this.fragmentCounter++;
		}
		var output = line + this.parser.commentToString(comment);
		return output;
	}

}
