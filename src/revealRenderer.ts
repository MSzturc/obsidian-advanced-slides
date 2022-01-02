import { readFile } from "fs-extra";
import { join, basename, extname } from 'path';
import { glob } from "glob";
import Mustache from "mustache";
import { md } from "./markdown";

import defaults from "./defaults.json";
import { ObsidianMarkdownPreprocessor } from "./obsidianMarkdownPreprocessor";
import { ObsidianUtils } from "./obsidianUtils";
import { YamlParser } from "./yamlParser";
import { ImageCollector } from "./imageCollector";
import { RevealExporter } from "./revealExporter";

export class RevealRenderer {

	private processor: ObsidianMarkdownPreprocessor;
	private pluginDirectory: string;
	private yaml: YamlParser;
	private exporter: RevealExporter;
	private utils: ObsidianUtils;

	constructor(utils: ObsidianUtils) {
		this.pluginDirectory = utils.getPluginDirectory();
		this.processor = new ObsidianMarkdownPreprocessor(utils);
		this.yaml = new YamlParser();
		this.exporter = new RevealExporter(utils);
		this.utils = utils;
	}

	async renderFile(filePath: string, renderForExport = false) {

		if (renderForExport) {
			ImageCollector.getInstance().reset();
			ImageCollector.getInstance().enable();
		}

		const content = (await readFile(filePath.toString())).toString();
		const rendered = await this.render(content);

		if (renderForExport) {
			ImageCollector.getInstance().disable();
			await this.exporter.export(filePath, rendered, ImageCollector.getInstance().getAll());
		}

		return rendered;
	}

	async render(input: string) {
		const { yamlOptions, markdown } = this.yaml.parseYamlFrontMatter(input);
		const options = this.yaml.getSlideOptions(yamlOptions);
		const revealOptions = this.yaml.getRevealOptions(options);

		const { title } = options;
		const themeUrl = this.getThemeUrl(options.theme);
		const highlightThemeUrl = this.getHighlightThemeUrl(options.highlightTheme);

		const slidifyOptions = this.yaml.getSlidifyOptions(options);

		const processedMarkdown = this.processor.process(markdown, options);
		const slides = this.slidify(processedMarkdown, slidifyOptions);

		const cssPaths = this.getCssPaths(options.css);

		const settings = this.utils.getTemplateSettings(yamlOptions);

		const { enableChalkboard, enableOverview } = settings;

		let base = '';
		if (!ImageCollector.getInstance().shouldCollect()) {
			base = '/';
		}

		const context = Object.assign(options, {
			title,
			slides,
			themeUrl,
			highlightThemeUrl,
			cssPaths,
			base,
			enableChalkboard,
			enableOverview,
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

		if (this.isValidUrl(theme)) {
			return theme;
		}

		const highlightThemes = glob.sync('plugin/highlight/*.css', { cwd: this.pluginDirectory });

		const highlightTheme = highlightThemes.find(
			themePath => basename(themePath).replace(extname(themePath), '') === theme
		);

		return highlightTheme ? highlightTheme : theme;
	}

	private getThemeUrl(theme: string) {

		if (this.isValidUrl(theme)) {
			return theme;
		}

		const revealThemes = glob.sync('dist/theme/*.css', { cwd: this.pluginDirectory });

		const revealTheme = revealThemes.find(
			themePath => basename(themePath).replace(extname(themePath), '') === theme
		);

		return revealTheme ? revealTheme : theme;
	}

	private async getTemplate() {
		const templateFile = join(this.pluginDirectory, defaults.template);
		const content = (await readFile(templateFile.toString())).toString();
		return content;
	}

	private slidify(markdown: string, slidifyOptions: unknown) {
		return md.slidify(markdown, slidifyOptions);
	}

	private getCssPaths(css: string | string[]) {
		let input: string[]
		if (!css) {
			return input;
		}
		if (typeof css === 'string') {
			input = css.split(',');
		} else {
			input = css;
		}

		return input.map(css => {
			if (this.isValidUrl(css)) {
				return css;
			}
			return '/' + css;
		});
	}
}
