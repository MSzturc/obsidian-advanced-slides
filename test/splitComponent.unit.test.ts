import { ObsidianMarkdownPreprocessor } from 'src/obsidianMarkdownPreprocessor';
import { prepare } from './testUtils';
import { obsidianUtils as utilsInstance } from './__mocks__/mockObsidianUtils';

test('Split Component > even', () => {
	const input = `<split even>

![](https://picsum.photos/id/1005/250/250) 
![](https://picsum.photos/id/1010/250/250) 
![](https://picsum.photos/id/1025/250/250) 
</split>
`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Split Component > gap', () => {
	const input = `<split even gap="3">

**Lorem Ipsum** is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s

when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap

into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem
</split>
`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Split Component > left & right', () => {
	const input = `<split left="2" right="1" gap="2">

**Lorem Ipsum** is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
	
into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem
</split>
`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Split Component > wrap', () => {
	const input = `<split wrap="4">

![](https://picsum.photos/id/1010/250/250) 

![](https://picsum.photos/id/1011/250/250) 

![](https://picsum.photos/id/1012/250/250) 

![](https://picsum.photos/id/1013/250/250) 

![](https://picsum.photos/id/1014/250/250) 

![](https://picsum.photos/id/1015/250/250) 
</split>
`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Split Component > no-margin', () => {
	const input = `<split no-margin>

![](https://picsum.photos/id/1001/250/250) 
![](https://picsum.photos/id/1002/250/250) 
![](https://picsum.photos/id/1003/250/250) 
![](https://picsum.photos/id/1004/250/250) 
![](https://picsum.photos/id/1005/250/250) 
![](https://picsum.photos/id/1006/250/250) 
![](https://picsum.photos/id/1009/250/250) 
![](https://picsum.photos/id/1008/250/250) 
</split>
`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});
