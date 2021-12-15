
export class FormatProcessor {

	private regex = /==([^=]*)==/gm;
	private commentRegex = /%%([^%]*)%%/gm;

	process(markdown: string){
		return markdown.replaceAll('__','**')
		.replaceAll(this.regex,'<mark>$1</mark>')
		.replaceAll(this.commentRegex,'');
	}

}
