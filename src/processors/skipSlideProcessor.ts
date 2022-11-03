import { CommentParser } from 'src/comment';
import { Options } from '../options';

export class SkipSlideProcessor {
	private slideCommentRegex = /<!--\s*(?:\.)?slide.*-->/;

	private parser = new CommentParser();

	process(markdown: string, options: Options) {
		let output = markdown;

		markdown
			.split(new RegExp(options.separator, 'gmi'))
			.map((slidegroup, index) => {
				return slidegroup
					.split(new RegExp(options.verticalSeparator, 'gmi'))
					.map((slide) => {

						let newSlide = slide;

						if (this.slideCommentRegex.test(slide)) {
							const [match] = this.slideCommentRegex.exec(slide);
							const comment = this.parser.parseLine(match);

							if (comment.hasAttribute("skip") && comment.getAttribute("skip") == "true") {
								newSlide = '<!-- slide data-visibility="hidden" -->';
							}
						}
						output = output.replace(slide, newSlide);
						return newSlide;
					})
					.join(options.verticalSeparator);
			})
			.join(options.separator);

		console.log(output);
		return output;
	}
}
