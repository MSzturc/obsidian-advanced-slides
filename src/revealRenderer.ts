import { readFile } from "fs-extra";
import { join, basename, extname } from 'path';
import { glob } from "glob";
import Mustache from "mustache";
import { loadFront } from "yaml-front-matter";
import { md } from "./markdown";

import _ from "lodash"
import defaults from "./defaults.json";
import { ObsidianMarkdownPreprocessor } from "./obsidianMarkdownPreprocessor";
import { ObsidianUtils } from "./obsidianUtils";

export class RevealRenderer {

	private processor: ObsidianMarkdownPreprocessor;
	private pluginDirectory: string;

	constructor(utils: ObsidianUtils) {
		this.pluginDirectory = utils.getPluginDirectory();
		this.processor = new ObsidianMarkdownPreprocessor(utils);
	}

	async renderFile(filePath: string) {
		const content = (await readFile(filePath.toString())).toString();
		return await this.render(content);
	}

	async render(input: string) {
		const { yamlOptions, markdown } = this.parseYamlFrontMatter(input);
		const options = this.getSlideOptions(yamlOptions);
		const revealOptions = this.getRevealOptions(options);

		const { title } = options;
		const themeUrl = this.getThemeUrl(options.theme);
		const highlightThemeUrl = this.getHighlightThemeUrl(options.highlightTheme);

		const slidifyOptions = this.getSlidifyOptions(options);

		const processedMarkdown = this.processor.process(markdown,options);
		const slides = this.slidify(processedMarkdown, slidifyOptions);

		const cssPaths = this.getCssPaths(options.css);

		const context = Object.assign(options, {
			title,
			slides,
			themeUrl,
			highlightThemeUrl,
			cssPaths,
			revealOptionsStr: JSON.stringify(revealOptions)
		});

		const template = await this.getTemplate();
		const result = Mustache.render(template, context);
		return result;
	}

	private isValidUrl(input: string): boolean {
		try {
			new URL(input);
			return true;
		} catch (_) { 
			return false;
		}
	}

	private getHighlightThemeUrl(theme: string) {
		
		if(this.isValidUrl(theme)){
			return theme;
		}

		const highlightThemes = glob.sync('plugin/highlight/*.css', { cwd: this.pluginDirectory });

		const highlightTheme = highlightThemes.find(
			themePath => basename(themePath).replace(extname(themePath), '') === theme
		);

		return highlightTheme ? '/' + highlightTheme : '/' + theme;
	}

	private getThemeUrl(theme: string) {
		
		if(this.isValidUrl(theme)){
			return theme;
		}

		const revealThemes = glob.sync('dist/theme/*.css', { cwd: this.pluginDirectory });

		const revealTheme = revealThemes.find(
			themePath => basename(themePath).replace(extname(themePath), '') === theme
		);

		return revealTheme ? '/' + revealTheme : '/' + theme;
	}

	private async getTemplate() {
		const templateFile = join(this.pluginDirectory, defaults.template);
		const content = (await readFile(templateFile.toString())).toString();
		return content;
	}

	private slidify(markdown: string, slidifyOptions: unknown) {
		return md.slidify(markdown, slidifyOptions);
	}

	private getSlideOptions(options: unknown) {
		return _.defaults({}, options, defaults);
	}

	private getSlidifyOptions(options: unknown) {
		const slidifyProps = ['separator', 'verticalSeparator'];
		return _.pick(options, slidifyProps)
	}

	private getRevealOptions(options: unknown) {
		const revealProps = ['width', 'height', 'margin', 'minScale', 'maxScale', 'controls', 'controlsTutorial', 'controlsLayout', 'controlsBackArrows', 'progress', 'slideNumber', 'showSlideNumber', 'hashOneBasedIndex', 'hash', 'respondToHashChanges', 'history', 'keyboard', 'keyboardCondition', 'disableLayout', 'overview', 'center', 'touch', 'loop', 'rtl', 'navigationMode', 'shuffle', 'fragments', 'fragmentInURL', 'embedded', 'help', 'pause', 'showNotes', 'autoPlayMedia', 'preloadIframes', 'autoAnimate', 'autoAnimateMatcher', 'autoAnimateEasing', 'autoAnimateDuration', 'autoAnimateUnmatched', 'autoSlide', 'autoSlideStoppable', 'autoSlideMethod', 'defaultTiming', 'mouseWheel', 'previewLinks', 'postMessage', 'postMessageEvents', 'focusBodyOnPageVisibilityChange', 'transition', 'transitionSpeed', 'backgroundTransition', 'pdfMaxPagesPerSlide', 'pdfSeparateFragments', 'pdfPageHeightOffset', 'viewDistance', 'mobileViewDistance', 'display', 'hideInactiveCursor', 'hideCursorTime'];
		return _.pick(options, revealProps)
	}

	private parseYamlFrontMatter(input: string): { yamlOptions: unknown; markdown: string; } {
		const document = loadFront(input.replace(/^\uFEFF/, ''));
		return {
			yamlOptions: _.omit(document, '__content'),
			markdown: document.__content || input
		};
	}

	private getCssPaths(css: string | string[]) {
		let input: string[] 
		if(!css){
			return input;
		}
		if(typeof css === 'string'){
			input = css.split(',');
		} else {
			input = css;
		}

		return input.map(css => {
			if(this.isValidUrl(css)){
				return css;
			}
			return '/' + css;
		});
	}
}
