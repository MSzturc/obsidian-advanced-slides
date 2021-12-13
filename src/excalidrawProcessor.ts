import { App, Notice } from "obsidian";

export class ExcalidrawProcessor {

	private regex = /!\[\[(.*\.excalidraw)\]\]/gm;

	private app: App;


	constructor(app: App) {
		this.app = app;
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

		var imgFile = this.findImage(filePath);


		if (imgFile === null) {
			new Notice(`Cannot find Image for ${filePath}. Make sure to activate Auto-export SVG/PNG in Excalidraw Settings.`, 8000);
			return line;
		}

		return '![['+ imgFile + ']]';
	}

	private findImage(filePath: string){

		var imagePath = filePath + '.svg';
		var imgFile = this.app.vault.getFiles().filter(item => item.path.contains(imagePath)).first();

		if(imgFile){
			return imagePath;
		}
		
		imagePath = filePath + '.png';
		imgFile = this.app.vault.getFiles().filter(item => item.path.contains(imagePath)).first();

		if(imgFile){
			return imagePath;
		}
		return null;
	}


	private findFile(line: string) {
		const imgFile = this.app.vault.getFiles().filter(item => item.path.contains(line)).first();
		if(imgFile){
			return '/'+ imgFile.path;
		} else {
			return line;
		}
	}
}


