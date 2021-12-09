
export class FormatProcessor {

	private regex = /\$..*\$/gm;

	process(markdown: string){
		return markdown.replaceAll('__','**');
	}

}
