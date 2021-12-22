export type Comment = {

	type: string,
	style: string[],
	clazz: string[],
	attributes: Map<string, string>,
}

export class CommentParser {

	private readCommentRegex = /<!--.*-->/;
	private styleRegex = /(?:style="([^"]+)")|(?:style='([^']+)')/;
	private classRegex = /(?:class="([^"]+)")|(?:class='([^']+)')/;
	private parseRegex = /<!--\s*\.(element|slide):\s*(.*)-->/;
	private parsePropertiesRegex = /([^=]*)\s*=\s*"([^"]*)"\s*|([^=]*)\s*=\s*'([^']*)'\s*/g;

	commentToString(comment: Comment): string {
		return `<!-- .${comment.type}: ${this.buildAttributes(comment)} -->`;
	}

	buildAttributes(comment: Comment): string {
		return `style="${comment.style.join('; ')}" class="${comment.clazz.join(' ')}" ${this.attributeMapToString(comment.attributes)}`;
	}

	parseLine(line: string): Comment {
		return this.lineHasComment(line)
			? this.parseComment(this.readCommentStringFromLine(line))
			: null;
	}

	parseComment(comment: string): Comment {
		try {
			let [, type, properties] = this.parseRegex.exec(comment);
			let [style, clazz, attributes] = this.parseProperties(properties);
			return this.buildComment(type, style, clazz, attributes);
		} catch (ex) {
			console.log("ERROR: Cannot parse comment: " + comment);
			return null;
		}
	}

	buildComment(type: string, style: string[] = [], clazz: string[] = [], attributes: Map<string, string> = new Map<string, string>()): Comment {
		return {
			type: type,
			style: style,
			clazz: clazz,
			attributes: attributes,
		}
	}

	private attributeMapToString(attributes: Map<string, string>): string {
		let result = [];
		for (const [key, value] of attributes) {
			result.push(`${key}="${value}"`);
		}
		return result.join(" ");
	}

	private lineHasComment(line: string): boolean {
		return line?.includes("<!--") && line?.includes("-->");
	}

	private readCommentStringFromLine(line: string): string {
		return this.readCommentRegex.exec(line)?.[0] ?? '';
	}

	private parseProperties(properties: string): [string[], string[], Map<string, string>] {
		let result: [string[], string[], Map<string, string>] = [[], [], new Map<string, string>()];

		if (properties.includes('style=')) {
			result[0] = this.parseStyle(properties);
		}

		if (properties.includes('class=')) {
			result[1] = this.parseClass(properties);
		}

		result[2] = this.parseAttributes(properties);

		return result;
	}

	private parseStyle(comment: string): string[] {
		let result = this.styleRegex.exec(comment)?.[1] ?? '';
		return result.split(";").map((attr) => {
			return attr.trim();
		});
	}

	private parseClass(comment: string): string[] {
		let result = this.classRegex.exec(comment)?.[1] ?? '';
		return result.split(" ").map((attr) => {
			return attr.trim();
		});
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
			});

		}

		attributes.delete(undefined);
		attributes.delete('style');
		attributes.delete('class');
		return attributes;
	}

}
