import { ObsidianMarkdownPreprocessor } from 'src/obsidianMarkdownPreprocessor';
import { when } from 'ts-mockito';
import { prepare } from './testUtils';
import { MockedObsidianUtils, obsidianUtils as utilsInstance } from './__mocks__/mockObsidianUtils';

test('Grid Component > Basic Syntax', () => {
	const input = `<grid drag="60 55" drop="5 10" style="background-color: coral;">
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
	const input = `<grid drag="60 55" drop="5 10" style="background-color: coral;">
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
	const input = `<grid drag="40 30" drop="topleft" style="background-color: red;">
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
	const input = `<grid drag="40 50" drop="10 15" style="background-color: orange;">
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
	when(MockedObsidianUtils.getAbsolutePath('Image.jpg.md')).thenCall(arg => {
		return null;
	});

	when(MockedObsidianUtils.findFile('Image.jpg')).thenCall(arg => {
		return '/documentation/Image.jpg';
	});

	const input = `<grid  drag="40 100" drop="center" style="background-color: coral;" flow="col">
### Lorem
![[Image.jpg]]
### Ipsum
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Row Flow', () => {
	when(MockedObsidianUtils.getAbsolutePath('Image.jpg.md')).thenCall(arg => {
		return null;
	});

	when(MockedObsidianUtils.findFile('Image.jpg')).thenCall(arg => {
		return '/documentation/Image.jpg';
	});

	const input = `<grid  drag="100 40" drop="center" style="background-color: coral;" flow="row">
### Lorem
![[Image.jpg]]
### Ipsum
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Attributes > Background', () => {
	const input = `<grid  drag="55 50" drop="topright" bg="orange">
### Make
</grid>

<grid  drag="55 50" drop="bottomleft" bg="rgb(0,0,0)">
### Noise
</grid>

<grid  drag="25 20" drop="center" bg="green" rotate="-15">
### some
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Attributes > Border', () => {
	const input = `<grid  drag="30 25" drop="left" border="thick dotted blue">
thick dotted blue
</grid>

<grid  drag="30 25" drop="center" border="4px solid white">
20px solid white
</grid>

<grid  drag="30 25" drop="right" border="medium dashed red">
thick dotted blue
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Attributes > Filter', () => {
	when(MockedObsidianUtils.getAbsolutePath('Image.jpg.md')).thenCall(arg => {
		return null;
	});

	when(MockedObsidianUtils.findFile('Image.jpg')).thenCall(arg => {
		return '/documentation/Image.jpg';
	});

	const input = `<grid  drag="30 25" drop="5 15" bg="#B565A7" filter="blur(10px)">
Text is too blurry
</grid>

<grid  drag="50 50" drop="-12 -25" bg="white" filter="grayscale()">
![[Image.jpg]]
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Attributes > Rotate', () => {
	const input = `<grid  drag="30 25" drop="top" bg="#B565A7" rotate="-10">
Hello
</grid>

<grid  drag="40 25" drop="bottomright" bg="#D65076" rotate="40">
World!
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Attributes > Padding', () => {
	when(MockedObsidianUtils.getAbsolutePath('Image.jpg|800.md')).thenCall(arg => {
		return null;
	});

	when(MockedObsidianUtils.findFile('Image.jpg')).thenCall(arg => {
		return '/documentation/Image.jpg';
	});

	const input = `<grid  drag="50 50" drop="topleft" bg="orange" pad="0 50px">
###### Lorem Ipsum wasnt simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book here there
</grid>

<grid  drag="50 50" drop="bottomright" bg="orange" pad="20px">
![[Image.jpg|800]]
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Attributes > Padding', () => {
	const input = `<grid drag="60 55" drop="5 10" bg="red">
### Fragments:
+ Right
+ Bottom
</grid>

<grid drag="25 55" drop="-5 10" bg="green" frag="1">
Right Grid
</grid>

<grid drag="90 20" drop="5 -10" bg="gray" frag="2">
Bottom Grid
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Attributes > Alignment', () => {
	const input = `<grid drag="100 70" drop="0 30" bg="#EEB73F" flow="row" pad="0 50px" align="left">
![](https://picsum.photos/id/978/150/200)
![](https://picsum.photos/id/996/150/200)
![](https://picsum.photos/id/1011/150/200)
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Attributes > Alignment', () => {
	const input = `<grid drag="100 70" drop="0 30" bg="#EEB73F" flow="col" pad="0 50px" align="left">
![](https://picsum.photos/id/978/150/200)
![](https://picsum.photos/id/996/150/200)
![](https://picsum.photos/id/1011/150/200)
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Attributes > Alignment', () => {
	const input = `<grid drag="100 70" drop="0 30" bg="#EEB73F" flow="row" pad="0 50px" align="right">
![](https://picsum.photos/id/978/150/200)
![](https://picsum.photos/id/996/150/200)
![](https://picsum.photos/id/1011/150/200)
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Attributes > Alignment', () => {
	const input = `<grid drag="100 70" drop="0 30" bg="#EEB73F" flow="col" pad="0 50px" align="right">
![](https://picsum.photos/id/978/150/200)
![](https://picsum.photos/id/996/150/200)
![](https://picsum.photos/id/1011/150/200)
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Attributes > Alignment', () => {
	const input = `<grid drag="100 100" drop="0 0" bg="#EEB73F" flow="col" pad="50px" align="top">
![](https://picsum.photos/id/978/150/150)
![](https://picsum.photos/id/996/150/150)
![](https://picsum.photos/id/1011/150/150)
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Attributes > Alignment', () => {
	const input = `<grid drag="100 100" drop="0 0" bg="#EEB73F" flow="row" pad="50px" align="top">
![](https://picsum.photos/id/978/150/150)
![](https://picsum.photos/id/996/150/150)
![](https://picsum.photos/id/1011/150/150)
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Attributes > Alignment', () => {
	const input = `<grid drag="100 100" drop="0 0" bg="#EEB73F" flow="col" pad="50px" align="bottom">
![](https://picsum.photos/id/978/150/150)
![](https://picsum.photos/id/996/150/150)
![](https://picsum.photos/id/1011/150/150)
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Attributes > Alignment', () => {
	const input = `<grid drag="100 100" drop="0 0" bg="#EEB73F" flow="row" pad="50px" align="bottom">
![](https://picsum.photos/id/978/150/150)
![](https://picsum.photos/id/996/150/150)
![](https://picsum.photos/id/1011/150/150)
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Attributes > Alignment', () => {
	const input = `<grid drag="100 100" drop="0 0" bg="#EEB73F" flow="col" pad="50px" align="center">
![](https://picsum.photos/id/978/150/150)
![](https://picsum.photos/id/996/150/150)
![](https://picsum.photos/id/1011/150/150)
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Attributes > Alignment', () => {
	const input = `<grid drag="100 100" drop="0 0" bg="#EEB73F" flow="row" pad="50px" align="center">
![](https://picsum.photos/id/978/150/150)
![](https://picsum.photos/id/996/150/150)
![](https://picsum.photos/id/1011/150/150)
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Attributes > Alignment', () => {
	const input = `<grid drag="100 100" drop="0 0" bg="#EEB73F" flow="col" pad="50px" align="topleft">
![](https://picsum.photos/id/978/150/150)
![](https://picsum.photos/id/996/150/150)
![](https://picsum.photos/id/1011/150/150)
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Attributes > Alignment', () => {
	const input = `<grid drag="100 100" drop="0 0" bg="#EEB73F" flow="row" pad="50px" align="topleft">
![](https://picsum.photos/id/978/150/150)
![](https://picsum.photos/id/996/150/150)
![](https://picsum.photos/id/1011/150/150)
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Attributes > Alignment', () => {
	const input = `<grid drag="100 100" drop="0 0" bg="#EEB73F" flow="col" pad="50px" align="topright">
![](https://picsum.photos/id/978/150/150)
![](https://picsum.photos/id/996/150/150)
![](https://picsum.photos/id/1011/150/150)
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Attributes > Alignment', () => {
	const input = `<grid drag="100 100" drop="0 0" bg="#EEB73F" flow="row" pad="50px" align="topright">
![](https://picsum.photos/id/978/150/150)
![](https://picsum.photos/id/996/150/150)
![](https://picsum.photos/id/1011/150/150)
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Attributes > Alignment', () => {
	const input = `<grid drag="100 100" drop="0 0" bg="#EEB73F" flow="col" pad="50px" align="bottomright">
![](https://picsum.photos/id/978/150/150)
![](https://picsum.photos/id/996/150/150)
![](https://picsum.photos/id/1011/150/150)
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Attributes > Alignment', () => {
	const input = `<grid drag="100 100" drop="0 0" bg="#EEB73F" flow="row" pad="50px" align="bottomright">
![](https://picsum.photos/id/978/150/150)
![](https://picsum.photos/id/996/150/150)
![](https://picsum.photos/id/1011/150/150)
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Attributes > Alignment', () => {
	const input = `<grid drag="100 100" drop="0 0" bg="#EEB73F" flow="col" pad="50px" align="bottomleft">
![](https://picsum.photos/id/978/150/150)
![](https://picsum.photos/id/996/150/150)
![](https://picsum.photos/id/1011/150/150)
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Attributes > Alignment', () => {
	const input = `<grid drag="100 100" drop="0 0" bg="#EEB73F" flow="row" pad="50px" align="bottomleft">
![](https://picsum.photos/id/978/150/150)
![](https://picsum.photos/id/996/150/150)
![](https://picsum.photos/id/1011/150/150)
</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Attributes > Alignment > Stretch > Row', () => {
	const input = `<grid drag="100 45" drop="top" flow="row" align="stretch">
	![](https://picsum.photos/id/978/150/150)
	![](https://picsum.photos/id/978/150/150)
	![](https://picsum.photos/id/978/150/150)
	</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Grid Component > Attributes > Alignment > Stretch > Col', () => {
	const input = `<grid drag="100 55" drop="bottom" flow="col" align="stretch">
	![](https://picsum.photos/id/978/150/150)
	![](https://picsum.photos/id/978/150/150)
	</grid>`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});
