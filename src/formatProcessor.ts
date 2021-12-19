
export class FormatProcessor {

	private boldRegex = /(?<=[^_]|^)__([^_]+)__(?:[^_]|$)/gm;
	private markRegex = /==([^=]*)==/gm;
	private commentRegex = /%%([^%]*)%%/gm;

	process(markdown: string){
		return markdown.replaceAll(this.boldRegex,(sub, args) =>{
			return `**${args.trim()}**`;
		})
		.replaceAll(this.markRegex,'<mark>$1</mark>')
		.replaceAll(this.commentRegex,'');
	}

}
