
export class LatexProcessor {

	private regex = /\$..*\$/gm;

	process(markdown: string){
		return this.transformLatex(markdown);
	}

	private transformLatex(markdown: string) {
		return markdown
        .split('\n')
        .map((line, index) => {
            if (this.regex.test(line))
                return this.transformLine(line);
            return line;
        })
        .join('\n');
	}

	private transformLine(line: string){
		line = line.replace('$','`$');
		line = line.split('').reverse().join('');
		line = line.replace('$','`$');
		line = line.split('').reverse().join('');
		return line;
	}
	
}
