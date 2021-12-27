import { CommentParser, Comment } from "src/comment";

test('Parse Coment', () => {

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

test('Parse Coment', () => {

	const parser = new CommentParser();

	const input = `text with background <!-- .element: style="background:blue" -->`;
	const parsed = parser.parseLine(input);

	const expected = Comment.of(
		'element',
		["background:blue"],
	);

	expect(parsed).toStrictEqual(expected);
});


test('Empty Slide comment', () => {

	const parser = new CommentParser();

	const input = `<!-- .slide: -->`;
	const parsed = parser.parseLine(input);

	const expected = Comment.of(
		'slide'
	);
	expect(parsed).toStrictEqual(expected);
});

test('Parse Coment', () => {

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

test('Parse Coment', () => {

	const parser = new CommentParser();

	const input = `<!-- .slide: style="background-color: coral;" -->`;
	const parsed = parser.parseLine(input);

	const expected = Comment.of(
		'slide',
		['background-color: coral']
	);
	expect(parsed).toStrictEqual(expected);
});

test('Parse Coment with bg property', () => {

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

test('Parse Coment with bg property', () => {

	const parser = new CommentParser();

	const input = `<!-- .slide: bg="black" -->`;
	const parsed = parser.parseLine(input);

	const expected = Comment.of(
		'slide',
		['background-color: black'],
		['has-dark-background']
	);
	expect(parsed).toStrictEqual(expected);
});

test('Merge Coment', () => {

	const parser = new CommentParser();

	const input = `<!-- .slide: bg="coral" class="reveal section small" style="width: 200px; height: 400px; margin: 0" data-toggle="modal" -->`;
	const parsed = parser.parseLine(input);

	const expected = Comment.of(
		'slide',
		['background-color: coral','width: 200px'],
		['has-light-background','small'],
		new Map<string, string>([["data-toggle", "modal"],["class","reveal section"],["style","height: 400px; margin: 0"]])
	);
	expect(parsed).toStrictEqual(expected);
});

test('Invalid input', () => {

	const parser = new CommentParser();

	const input = `<-- .slde: stle="background-color: coral;" -`;
	const parsed = parser.parseLine(input);

	expect(parsed).toBeNull();
});

test('Parse Coment with pad property', () => {

	const parser = new CommentParser();

	const input = `<!-- .slide: pad="10px 15px" -->`;
	const parsed = parser.parseLine(input);

	const expected = Comment.of(
		'slide',
		['padding: 10px 15px','box-sizing: border-box']
	);
	expect(parsed).toStrictEqual(expected);
});

test('Parse Coment with animate property', () => {

	const parser = new CommentParser();

	const input = `<!-- .slide: animate="fadeIn slower" -->`;
	const parsed = parser.parseLine(input);

	const expected = Comment.of(
		'slide',
		[],
		['fadeIn', 'slower']
	);
	expect(parsed).toStrictEqual(expected);
});

test('Parse Coment with fragment property', () => {

	const parser = new CommentParser();

	const input = `<!-- .element: frag="1" -->`;
	const parsed = parser.parseLine(input);

	const expected = Comment.of(
		'element',
		[],
		['fragment'],
		new Map<string, string>([["data-fragment-index", "1"]])
	);
	expect(parsed).toStrictEqual(expected);
});

test('Parse Coment with opacity property', () => {

	const parser = new CommentParser();

	const input = `<!-- .element: opacity="0.5" -->`;
	const parsed = parser.parseLine(input);

	const expected = Comment.of(
		'element',
		['opacity: 0.5']
	);
	expect(parsed).toStrictEqual(expected);
});

test('Parse Coment with border property', () => {

	const parser = new CommentParser();

	const input = `<!-- .slide: border="thick dotted blue" -->`;
	const parsed = parser.parseLine(input);

	const expected = Comment.of(
		'slide',
		['border: thick dotted blue','box-sizing: border-box']
	);
	expect(parsed).toStrictEqual(expected);
});

test('Parse Coment with rotate property', () => {

	const parser = new CommentParser();

	const input = `<!-- .slide: rotate="-10" -->`;
	const parsed = parser.parseLine(input);

	const expected = Comment.of(
		'slide',
		['transform: rotate(-10deg)']
	);
	expect(parsed).toStrictEqual(expected);

});

test('Parse Coment with rotate property', () => {

	const parser = new CommentParser();

	const input = `<!-- .slide: rotate="-10deg" -->`;
	const parsed = parser.parseLine(input);

	const expected = Comment.of(
		'slide',
		['transform: rotate(-10deg)']
	);
	expect(parsed).toStrictEqual(expected);

});
