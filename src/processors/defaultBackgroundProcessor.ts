import { CommentParser } from 'src/comment';
import { Options } from 'src/options';

export class DefaultBackgroundProcessor {
	private slideCommentRegex = /<!--\s*(?:\.)?slide.*-->/;

	private parser = new CommentParser();

	process(markdown: string, options: Options) {
		let output = markdown;

		if (options?.bg) {

			if (options?.bg == 'transparent' || options?.bg == 'rgba(0,0,0,0)') {

				output = `<style>
body {
	background-color: rgba(0,0,0,0) !important;
}
</style>
` + output;
			}

			markdown
				.split(new RegExp(options.separator, 'gmi'))
				.map(slidegroup => {
					return slidegroup
						.split(new RegExp(options.verticalSeparator, 'gmi'))
						.map(slide => {
							if (slide) {
								const newSlide = this.transformSlide(slide, options?.bg);
								output = output.split(slide).join(newSlide);
								return newSlide;
							} else {
								return slide;
							}
						})
						.join(options.verticalSeparator);
				})
				.join(options.separator);
		}
		return output;
	}

	transformSlide(slide: string, bg: string) {
		if (this.slideCommentRegex.test(slide)) {
			const [match] = this.slideCommentRegex.exec(slide);
			const comment = this.parser.parseLine(match);
			if (!comment.hasAttribute('data-background-image') && !comment.hasAttribute('data-background-color')) {
				comment.addAttribute('bg', bg);
			}
			return slide.replace(this.slideCommentRegex, this.parser.commentToString(comment));
		} else {
			return slide + `\n<!-- slide bg="${bg}" -->\n`;
		}
	}
}
