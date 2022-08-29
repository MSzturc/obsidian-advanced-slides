import { CommentParser } from 'src/comment';
import { Options } from 'src/options';

export class DropProcessor {
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
						if (slide.trim().length > 0) {
							const newSlide = this.transformSlide(slide);
							const split = output.split(slide);
							if (split.length == 2) {
								output = split.join(newSlide);

							} else {
								const right = split.splice(1).join(slide);
								const left = split[0];
								const both = [left, right];
								output = both.join(newSlide);
							}
							return newSlide;
						} else {
							return slide;
						}

					})
					.join(options.verticalSeparator);
			})
			.join(options.separator);

		return output;
	}

	transformSlide(slide: string) {
		const [md, notes] = this.extractNotes(slide);

		let outMd, outSlideComment;

		if (this.slideCommentRegex.test(md)) {
			const [match] = this.slideCommentRegex.exec(md);
			const comment = this.parser.parseLine(match);
			comment.addClass('drop');

			outMd = md.replace(this.slideCommentRegex, '');
			outMd = outMd.trim();

			outSlideComment = this.parser.commentToString(comment);

		} else {
			outMd = md.trim();
			outSlideComment = '<!-- .slide: class="drop" -->';
		}

		let out = `${outSlideComment}\n<grid absolute="true" drag="100 100" drop="0 0">\n${outMd}\n</grid>`;

		if (notes.length > 0) {
			out += '\n\n' + notes;
		}
		return out;
	}

	extractNotes(input: string): [string, string] {
		const spliceIdx = input.indexOf('note:');
		if (spliceIdx > 0) {
			return [input.substring(0, spliceIdx), input.substring(spliceIdx)];
		} else {
			return [input, ''];
		}
	}
}
