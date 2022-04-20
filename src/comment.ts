import { Properties } from './transformers';

export class Comment extends Properties {
	type: string;

	constructor(type: string, attributes: Map<string, string>) {
		attributes.set('onTarget', type);
		super(attributes);
		this.type = type;
	}

	public static of(
		type: string,
		style: string[] = [],
		clazz: string[] = [],
		attributes: Map<string, string> = new Map<string, string>(),
	): Comment {
		if (clazz && clazz.length > 0) {
			const classValue = attributes.get('class');

			if (classValue) {
				const split = classValue.split(' ');
				split.push(...clazz);
				attributes.set('class', split.join(' '));
			} else {
				attributes.set('class', clazz.join(' '));
			}
		}

		if (style && style.length > 0) {
			const styleValue = attributes.get('style');

			if (styleValue) {
				const split = styleValue.split(';').map(value => value.trim());
				split.push(...style);
				attributes.set('style', split.join('; '));
			} else {
				attributes.set('style', style.join('; '));
			}
		}

		return new Comment(type, attributes);
	}
}

export class CommentParser {
	private readCommentRegex = /<!--.*-->/;
	private parseRegex = /<!--\s*(?:\.)?(element|slide):?\s*(.*)-->/;
	private parsePropertiesRegex = /([^=]*)\s*=\s*"([^"]*)"\s*|([^=]*)\s*=\s*'([^']*)'\s*|([^ ]*)\s*/g;

	commentToString(comment: Comment): string {
		return `<!-- .${comment.type}: ${this.buildAttributes(comment)} -->`;
	}

	buildAttributes(comment: Comment): string {
		const styles = comment.getStyles();
		const classes = comment.getClasses();

		const stylesString = styles.length > 0 ? `style="${styles}" ` : '';
		const classesString = classes.length > 0 ? `class="${classes}" ` : '';

		return `${stylesString}${classesString}${comment.getAttributes()}`.trim();
	}

	parseLine(line: string): Comment {
		return this.lineHasComment(line) ? this.parseComment(this.readCommentStringFromLine(line)) : null;
	}

	parseComment(comment: string): Comment {
		try {
			const [, type, properties] = this.parseRegex.exec(comment);
			const attributes = this.parseAttributes(properties);

			return new Comment(type, attributes);
		} catch (ex) {
			console.log('ERROR: Cannot parse comment: ' + comment);
			return null;
		}
	}

	buildComment(
		type: string,
		style: string[] = [],
		clazz: string[] = [],
		attributes: Map<string, string> = new Map<string, string>(),
	): Comment {
		return Comment.of(type, style, clazz, attributes);
	}

	lineHasComment(line: string): boolean {
		return this.parseRegex.test(line);
	}

	private readCommentStringFromLine(line: string): string {
		return this.readCommentRegex.exec(line)?.[0] ?? '';
	}

	private parseAttributes(properties: string): Map<string, string> {
		let m;
		const attributes = new Map<string, string>();

		while ((m = this.parsePropertiesRegex.exec(properties)) !== null) {
			if (m.index === this.parsePropertiesRegex.lastIndex) {
				this.parsePropertiesRegex.lastIndex++;
			}

			let key: string;
			let value: string;

			m.forEach((match, groupIndex) => {
				if (groupIndex == 1 || groupIndex == 3) {
					key = match;
				}
				if (groupIndex == 2 || groupIndex == 4) {
					value = match;
					attributes.set(key, value);
				}
				if (groupIndex == 5) {
					if (match) {
						attributes.set(match, 'true');
					}
				}
			});
		}

		attributes.delete(undefined);
		return attributes;
	}
}
