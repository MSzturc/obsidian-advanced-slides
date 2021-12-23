import { ObsidianMarkdownPreprocessor } from "src/obsidianMarkdownPreprocessor";
import { when } from "ts-mockito";
import { prepare } from "./testUtils";
import { MockedObsidianUtils, obsidianUtils as utilsInstance} from "./__mocks__/mockObsidianUtils";


test('Grid Component > Basic Syntax', () => {

	const input =
`<grid drag="60 55" drop="5 10" style="background-color: coral;">

### Left
</grid>

<grid drag="25 55" drop="70 10" style="background-color: coral;">

### Right
</grid>

<grid drag="90 20" drop="5 70" style="background-color: coral;">

### Bottom
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Basic Syntax', () => {

	const input =
`<grid drag="60 55" drop="5 10" style="background-color: coral;">

### Left
</grid>

<grid drag="25 55" drop="-5 10" style="background-color: coral;">

### Right
</grid>

<grid drag="90 20" drop="5 -10" style="background-color: coral;">

### Bottom
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Position by Name', () => {

	const input =
`<grid drag="40 30" drop="topleft" style="background-color: red;">

### Top Left
</grid>

<grid drop="right" style="background-color: green;">

### Right Default Size
</grid>

<grid drag="80 30" drop="bottom" style="background-color: coral;">

### Bottom
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Position Coordinates', () => {

	const input =
`<grid drag="40 50" drop="10 15" style="background-color: orange;">

### Positive X, Y
</grid>

<grid drag="30 30" drop="-40px 40px" style="background-color: red;">

### Negative X, Positive Y
</grid>

<grid drag="40 40" drop="-5 -20" style="background-color: blue;">

### Negative X, Y
</grid>

<grid drag="100 10" drop="0 -5" style="background-color: green;">

### Positive X, Negative Y
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Column Flow', () => {

	when(MockedObsidianUtils.getAbsolutePath("Image.jpg.md")).thenCall( (arg) => {
		return null;
	});

	when(MockedObsidianUtils.findFile('Image.jpg')).thenCall( (arg) => {
		return '/documentation/Image.jpg';
	});

	const input =
`<grid  drag="40 100" drop="center" style="background-color: coral;" flow="col">

### Lorem
![[Image.jpg]]
### Ipsum
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Row Flow', () => {

	when(MockedObsidianUtils.getAbsolutePath("Image.jpg|350.md")).thenCall( (arg) => {
		return null;
	});

	when(MockedObsidianUtils.findFile('Image.jpg')).thenCall( (arg) => {
		return '/documentation/Image.jpg';
	});

	const input =
`<grid  drag="100 40" drop="center" style="background-color: coral;" flow="row">

### Lorem
![[Image.jpg|350]]
### Ipsum
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

