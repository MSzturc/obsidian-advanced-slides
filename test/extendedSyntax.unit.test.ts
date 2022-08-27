import { ObsidianMarkdownPreprocessor } from 'src/obsidianMarkdownPreprocessor';
import { when } from 'ts-mockito';
import { prepare } from './testUtils';
import { MockedObsidianUtils, obsidianUtils as utilsInstance } from './__mocks__/mockObsidianUtils';

test('Extended Markdown Syntax > Horizontal / Vertical Slides', () => {
	const input = `# Slide 1

---

# Slide 2.1

--

# Slide 2.2
`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Extended Markdown Syntax >  Element Annotations', () => {
	const input = `text with border <!-- element class="with-border" -->

text with background <!-- element style="background:blue" -->

text with attribute <!-- element data-toggle="modal" -->
`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Extended Markdown Syntax >  Slide Annotations', () => {
	const input = `<!-- slide style="background-color: coral;" -->

# Header with coral background color

Paragraph has coral background color, too!

---

<!-- slide style="background-color: green;" -->

- All Bullet points
- have green
- background color
`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Extended Markdown Syntax >  Block Comments', () => {
	const input = `::: block

#### Header
_and_
Paragraph content
*in same block*

:::

---

no color

::: block <!-- element style="background-color: red;" -->

everything inside this block has red background color

::: block <!-- element style="background-color: blue;" -->

blue

:::

red

:::

no color
`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Extended Markdown Syntax >  Fragments', () => {
	const input = `Fade in <!-- element class="fragment" -->

Fade out <!-- element class="fragment fade-out" -->

Highlight red <!-- element class="fragment highlight-red" -->

Fade in, then out <!-- element class="fragment fade-in-then-out" -->

Slide up while fading in <!-- element class="fragment fade-up" -->

---

- Permanent item
- Appear Fourth <!-- element class="fragment" data-fragment-index="4" -->
- Appear Third <!-- element class="fragment" data-fragment-index="3" -->
- Appear Second <!-- element class="fragment" data-fragment-index="2" -->
- Appear First <!-- element class="fragment" data-fragment-index="1" -->
`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Extended Markdown Syntax >  Inline Styling', () => {
	const input = `<style>
.with-border{
	border: 1px solid red;
}
</style>

styled text <!-- element class="with-border" -->
`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Extended Markdown Syntax >  Slide Backgrounds', () => {

	when(MockedObsidianUtils.findFile('Image.jpg')).thenCall(arg => {
		return '/documentation/Image.jpg';
	});

	const input = `<!-- slide data-background="aquamarine" -->
## Slide with text based background
---

<!-- slide data-background="#ff0000" -->
## Slide with hex based background

---

<!-- slide data-background="rgb(70, 70, 255)" -->
## Slide with rgb based background

---

<!-- slide data-background="hsla(315, 100%, 50%, 1)" -->
## Slide with hsl based background

---

# Slide without background

---

<!-- slide data-background-image="https://picsum.photos/seed/picsum/800/600" -->
## Slide with image background

---

<!-- slide bg="[[Image.jpg]]" -->
## Slide with image background #2

---

<!-- slide data-background-image="https://picsum.photos/seed/picsum/800/600" data-background-opacity="0.5" -->
## with opacity

0.5 ≙ 50% opacity

---

## More options:

See [reveal backgrounds](https://revealjs.com/backgrounds/)
`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Extended Markdown Syntax >  Default Background', () => {

	when(MockedObsidianUtils.findFile('Image.jpg')).thenCall(arg => {
		return '/documentation/Image.jpg';
	});

	when(MockedObsidianUtils.findFile('Slide.jpg')).thenCall(arg => {
		return '/documentation/Slide.jpg';
	});

	const input = `
## Slide with default Background

---

<!-- slide bg="[[Slide.jpg]]" -->

## Slide with overloaded Background

---

<!-- slide class="titleSlide" -->

## Slide without overloaded Background

`;

	const { options, markdown } = prepare(input);
	options.bg = '[[Image.jpg]]'
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});


test('Extended Markdown Syntax >  Speaker Notes', () => {
	const input = `## My Slide

This is part of my Presentation


note: this is not! Only the speaker might see this text.

- and this bulletpoint
- or this picture

![](https://picsum.photos/id/1005/250/250)
`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Extended Markdown Syntax >  Fragmented list', () => {
	const input = `# Unordered list

- First
- Second
- Third

---

# Fragmented unordered list

- Permanent
+ First
+ Second
+ Third

---

# Fragmented unordered list with ignored code block

- First
+ Second

\`\`\`diff
- ignored block text 1
+ ignored block text 2
\`\`\`

---

# Ordered list

1. First
2. Second
3. Third

---

# Fragmented ordered list

1. Permanent
2) Second
3) Third
4) Fourth
`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Extended Markdown Syntax >  Excalidraw support', () => {
	when(MockedObsidianUtils.findFile('Sample.excalidraw')).thenCall(arg => {
		return 'Sample.excalidraw.svg';
	});

	when(MockedObsidianUtils.findFile('Sample.excalidraw.svg')).thenCall(arg => {
		return 'path/to/Sample.excalidraw.svg';
	});

	const input = `#### Excalidraw support

![[Sample.excalidraw|100]]

![[Sample.excalidraw]] <!-- element style="width:300px; height:400px" -->`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Extended Markdown Syntax >  Chart support', () => {

	const input = `
	
	\`\`\`chart
    type: bar
    labels: [Monday,Tuesday,Wednesday,Thursday,Friday, Saturday, Sunday, "next Week", "next Month"]
    series:
      - title: Title 1
        data: [1,2,3,4,5,6,7,8,9]
      - title: Title 2
        data: [5,4,3,2,1,0,-1,-2,-3]
\`\`\`

	`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Extended Markdown Syntax >  Chart support > Illegal Input', () => {

	const input = `
	
	\`\`\`chart
    type: bar
    labels: [Monday,Tuesday,Wednesday,Thursday,Friday, Saturday, Sunday, "next Week", "next Month"]
    series:
      - title: Title 1
        data: [1,2,3,4,5,6,7,8,9]
      - title: Title 2
        data: [5,4,3,2,1,0,-1,-2,-3]
\`

	`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Extended Markdown Syntax >  Chart support > Extended Settings', () => {

	const input = `
	
	\`\`\`chart
    type: bar
    labels: [Monday,Tuesday,Wednesday,Thursday,Friday, Saturday, Sunday, "next Week", "next Month"]
    series:
      - title: Title 1
        data: [1,2,3,4,5,6,7,8,9]
      - title: Title 2
        data: [5,4,3,2,1,0,-1,-2,-3]
	spanGaps: true
	tension: 0.5
	beginAtZero: true
	legend: false
	legendPosition: left
	stacked: true
\`\`\`

	`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Advanced Slides Feature >  Show Debug Grid', () => {
	const input = `## My Slide

This slide shows the debug view feature

`;

	const { options, markdown } = prepare(input);
	options.showGrid = true;
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});