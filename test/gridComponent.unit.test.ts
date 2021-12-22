import { ObsidianMarkdownPreprocessor } from "src/obsidianMarkdownPreprocessor";
import { prepare } from "./testUtils";
import { obsidianUtils as utilsInstance} from "./__mocks__/mockObsidianUtils";


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
