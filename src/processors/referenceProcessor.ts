
export class ReferenceProcessor {

	private refRegex = /\^[\w-]+/g;

	process(markdown: string) {
		return markdown.replaceAll(this.refRegex, '');
	}
}
