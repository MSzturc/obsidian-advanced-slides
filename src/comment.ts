export type Comment = {

	type: string,
	style: string[],
	clazz: string[]
}

export class CommentParser {

	private readCommentRegex = /<!--.*-->/;
	private styleRegex = /(?:style="([^"]+)")|(?:style='([^']+)')/;
	private classRegex = /(?:class="([^"]+)")|(?:class='([^']+)')/;
	private parseRegex = /<!--\s*\.(element|slide):\s*(.*)-->/;

	commentToString(comment: Comment): string {
		return `<!-- .${comment.type}: ${this.buildAttributes(comment)} -->`;
	}

	buildAttributes(comment: Comment): string {
		return `style="${comment.style.join('; ')}" class="${comment.clazz.join(' ')}"`;
	}

	parseLine(line: string): Comment {
		return this.lineHasComment(line)
			? this.parseComment(this.readCommentStringFromLine(line))
			: null;
	}

	parseComment(comment: string): Comment {
		try {
			var [, type, properties] = this.parseRegex.exec(comment);
			var [style, clazz] = this.parseProperties(properties);
			return this.buildComment(type, style, clazz);
		} catch (ex) {
			console.log("ERROR: Cannot parse comment: " + comment);
			return null;
		}
	}

	buildComment(type: string, style: string[] = [], clazz: string[] = []): Comment {
		return {
			type: type,
			style: style,
			clazz: clazz,
		}
	}

	private lineHasComment(line: string): boolean {
		return line?.includes("<!--") && line?.includes("-->");
	}

	private readCommentStringFromLine(line: string): string {
		return this.readCommentRegex.exec(line)?.[0] ?? '';
	}

	private parseProperties(properties: string): [string[], string[]] {
		var result: [string[], string[]] = [[], []];

		if (properties.includes('style=')) {
			result[0] = this.parseStyle(properties);
		}

		if (properties.includes('class=')) {
			result[1] = this.parseClass(properties);
		}

		return result;
	}

	private parseStyle(comment: string): string[] {
		var result = this.styleRegex.exec(comment)?.[1] ?? '';
		return result.split(";").map((attr) => {
			return attr.trim();
		});
	}

	private parseClass(comment: string): string[] {
		var result = this.classRegex.exec(comment)?.[1] ?? '';
		return result.split(" ").map((attr) => {
			return attr.trim();
		});
	}

}
