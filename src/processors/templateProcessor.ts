import { CommentParser } from 'src/comment';
import { ObsidianUtils } from 'src/obsidianUtils';
import { Options } from 'src/options';
import { MultipleFileProcessor } from './multipleFileProcessor';

export class TemplateProcessor {

	private multipleFileProcessor: MultipleFileProcessor;

	private emptySlideCommentRegex = /<!--\s*(?:\.)?slide(?::)?\s*-->/g;
	private templateCommentRegex = /<!--\s*(?:\.)?slide.*(template="\[\[([^\]]+)\]\]"\s*).*-->/;
	private propertyRegex = /:::\s([^\n]+)\s*(.*?:::[^\n]*)/sg;

	private optionalRegex = /<%\?.*%>/g;

	private utils: ObsidianUtils;
	private parser = new CommentParser();

	constructor(utils: ObsidianUtils) {
		this.utils = utils;
		this.multipleFileProcessor = new MultipleFileProcessor(utils);
	}

	process(markdown: string, options: Options) {
		let output = markdown;

		markdown
			.split(new RegExp(options.separator, 'gmi'))
			.map(slidegroup => {
				return slidegroup
					.split(new RegExp(options.verticalSeparator, 'gmi'))
					.map(slide => {

						let newSlide = slide;
						if (this.templateCommentRegex.test(slide)) {
							while (this.templateCommentRegex.test(newSlide)) {
								newSlide = this.transformSlide(newSlide);
							}
							newSlide = newSlide.replaceAll(this.emptySlideCommentRegex, '');
							newSlide = this.computeVariables(newSlide);
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
				templateContent = this.multipleFileProcessor.process(templateContent);
				templateContent = templateContent.replaceAll('<% content %>', slide.replaceAll(templateProperty, ''));
				return templateContent;
			} else {
				return slide;
			}
		} catch (error) {
			return slide;
		}

	}

	computeVariables(slide: string): string {

		let result = slide;
		this.propertyRegex.lastIndex = 0;

		let m;
		while ((m = this.propertyRegex.exec(result)) !== null) {
			if (m.index === this.propertyRegex.lastIndex) {
				this.propertyRegex.lastIndex++;
			}

			// eslint-disable-next-line prefer-const
			let [match, name, content] = m;

			if (name == 'block') continue;

			content = '::: block\n' + content;
			const optionalName = '<%? ' + name.trim() + ' %>';
			name = '<% ' + name.trim() + ' %>';
			result = result.replaceAll(optionalName, content);
			result = result.replaceAll(name, content);
			result = result.replaceAll(match, '');
		}
		//Remove optional template variables
		while ((m = this.optionalRegex.exec(result)) !== null) {
			if (m.index === this.optionalRegex.lastIndex) {
				this.optionalRegex.lastIndex++;
			}
			const [match] = m;
			result = result.replaceAll(match, '');
		}
		return result;
	}
}
