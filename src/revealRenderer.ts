import fs from "fs-extra";
import path from 'path';
import { glob } from "glob";
import Mustache from "mustache";
import { loadFront } from "yaml-front-matter";
import { md } from "./markdown";

import _ from "lodash"
import defaults from "./defaults.json";

export class RevealRenderer {

	private _vaultDirectory: string;
	private _pluginDirectory: string;

	constructor(baseDirectory: string) {
		this._vaultDirectory = baseDirectory;
		this._pluginDirectory = path.join(this._vaultDirectory, '/.obsidian/plugins/obsidian-advanced-slides/');
	}

	async renderFile(filePath: String) {
		const content = (await fs.readFile(filePath.toString())).toString();
		return await this.render(content);
	}

	async render(input: string) {
		const { yamlOptions, markdown } = this.parseYamlFrontMatter(input);
		const options = this.getSlideOptions(yamlOptions);

		const { title } = options;
		const themeUrl = this.getThemeUrl(options.theme);
		const slides = this.slidify(markdown, this.getSlidifyOptions(options));

		const context = Object.assign(options, {
			title,
			slides,
			themeUrl,
			revealOptionsStr: JSON.stringify({}),
			watch: false
		  });

		const template = await this.getTemplate();
		const result = Mustache.render(template, context);
		return result;
	}

	private getThemeUrl(theme: string) {
		try {
			const parsedUrl = new URL(theme);
			return theme;
		} catch (err) { }

		const revealThemes = glob.sync('dist/theme/*.css', { cwd: this._pluginDirectory });
		
		const revealTheme = revealThemes.find(
			themePath => path.basename(themePath).replace(path.extname(themePath), '') === theme
		  );

		  return revealTheme ?  '/' + revealTheme : '/' + theme;
	}

	private async getTemplate() {
		const templateFile = path.join(this._pluginDirectory, defaults.template);
		const content = (await fs.readFile(templateFile.toString())).toString();
		return content;
	}

	private slidify(markdown, slidifyOptions) {
		return md.slidify(markdown, slidifyOptions);
	}

	private getSlideOptions(options) {
		return _.defaults({}, options, defaults);
	}

	private getSlidifyOptions(options) {
		const slidifyProps = ['separator', 'verticalSeparator'];
		return _.pick(options, slidifyProps)
	}

	private parseYamlFrontMatter(input: string): { yamlOptions: any; markdown: any; } {
		const document = loadFront(input.replace(/^\uFEFF/, ''));
		return {
			yamlOptions: _.omit(document, '__content'),
			markdown: document.__content || input
		};
	}
}
