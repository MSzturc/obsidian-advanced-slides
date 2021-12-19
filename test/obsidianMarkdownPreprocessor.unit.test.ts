import { omit, defaults } from "lodash";
import { App } from "obsidian";
import { ObsidianMarkdownPreprocessor } from "src/obsidianMarkdownPreprocessor";
import { mock, when } from "ts-mockito";
import { loadFront } from "yaml-front-matter";
import defaultConfig from "src/defaults.json";

const app = mock(App);

test('Basic Markdown Syntax > Headers', () => {

	const input = 
`# This is a heading 1
## This is a heading 2
### This is a heading 3 
#### This is a heading 4
##### This is a heading 5
###### This is a heading 6`;

	const { options, markdown} = prepare(input);
	var sut = new ObsidianMarkdownPreprocessor(app);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

function prepare(input: string): { options: any; markdown: string; } {
	const { yamlOptions, markdown } = parseYamlFrontMatter(input);
	const options = getSlideOptions(yamlOptions);
	return {options, markdown};
}

function parseYamlFrontMatter(input: string): { yamlOptions: any; markdown: any; } {
	const document = loadFront(input.replace(/^\uFEFF/, ''));
	return {
		yamlOptions: omit(document, '__content'),
		markdown: document.__content || input
	};
}

function getSlideOptions(options: any) {
	return defaults({}, options, defaultConfig);
}

