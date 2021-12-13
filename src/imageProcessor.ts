import { App } from "obsidian";

type Comment = {
	type: string,
	style: string[],
	clazz: string[]
}

export class ImageProcessor {

	private app: App;

	private markdownImageRegex = /!\[[^\]]*\]\(.*(jpg|png|jpeg|gif|bmp|svg)\)/gmi;

	constructor(app: App) {
		this.app = app;
	}

	process(markdown: string){
		return markdown
        .split('\n')
        .map((line) => {
            // Transform ![[myImage.png]] to ![](myImage.png)
			if(this.isImage(line)){
                return this.transformImageString(line);
			}
            return line;
        })
        .map((line) => {
            // Transform ![](myImage.png) to html
            if (this.markdownImageRegex.test(line))
                return this.htmlify(line);
            return line;
        })
        .join('\n');
	}

	private isImage(line: string){

		if(!line.contains('![[')){
			return false;
		}

		if(!line.contains(']]')){
			return false;
		}

		if(['jpg','png','jpeg', 'gif', 'bmp', 'svg'].filter( (x) => {
			return line.contains(x);
		}).length < 1) {
			return false;
		} 

		return true;
	}

	private transformImageString(line: string){

		var commentAsString = null;
	
		if (line.includes("<!--")) {
			commentAsString = line.substring(line.indexOf("<!--"));
		}
	
		var filePath = line.replace("![[", "").replace("]]", "");
	
		if (commentAsString != null) {
			filePath = filePath.replace(commentAsString, "").trim();
		}
	
		if (filePath.includes("|")) {
			const split = filePath.split("|");
			filePath = split[0];
			commentAsString = this.buildComment(split[1], commentAsString);
		}

		filePath = this.findFile(filePath);
	
		if (commentAsString != null) {
			return "![](" + filePath + ") " + commentAsString;
		} else {
			return "![](" + filePath + ")";
		}
	
	}

	private findFile(line: string) {
		const imgFile = this.app.vault.getFiles().filter(item => item.path.contains(line)).first();
		if(imgFile){
			return '/'+ imgFile.path;
		} else {
			return line;
		}
	}

	private buildComment(toParse: string, commentAsString: string) {

		var comment: Comment;

		if (commentAsString === null) {
			comment = {
				type: 'element',
				style: [],
				clazz: [],
			}
		} else {
			comment = this.parseComment(commentAsString);
		}
	
		var width = null;
		var height = null;
	
		if (toParse.includes("x")) {
			const split = toParse.split("x");
			width = split[0];
			height = split[1];
		} else {
			width = toParse;
		}
	
		width = "width: " + width + "px";
	
		comment.style.push(width);
	
		if (height != null) {
			height = "height: " + height + "px";
			comment.style.push(height);
		}
	
		return this.commentToString(comment);
	}

	private commentToString(comment: Comment) {
		var result = '<!-- ';
	
		if (comment.type === 'element') {
			result += '.element: ';
		} else {
			console.log("ERROR: type not supported: " + comment.type);
		}
	
		result += this.buildAttributes(comment);
	
		result += ' -->';
		return result;
	
	}


	private htmlify(line: string) {

		var commentAsString = null;
		var comment: Comment = null;
	
		if (line.includes("<!--")) {
			commentAsString = line.substring(line.indexOf("<!--")).trim();
			comment = this.parseComment(commentAsString);
		}
	
		var startIdx = line.indexOf('(') + 1;
		var endIdx = line.indexOf(')', startIdx);
		var filePath = line.substring(startIdx, endIdx).trim();
	
		var startAltIdx = line.indexOf('[') + 1;
		var endAltIdx = line.indexOf(']', startAltIdx);
		var alt = line.substring(startAltIdx, endAltIdx).trim();
	
		var result = '<img src="' + filePath + '" alt="' + alt + '"></img>';
	
		if (comment === null) {
			comment = { 'type': 'element', 'style': [], 'clazz': ['reset-paragraph'] }
		} else {
			if (!comment.clazz.includes('reset-paragraph')) {
				comment.clazz.push('reset-paragraph');
			}
		}
	
		if (comment != null && comment.type === 'element') {
			result = '<p ' + this.buildAttributes(comment) + '>' + result + '</p>';
		}	
		return result;
	}

	private parseComment(comment: string) {

		var result: Comment = {
			type: null,
			style: [],
			clazz: [],
		}
	
		if (comment.startsWith('<!--') && comment.endsWith('-->')) {
	
			//.element: style="height: 200px; width:300px" class="blub"
			var strip = comment.replace('<!--', '').replace('-->', '').trim();
	
			if (strip.startsWith('.element:')) {
				result.type = 'element';
	
				//style="height: 200px; width:300px" class="blub"
				strip = strip.replace('.element:', '').trim();
	
				if (strip.includes('style=')) {
					result.style = this.parseStyle(strip);
				}
	
				if (strip.includes('class=')) {
					result.clazz = this.parseClass(strip);
				}
	
				return result;

			} else {
				console.log("ERROR: Type not supported: " + comment);
				return null;
			}
	
		} else {
			console.log("ERROR: Cannot parse comment: " + comment);
			return null;
		}
	}

	private buildAttributes(comment: Comment) {
		var result: string = '';
	
		if (comment.style.length > 0) {
			var styles = "";
			for (let item of comment.style) {
				styles += item + "; "
			}
	
			result += 'style="' + styles.trim() + '" ';
		}
	
		if (comment.clazz.length > 0) {
			var clazzes = "";
			for (let item of comment.clazz) {
				clazzes += item + " "
			}
	
			result += 'class="' + clazzes.trim() + '" ';
		}
	
		return result.trim();
	}

	private parseStyle(toParse: string) {

		var quote = "'";
	
		if (toParse.includes("\"")) {
			quote = '"';
		}
	
		var startIdx = toParse.indexOf('style=') + 7;
		var endIdx = toParse.indexOf(quote, startIdx + 1);
	
		var value = toParse.substring(startIdx, endIdx);
		return value.split(";").map((line, index) => {
			return line.trim();
		});
	}

	private parseClass(toParse: string) {

		var quote = "'";
	
		if (toParse.includes("\"")) {
			quote = '"';
		}
	
		var startIdx = toParse.indexOf('class=') + 7;
		var endIdx = toParse.indexOf(quote, startIdx + 1);
	
		var value = toParse.substring(startIdx, endIdx);
		return value.split(" ").map((line, index) => {
			return line.trim();
		});
	}

}


