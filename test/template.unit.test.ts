import { ObsidianMarkdownPreprocessor } from 'src/obsidianMarkdownPreprocessor';
import { when } from 'ts-mockito';
import { prepare } from './testUtils';
import { MockedObsidianUtils, obsidianUtils as utilsInstance } from './__mocks__/mockObsidianUtils';

test('Template only with content', () => {

	when(MockedObsidianUtils.parseFile('template.md', null)).thenCall(arg => {
		return `
		# Before
		<% content %>
		# After
		`;
	});

	const input = `<!-- slide template="[[template]]" -->

	# MyContent
`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Template with variable not set', () => {

	when(MockedObsidianUtils.parseFile('template.md', null)).thenCall(arg => {
		return `
		<% content %>
		# After<grid drag="100 6" drop="bottom">
		<% footer %>
		</grid>
		`;
	});

	const input = `<!-- slide template="[[template]]" -->

	# MyContent
`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Template with invisible variable not set', () => {

	when(MockedObsidianUtils.parseFile('template.md', null)).thenCall(arg => {
		return `
		<% content %>
		# After<grid drag="100 6" drop="bottom">
		<%? footer %>
		</grid>
		`;
	});

	const input = `<!-- slide template="[[template]]" -->

	# MyContent
`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});

test('Template with variable set', () => {

	when(MockedObsidianUtils.parseFile('template.md', null)).thenCall(arg => {
		return `
		<% content %>
		# After<grid drag="100 6" drop="bottom">
		<% footer %>
		</grid>
		`;
	});

	const input = `<!-- slide template="[[template]]" -->

# MyContent

::: footer
# Hello
:::
	
`;

	const { options, markdown } = prepare(input);
	const sut = new ObsidianMarkdownPreprocessor(utilsInstance);

	return expect(sut.process(markdown, options)).toMatchSnapshot();
});