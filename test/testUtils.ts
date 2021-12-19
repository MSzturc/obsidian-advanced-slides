import { loadFront } from "yaml-front-matter";
import defaultConfig from "src/defaults.json";
import { omit, defaults } from "lodash";

export function prepare(input: string): { options: any; markdown: string; } {
	const { yamlOptions, markdown } = parseYamlFrontMatter(input);
	const options = getSlideOptions(yamlOptions);
	return { options, markdown };
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
