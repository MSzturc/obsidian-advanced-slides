import { CommentParser, Comment } from "src/comment";

test('Parse Coment', () => {

	const parser = new CommentParser();

	const input = `text with border <!-- .element: class="with-border" -->`;
	const parsed = parser.parseLine(input);

	const expected : Comment = {
		type: 'element',
		style: [],
		clazz: ["with-border"],
		attributes: new Map<string, string>()
	}
	expect(parsed).toStrictEqual(expected);
});

test('Parse Coment', () => {

	const parser = new CommentParser();

	const input = `text with background <!-- .element: style="background:blue" -->`;
	const parsed = parser.parseLine(input);

	const expected : Comment = {
		type: 'element',
		style: ["background:blue"],
		clazz: [],
		attributes: new Map<string, string>()
	}
	expect(parsed).toStrictEqual(expected);
});

test('Parse Coment', () => {

	const parser = new CommentParser();

	const input = `text with attribute <!-- .element: data-toggle="modal" -->`;
	const parsed = parser.parseLine(input);

	const expected : Comment = {
		type: 'element',
		style: [],
		clazz: [],
		attributes: new Map<string, string>([["data-toggle", "modal"]])
	}
	expect(parsed).toStrictEqual(expected);
});

test('Parse Coment', () => {

	const parser = new CommentParser();

	const input = `<!-- .slide: style="background-color: coral;" -->`;
	const parsed = parser.parseLine(input);

	const expected : Comment = {
		type: 'slide',
		style: ['background-color: coral'],
		clazz: [],
		attributes: new Map<string, string>()
	}
	expect(parsed).toStrictEqual(expected);
});

test('Invalid input', () => {

	const parser = new CommentParser();

	const input = `<-- .slde: stle="background-color: coral;" -`;
	const parsed = parser.parseLine(input);

	expect(parsed).toBeNull();
});
