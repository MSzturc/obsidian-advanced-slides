import fs from "fs-extra";
import { App, FileSystemAdapter } from "obsidian";

export class MultipleFileProcessor {

	private app: App;

	private regex = /!\[\[(.*)\]\]/gm;
	
	constructor(app: App) {
		this.app = app;
	}

	process(markdown: string){
		return markdown
        .split('\n')
        .map((line, index) => {
            if (this.regex.test(line))
                return this.transformLine(line);
            return line;
        })
        .join('\n');
	}

	transformLine (line) {
		var filePath = line.replace("![[", "").replace("]]", "");
		var header = null;
	
		if (filePath.includes('#')) {
			const split = filePath.split('#');
			filePath = split[0];
			header = split[1];
		}
	
		const res = this.getMarkdownFile(filePath);
	
		if (res === null) {
			return line;
		}
	
		return this.process(this.parseFile(res, header));
	}

	parseFile(file, header) {

		var fileContent = fs.readFileSync(file, {encoding: 'utf-8'});
	
		if (header === null) {
			return fileContent;
		} else {
	
			var lines = fileContent.split('\n');
	
			var startIdx = null;
			var endIdx = null;
			for (let i = 0; i < lines.length; i++) {
	
				if (startIdx != null && lines[i].startsWith('#')) {
					endIdx = i;
					break;
				}
	
				if (lines[i].includes(header)) {
					startIdx = i;
				}
			}
	
			if (startIdx === null) {
				return "![[" + file + "#" + header + "]]";
			}
	
			if (endIdx === null) {
				return lines.slice(startIdx).join('\n');
			} else {
				return lines.slice(startIdx, endIdx).join('\n');
			}
		}
	}

	getMarkdownFile(line) {
		var file = line;
		if (!line.toLowerCase().endsWith(".md")) {
			file = file + ".md";
		}

		const adapter = this.app.vault.adapter as FileSystemAdapter;
		const markdownFile = this.app.vault.getMarkdownFiles().filter(item => item.path.contains(file)).first();
		const filePath = adapter.getFullPath(markdownFile.path);

		return filePath;
	}
}


