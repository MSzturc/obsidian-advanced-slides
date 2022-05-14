import { CommentParser } from 'src/comment';
import { ObsidianUtils } from 'src/obsidianUtils';
import { Options } from 'src/options';

export class TemplateProcessor {
	private slideCommentRegex = /<!--\s*(?:\.)?slide.*-->/;
	private templateCommentRegex = /<!--\s*(?:\.)?slide.*(template="\[\[([^\]]+)\]\]"\s*).*-->/;
	private propertyRegex = /:::\s([^\n]+)\s*(.*?:::[^\n]*)/sg;

	private optionalRegex = /<%\?.*%>/g;

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
		try {
			if (this.templateCommentRegex.test(slide)) {
				const [, templateProperty, file] = this.templateCommentRegex.exec(slide);
				const templateFile = this.utils.findFile(file);
				const absoluteTemplateFile = this.utils.absolute(templateFile);
				let templateContent = this.utils.parseFile(absoluteTemplateFile, null);
				templateContent = templateContent.replaceAll('<% content %>', slide);

				this.propertyRegex.lastIndex = 0;

				let m;
				while ((m = this.propertyRegex.exec(slide)) !== null) {
					if (m.index === this.propertyRegex.lastIndex) {
						this.propertyRegex.lastIndex++;
					}
					let [match, name, content] = m;

					if (name == 'block') continue;

					content = '::: block\n' + content;
					const optionalName = '<%? ' + name.trim() + ' %>';
					name = '<% ' + name.trim() + ' %>';
					templateContent = templateContent.replaceAll(optionalName, content);
					templateContent = templateContent.replaceAll(name, content);
					templateContent = templateContent.replaceAll(match, '');
				}
				//Remove optional template variables
				while ((m = this.optionalRegex.exec(templateContent)) !== null) {
					if (m.index === this.optionalRegex.lastIndex) {
						this.optionalRegex.lastIndex++;
					}
					const [match] = m;
					templateContent = templateContent.replaceAll(match, '');
				}

				templateContent = templateContent.replaceAll(templateProperty, '');

				return templateContent;
			} else {
				return slide;
			}
		} catch (error) {
			return slide;
		}

	}
}
