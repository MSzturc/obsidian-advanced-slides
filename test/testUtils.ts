import { loadFront } from 'yaml-front-matter';
import { omit, defaults as def } from 'lodash';
import { Options } from 'src/options';

export function prepare(input: string): { options: Options; markdown: string } {
	const { yamlOptions, markdown } = parseYamlFrontMatter(input);
	const options = getSlideOptions(yamlOptions);
	return { options, markdown };
}

function parseYamlFrontMatter(input: string): {
	yamlOptions: any;
	markdown: string;
} {
	const document = loadFront(input.replace(/^\uFEFF/, ''));
	return {
		yamlOptions: omit(document, '__content'),
		markdown: document.__content || input,
	};
}

export function getSlideOptions(options: any): Options {
	return def({}, options, {
		theme: 'black',
		highlightTheme: 'zenburn',
		template: 'template/reveal.html',
		separator: '\r?\n---\r?\n',
		verticalSeparator: '\r?\n--\r?\n',
		enableLinks: false,
		width: 960,
		height: 700,
		margin: 0.04,
	});
}
