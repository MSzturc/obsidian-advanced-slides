import { omit, defaults } from "lodash";
import { ObsidianMarkdownPreprocessor } from "src/obsidianMarkdownPreprocessor";
import { anyString, instance, mock, when } from "ts-mockito";
import { loadFront } from "yaml-front-matter";
import defaultConfig from "src/defaults.json";
import { ObsidianUtils } from "src/obsidianUtils";
import { throws } from "assert";

const MockedObsidianUtils = mock(ObsidianUtils);

when(MockedObsidianUtils.getAbsolutePath(anyString())).thenCall( (arg) => {
	throw new Error('Parameter not mocked: ' + arg);
});

when(MockedObsidianUtils.findFile(anyString())).thenCall( (arg) => {
	throw new Error('Parameter not mocked: ' + arg);
});

when(MockedObsidianUtils.findImageEx(anyString())).thenCall( (arg) => {
	throw new Error('Parameter not mocked: ' + arg);
});

when(MockedObsidianUtils.getVaultName()).thenReturn('test-vault');

const utilsInstance: ObsidianUtils = instance(MockedObsidianUtils);


test('Basic Markdown Syntax > Headers', () => {

	const input =
		`# This is a heading 1
## This is a heading 2
### This is a heading 3 
#### This is a heading 4
##### This is a heading 5
###### This is a heading 6`;

	const { options, markdown } = prepare(input);
	var sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

/*test('Basic Markdown Syntax > Text style', () => {

	const input =
		`*This text will be italic*

_This will also be italic_

**This text will be bold**

__This will also be bold__

%%This is a Comment(Can't see it)%%

_You **can** combine them_

---

Any word wrapped with two tildes (like ~~this~~) will appear crossed out.

Any word wrapped with two equal signs (like ==this==) will appear as highlighted.`;

	const { options, markdown } = prepare(input);
	var sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});*/

test('Basic Markdown Syntax > Lists', () => {

	const input =
		`- Item 1
- Item 2
	- Item 2a
	- Item 2b

---

1. Item 1
1. Item 2
1. Item 3
   1. Item 3a
   1. Item 3b
`;

	const { options, markdown } = prepare(input);
	var sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Basic Markdown Syntax > Images', () => {

	//TODO: bugfix getAbsolutePath
	when(MockedObsidianUtils.getAbsolutePath("Image.jpg.md")).thenCall( (arg) => {
		return null;
	});

	when(MockedObsidianUtils.getAbsolutePath("Image.jpg|100.md")).thenCall( (arg) => {
		return null;
	});

	when(MockedObsidianUtils.getAbsolutePath('Image.jpg|300x100 <!-- .element: style="object-fit: cover" -->.md')).thenCall( (arg) => {
		return null;
	});

	when(MockedObsidianUtils.findFile('Image.jpg')).thenCall( (arg) => {
		return '/documentation/Image.jpg';
	});

	

	const input =
		`
Insert image with standard markdown syntax

![Image](https://picsum.photos/id/1006/500/300)

---

Insert image that lies outside of your vault

![Image](file:///Users/testUser/Desktop/howToUse.png)

---

Insert image with obsidian markdown syntax

![[Image.jpg]]

---

Scale image to a width of 100 px

![[Image.jpg|100]]

---

Scale image to a width of 300x100 px

![[Image.jpg|300x100]] <!-- .element: style="object-fit: cover" -->

`;

	const { options, markdown } = prepare(input);
	var sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

function prepare(input: string): { options: any; markdown: string; } {
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

