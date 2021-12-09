
export class InternalLinkProcessor {

	process(markdown: string) {
		return this.transformInternalLink(markdown);
	}

	private transformInternalLink(line: string): string {

		if (line.includes('[[')) {
			var startIdx = line.indexOf('[[');
			var endIdx = line.indexOf(']]', startIdx + 3);
			var linkContent = line.substring(startIdx + 2, endIdx).trim();

			if (linkContent.includes('|')) {
				linkContent = linkContent.split('|')[1];
			}
			var result = line.substring(0, startIdx) + linkContent + line.substring(endIdx + 2);

			return this.transformInternalLink(result);
		}

		return line;
	}

}


