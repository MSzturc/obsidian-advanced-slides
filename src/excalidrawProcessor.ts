import { Notice } from "obsidian";
import { ObsidianUtils } from "./obsidianUtils";

export class ExcalidrawProcessor {

	private regex = /!\[\[(.*\.excalidraw)\]\]/gm;

	private utils: ObsidianUtils;


	constructor(utils: ObsidianUtils) {
		this.utils = utils;
	}

	process(markdown: string){
		return markdown
			.split('\n')
			.map((line) => {
				if (this.regex.test(line))
					return this.transformLine(line);
				return line;
			})
			.join('\n');
	}

	private transformLine(line: string) {
		var filePath: string = line.replace("![[", "").replace("]]", "");

		if (filePath.includes('|')) {
			const split = filePath.split('|');
			filePath = split[0];
		}

		var imgFile = this.utils.findImageEx(filePath);

		if (imgFile === null) {
			new Notice(`Cannot find Image for ${filePath}. Make sure to activate Auto-export SVG/PNG in Excalidraw Settings.`, 8000);
			return line;
		}

		return '![['+ imgFile + ']]';
	}
}


