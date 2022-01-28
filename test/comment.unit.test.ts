import { CommentParser, Comment } from "src/comment";

test('Parse Comment', () => {

	const parser = new CommentParser();

	const input = `text with border <!-- .element: class="with-border" -->`;
	const parsed = parser.parseLine(input);

	const expected = Comment.of(
		'element',
		[],
		["with-border"]
	);
	expect(parsed).toStrictEqual(expected);
});

test('Parse Comment', () => {

	const parser = new CommentParser();

	const input = `text with background <!-- .element: style="background:blue" -->`;
	const parsed = parser.parseLine(input);

	const expected = Comment.of(
		'element',
		["background:blue"],
	);

	expect(parsed).toStrictEqual(expected);
});

test('Parse Comment', () => {

	const parser = new CommentParser();

	const input = `text with attribute <!-- .element: data-toggle="modal" -->`;
	const parsed = parser.parseLine(input);

	const expected = Comment.of(
		'element',
		[],
		[],
		new Map<string, string>([["data-toggle", "modal"]])
	);
	expect(parsed).toStrictEqual(expected);
});

test('Parse Comment', () => {

	const parser = new CommentParser();

	const input = `<!-- .slide: style="background-color: coral;" -->`;
	const parsed = parser.parseLine(input);

	const expected = Comment.of(
		'slide',
		['background-color: coral']
	);
	expect(parsed).toStrictEqual(expected);
});

test('Parse Comment with bg property', () => {

	const parser = new CommentParser();

	const input = `<!-- .slide: bg="coral" -->`;
	const parsed = parser.parseLine(input);

	const expected = Comment.of(
		'slide',
		['background-color: coral'],
		['has-light-background']
	);
	expect(parsed).toStrictEqual(expected);
});

test('Invalid input', () => {

	const parser = new CommentParser();

	const input = `<-- .slde: stle="background-color: coral;" -`;
	const parsed = parser.parseLine(input);

	expect(parsed).toBeNull();
});
