export class MermaidProcessor {
	process(markdown: string) {
		return this.transformMermaid(markdown);
	}

	transformMermaid(markdown: string): string {
		const startIdx = markdown.indexOf('```mermaid');

		if (startIdx < 0) {
			return markdown;
		} else {
			const endIdx = markdown.indexOf('```', startIdx + 11);
			if (endIdx < 0) {
				return markdown;
			}

			const before = markdown.substring(0, startIdx);
			const after = markdown.substring(endIdx + 3);
			const content = markdown.substring(startIdx + 11, endIdx);

			const result = before + '\n' + '<div class="mermaid">' + '\n' + content + '\n' + '</div>' + '\n' + after;

			return this.transformMermaid(result);
		}
	}
}
