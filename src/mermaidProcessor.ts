
export class MermaidProcessor {

	process(markdown: string){
		return this.transformMermaid(markdown);
	}

	transformMermaid(markdown: string) : string {

		var startIdx = markdown.indexOf('```mermaid');

		if(startIdx < 0){
			return markdown;
		} else {
			var endIdx = markdown.indexOf('```', startIdx+11);
			if(endIdx < 0){
				return markdown;
			}

			var before = markdown.substring(0,startIdx);
			var after = markdown.substring(endIdx+3);
			var content = markdown.substring(startIdx+11,endIdx);

			var result = before + '\n' + '<div class="mermaid">' + '\n' + content + '\n' + '</div>' + '\n' + after;

			return this.transformMermaid(result);

		}
	}

}


