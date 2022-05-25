import { ObsidianMarkdownPreprocessor } from 'src/obsidianMarkdownPreprocessor';
import { when } from 'ts-mockito';
import { MockedObsidianUtils, obsidianUtils as utilsInstance } from './__mocks__/mockObsidianUtils';
import { prepare } from './testUtils';

test('Basic Markdown Syntax > Headers', () => {
	const input = `# This is a heading 1
## This is a heading 2
### This is a heading 3 
#### This is a heading 4
##### This is a heading 5
###### This is a heading 6`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Basic Markdown Syntax > Text style', () => {
	const input = `*This text will be italic*

_This will also be italic_

**This text will be bold**

__This will also be bold__

%%This is a Comment(Can't see it)%%

_You **can** combine them_

---

Any word wrapped with two tildes (like ~~this~~) will appear crossed out.

Any word wrapped with two equal signs (like ==this==) will appear as highlighted.`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Basic Markdown Syntax > Lists', () => {
	const input = `- Item 1
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
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Basic Markdown Syntax > Images', () => {
	//TODO: bugfix getAbsolutePath
	when(MockedObsidianUtils.getAbsolutePath('Image.jpg.md')).thenCall(arg => {
		return null;
	});

	when(MockedObsidianUtils.getAbsolutePath('Image.jpg|100.md')).thenCall(arg => {
		return null;
	});

	when(MockedObsidianUtils.getAbsolutePath('Image.jpg|300x100 <!-- element style="object-fit: cover" -->.md')).thenCall(arg => {
		return null;
	});

	when(MockedObsidianUtils.findFile('Image.jpg')).thenCall(arg => {
		return '/documentation/Image.jpg';
	});

	const input = `
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

![[Image.jpg|300x100]] <!-- element style="object-fit: cover" -->

`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Basic Markdown Syntax > Links', () => {
	const input = `External Links

http://obsidian.md - automatic!

[Obsidian](http://obsidian.md)

---

Obsidian URI links

[Link to note](obsidian://open?path=D:%2Fpath%2Fto%2Ffile.md)

[Link to note](obsidian://open?vault=MainVault&file=MyNote.md)

---

Internal Links

This [[Internal link]] will be displayed as normal text

This [[Internal link|Link]] will use its alias for displaying

`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Basic Markdown Syntax > Links', () => {
	const input = `---
enableLinks: true
---

Internal Links

This [[Internal link]] will be displayed as normal text

This [[Internal link|Link]] will use its alias for displaying

`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Basic Markdown Syntax > Embeds', () => {

	when(MockedObsidianUtils.parseFile('Obsidian.md', 'Link')).thenCall(arg => {
		return 'Link to Obsidian Homepage: http://obsidian.md';
	});

	when(MockedObsidianUtils.parseFile('Obsidian.md', null)).thenCall(arg => {
		return `# Notes about Obsidian
A knowledge base that works on local Markdown files

# Link
Link to Obsidian Homepage: http://obsidian.md`;
	});

	const input = `![[Obsidian]]

---

![[Obsidian#Link]]
`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Basic Markdown Syntax > Blockquotes', () => {
	const input = `> Human beings face ever more complex and urgent problems, and their effectiveness in dealing with these problems is a matter that is critical to the stability and continued progress of society.

- Doug Engelbart, 1961
`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Basic Markdown Syntax > Inline Code', () => {
	const input = `### Text inside \`backticks\` on a line will be formatted like code.
`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Basic Markdown Syntax > Tables', () => {
	const input = `First Header | Second Header
------------ | ------------
Content from cell 1 | Content from cell 2
Content in the first column | Content in the second column
`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Basic Markdown Syntax > Footnotes', () => {
	const input = `Here's a simple footnote[^1]

[^1]: meaningful!

`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Basic Markdown Syntax > Footnotes in Tables', () => {
	const input = `| Table     | Col 1 | Col 2 | Col 3 |
	| --------- | ----- | ----- | ----- |
	| Footnotes | [^1]  | [^2]  | [^3]  | 
	
	[^1]: fn1
	[^2]: fn2
	[^3]: fn3
`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Basic Markdown Syntax > Math', () => {
	const input = `$$\begin{vmatrix}a & b\\
c & d
end{vmatrix}=ad-bc$$

You can also do inline math like $s^{-2}_{n}sum_{i=1}^{n}$`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Basic Markdown Syntax > Mermaid', () => {
	const input = `---
theme: beige
highlightTheme: css/vs2015.css

---

\`\`\`mermaid
sequenceDiagram
    Alice->>+John: Hello John, how are you?
    Alice->>+John: John, can you hear me?
    John-->>-Alice: Hi Alice, I can hear you!
    John-->>-Alice: I feel great!
\`\`\``;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Basic Markdown Syntax > Callouts', () => {
	const input = `> [!tip] This tip has a custom Header
	> This is an Tip with a custom Title
	<!-- element style="width:40%"-->
	
	> [!warning] 
	> This warning is aligned left
	<!-- element style="width:20%;font-size:24px" align="left"-->
	
	<br>
	
	> [!error] 
	> Callouts support manipulation through annotations
	<!-- element style="width:20%;font-size:24px" rotate="15"-->
	
	<grid drag="30 30" drop="11 68" style="font-size:36px">
	> [!example]
	> Here is an Example for an Callout in a Slide. Callouts support dark and white backgrounds and could be sized by annotations
	</grid>
	
	<grid drag="50 100" drop="50 0" bg="white" pad="50px" style="font-size:36px">
	> [!cite]
	> Here is an Cite for an Callout in a Slide. Callouts support dark and white backgrounds and could be sized by annotations
	</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});
