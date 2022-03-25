import { CommentParser } from 'src/comment';
import { Options } from 'src/options';

export class DropProcessor {
	private dropRegex = /drop="[^"]+"/;
	private slideCommentRegex = /<!--\s*(?:\.)?slide.*-->/;

	private parser = new CommentParser();

	process(markdown: string, options: Options) {
		let output = markdown;

		markdown
			.split(new RegExp(options.separator, 'gmi'))
			.map(slidegroup => {
				return slidegroup
					.split(new RegExp(options.verticalSeparator, 'gmi'))
					.map(slide => {
						if (this.dropRegex.test(slide)) {
							const newSlide = this.transformSlide(slide);
							output = output.split(slide).join(newSlide);
							return newSlide;
						}
						return slide;
					})
					.join(options.verticalSeparator);
			})
			.join(options.separator);

		return output;
	}

	transformSlide(slide: string) {
		if (this.slideCommentRegex.test(slide)) {
			const [match] = this.slideCommentRegex.exec(slide);
			const comment = this.parser.parseLine(match);
			comment.addClass('drop');
			return slide.replace(this.slideCommentRegex, this.parser.commentToString(comment));
		} else {
			return slide + '\n<!-- .slide: class="drop" -->\n';
		}
	}
}
