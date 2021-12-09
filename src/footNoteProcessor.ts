
export class FootnoteProcessor {

	private regex = /\[\^([^\]]*)]/gmi;

	process(markdown: string, options: any){

		var output = markdown;

		var result = markdown
        .split(new RegExp(options.separator, 'gmi'))
        .map((slidegroup, index) => {
            return slidegroup
                .split(new RegExp(options.verticalSeparator, 'gmi'))
                .map((slide, index) => {
                    if (this.regex.test(slide)) {
						var newSlide = this.transformFootNotes(slide);
						output = output.replace(slide, newSlide);
                        return newSlide;
                    }
                    return slide;
                })
                .join(options.verticalSeparator);
        })
        .join(options.separator);
    return output;
	}

	transformFootNotes(markdown: string) {

		var input = markdown;
		var noteIdx = 1;
	
		var footNotes = new Map();
	
		var reResult : RegExpExecArray;
		while (reResult = this.regex.exec(input)) {
	
			input = input
				.split('\n')
				.map((line, index) => {
					if (line.includes(reResult[0])) {
						if (line.includes(reResult[0] + ": ")) {
							if (!footNotes.has(reResult[1])) {
								footNotes.set(reResult[1], line.split(reResult[0] + ": ")[1]);
							}
							return "";
						} else {
							var split = line.split(reResult[0]);
	
							var result = split[0].trim();
							result += '<sup id="fnref:' + reResult[1] + '" role="doc-noteref">' + noteIdx + '</sup>';
							result += '\n' + split[1].trim();
	
							noteIdx = noteIdx + 1;
	
							return result;
	
						}
					}
					return line;
				})
				.join('\n');
	
	
		}
	
		var footNotesBlock = '';
		footNotesBlock += '<div class="footnotes" role="doc-endnotes">\n';
		footNotesBlock += '<ol>\n';
	
		footNotes.forEach((value, key) => {
			footNotesBlock += '<li id="fn:' + key + '" role="doc-endnote"><p>' + value + '&nbsp;</p></li>';
		});
	
	
		footNotesBlock += '</ol>\n';
		footNotesBlock += '</div>\n';
	
		return input + '\n' + footNotesBlock;
	}

}


