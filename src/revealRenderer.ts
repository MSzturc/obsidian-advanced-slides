import { readFile } from "fs-extra";
import { join, basename, extname } from 'path';
import { glob } from "glob";
import Mustache from "mustache";
import { loadFront } from "yaml-front-matter";
import { md } from "./markdown";

import _ from "lodash"
import defaults from "./defaults.json";
import { ObsidianMarkdownPreprocessor } from "./obsidianMarkdownPreprocessor";
import { App } from "obsidian";

export class RevealRenderer {

	private processor: ObsidianMarkdownPreprocessor;

	private vaultDirectory: string;
	private pluginDirectory: string;

	constructor(app: App, baseDirectory: string) {
		this.vaultDirectory = baseDirectory;
		this.pluginDirectory = join(this.vaultDirectory, '/.obsidian/plugins/obsidian-advanced-slides/');
		this.processor = new ObsidianMarkdownPreprocessor(app);
	}

	async renderFile(filePath: String) {
		const content = (await readFile(filePath.toString())).toString();
		return await this.render(content);
	}

	async render(input: string) {
		const { yamlOptions, markdown } = this.parseYamlFrontMatter(input);
		const options = this.getSlideOptions(yamlOptions);
		const revealOptions = this.getRevealOptions(yamlOptions);

		const { title } = options;
		const themeUrl = this.getThemeUrl(options.theme);
		const highlightThemeUrl = this.getHighlightThemeUrl(options.highlightTheme);

		const processedMarkdown = this.processor.process(markdown);
		const slides = this.slidify(processedMarkdown, this.getSlidifyOptions(options));

		const context = Object.assign(options, {
			title,
			slides,
			themeUrl,
			highlightThemeUrl,
			revealOptionsStr: JSON.stringify(revealOptions)
		});

		console.log(context);

		const template = await this.getTemplate();
		const result = Mustache.render(template, context);
		return result;
	}

	private getHighlightThemeUrl(theme: string) {
		try {
			const parsedUrl = new URL(theme);
			return theme;
		} catch (err) { }

		const highlightThemes = glob.sync('plugin/highlight/*.css', { cwd: this.pluginDirectory });

		const highlightTheme = highlightThemes.find(
			themePath => basename(themePath).replace(extname(themePath), '') === theme
		);

		return highlightTheme ? '/' + highlightTheme : '/' + theme;
	}

	private getThemeUrl(theme: string) {
		try {
			const parsedUrl = new URL(theme);
			return theme;
		} catch (err) { }

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

	private slidify(markdown: string, slidifyOptions: any) {
		return md.slidify(markdown, slidifyOptions);
	}

	private getSlideOptions(options: any) {
		return _.defaults({}, options, defaults);
	}

	private getSlidifyOptions(options: any) {
		const slidifyProps = ['separator', 'verticalSeparator'];
		return _.pick(options, slidifyProps)
	}

	private getRevealOptions(options: any) {
		const revealProps = ['controls', 'controlsTutorial', 'controlsLayout', 'controlsBackArrows', 'progress', 'slideNumber', 'showSlideNumber', 'hashOneBasedIndex', 'hash', 'respondToHashChanges', 'history', 'keyboard', 'keyboardCondition', 'disableLayout', 'overview', 'center', 'touch', 'loop', 'rtl', 'navigationMode', 'shuffle', 'fragments', 'fragmentInURL', 'embedded', 'help', 'pause', 'showNotes', 'autoPlayMedia', 'preloadIframes', 'autoAnimate', 'autoAnimateMatcher', 'autoAnimateEasing', 'autoAnimateDuration', 'autoAnimateUnmatched', 'autoSlide', 'autoSlideStoppable', 'autoSlideMethod', 'defaultTiming', 'mouseWheel', 'previewLinks', 'postMessage', 'postMessageEvents', 'focusBodyOnPageVisibilityChange', 'transition', 'transitionSpeed', 'backgroundTransition', 'pdfMaxPagesPerSlide', 'pdfSeparateFragments', 'pdfPageHeightOffset', 'viewDistance', 'mobileViewDistance', 'display', 'hideInactiveCursor', 'hideCursorTime'];
		return _.pick(options, revealProps)
	}

	private parseYamlFrontMatter(input: string): { yamlOptions: any; markdown: any; } {
		const document = loadFront(input.replace(/^\uFEFF/, ''));
		return {
			yamlOptions: _.omit(document, '__content'),
			markdown: document.__content || input
		};
	}
}
