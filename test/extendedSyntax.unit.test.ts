import { ObsidianMarkdownPreprocessor } from "src/obsidianMarkdownPreprocessor";
import { prepare } from "./testUtils";
import { MockedObsidianUtils, obsidianUtils as utilsInstance} from "./__mocks__/mockObsidianUtils";


test('Extended Markdown Syntax > Horizontal / Vertical Slides', () => {

	const input =
`# Slide 1

---

# Slide 2.1

--

# Slide 2.2
`;

	const { options, markdown } = prepare(input);
	var sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Extended Markdown Syntax >  Element Annotations', () => {

	const input =
`text with border <!-- .element: class="with-border" -->

text with background <!-- .element: style="background:blue" -->

text with attribute <!-- .element: data-toggle="modal" -->
`;

	const { options, markdown } = prepare(input);
	var sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Extended Markdown Syntax >  Slide Annotations', () => {

	const input =
`<!-- .slide: style="background-color: coral;" -->

# Header with coral background color

Paragraph has coral background color, too!

---

<!-- .slide: style="background-color: green;" -->

- All Bullet points
- have green
- background color
`;

	const { options, markdown } = prepare(input);
	var sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Extended Markdown Syntax >  Block Comments', () => {

	const input =
`::: block

#### Header
_and_
Paragraph content
*in same block*

:::

---

no color

::: block <!-- .element: style="background-color: red;" -->

everything inside this block has red background color

::: block <!-- .element: style="background-color: blue;" -->

blue

:::

red

:::

no color
`;

	const { options, markdown } = prepare(input);
	var sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Extended Markdown Syntax >  Fragments', () => {

	const input =
`Fade in <!-- .element: class="fragment" -->

Fade out <!-- .element: class="fragment fade-out" -->

Highlight red <!-- .element: class="fragment highlight-red" -->

Fade in, then out <!-- .element: class="fragment fade-in-then-out" -->

Slide up while fading in <!-- .element: class="fragment fade-up" -->

---

- Permanent item
- Appear Fourth <!-- .element: class="fragment" data-fragment-index="4" -->
- Appear Third <!-- .element: class="fragment" data-fragment-index="3" -->
- Appear Second <!-- .element: class="fragment" data-fragment-index="2" -->
- Appear First <!-- .element: class="fragment" data-fragment-index="1" -->
`;

	const { options, markdown } = prepare(input);
	var sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Extended Markdown Syntax >  Inline Styling', () => {

	const input =
`<style>
.with-border{
	border: 1px solid red;
}
</style>

styled text <!-- .element: class="with-border" -->
`;

	const { options, markdown } = prepare(input);
	var sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Extended Markdown Syntax >  Slide Backgrounds', () => {

	const input =
`<!-- .slide: data-background="aquamarine" -->
## Slide with text based background
---

<!-- .slide: data-background="#ff0000" -->
## Slide with hex based background

---

<!-- .slide: data-background="rgb(70, 70, 255)" -->
## Slide with rgb based background

---

<!-- .slide: data-background="hsla(315, 100%, 50%, 1)" -->
## Slide with hsl based background

---

# Slide without background

---

<!-- .slide: data-background-image="https://picsum.photos/seed/picsum/800/600" -->
## Slide with image background

---

<!-- .slide: data-background-image="https://picsum.photos/seed/picsum/800/600" data-background-opacity="0.5" -->
## with opacity

0.5 ≙ 50% opacity

---

## More options:

See [reveal backgrounds](https://revealjs.com/backgrounds/)
`;

	const { options, markdown } = prepare(input);
	var sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Extended Markdown Syntax >  Speaker Notes', () => {

	const input =
`## My Slide

This is part of my Presentation


note: this is not! Only the speaker might see this text.

- and this bulletpoint
- or this picture

![](https://picsum.photos/id/1005/250/250) 
`;

	const { options, markdown } = prepare(input);
	var sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Extended Markdown Syntax >  Fragmented list', () => {

	const input =
`# Unordered list

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
	var sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});
