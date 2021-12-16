
export class InternalLinkProcessor {

	private regex = /\[\[(?:.*\|)?([^\]]*)\]\]/gm;

	process(markdown: string) {
		return markdown.replaceAll(this.regex,`$1`);
	}
}


