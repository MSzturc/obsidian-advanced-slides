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

