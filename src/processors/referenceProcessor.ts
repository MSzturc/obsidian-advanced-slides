
export class ReferenceProcessor {

	private refRegex = /\^[\w-]+\s/g;

	process(markdown: string) {
		return markdown.replaceAll(this.refRegex, '');
	}
}
