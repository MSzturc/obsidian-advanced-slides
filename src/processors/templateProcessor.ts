import { CommentParser } from 'src/comment';
import { ObsidianUtils } from 'src/obsidianUtils';
import { Options } from 'src/options';

export class TemplateProcessor {
	private slideCommentRegex = /<!--\s*(?:\.)?slide.*-->/;
	private templateCommentRegex = /<!--\s*(?:\.)?slide.*template="\[\[([^\]]+)\].*-->/;

	private utils: ObsidianUtils;
	private parser = new CommentParser();

	constructor(utils: ObsidianUtils) {
		this.utils = utils;
	}

	process(markdown: string, options: Options) {
		let output = markdown;

		markdown
			.split(new RegExp(options.separator, 'gmi'))
			.map(slidegroup => {
				return slidegroup
					.split(new RegExp(options.verticalSeparator, 'gmi'))
					.map(slide => {
						if (this.slideCommentRegex.test(slide)) {
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
		if (this.templateCommentRegex.test(slide)) {
			const [, file] = this.templateCommentRegex.exec(slide);
			const templateFile = this.utils.findFile(file);
			const absoluteTemplateFile = this.utils.absolute(templateFile);
			const templateContent = this.utils.parseFile(absoluteTemplateFile, null);
			return templateContent.replaceAll(/<<<Content>>>/g, slide);
		} else {
			return slide;
		}
	}
}
