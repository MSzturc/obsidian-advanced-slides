import { App, FileSystemAdapter } from "obsidian";


export class ObsidianUtils {

	private app: App;

	constructor(app: App) {
		this.app = app;
	}

	getAbsolutePath(filename: string): string {
		const adapter = this.app.vault.adapter as FileSystemAdapter;
		const markdownFile = this.app.vault.getMarkdownFiles().filter((item: { path: string | any[]; }) => {
			return item.path.contains(filename)
		}
		).first();
		if (markdownFile)
			return adapter.getFullPath(markdownFile.path);
		else {
			return null;
		}
	}

	findFile(imagePath: string) {
		const imgFile = this.app.vault.getFiles()
			.filter(item => item.path.contains(imagePath))
			.first();

		if (imgFile) {
			return '/' + imgFile.path;
		} else {
			return imagePath;
		}
	}

	findImageEx(filePath: string){

		var imagePath = filePath + '.svg';
		var imgFile = this.app.vault.getFiles()
		.filter(item => item.path.contains(imagePath))
		.first();

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


	getVaultName(){
		return this.app.vault.getName();
	}
	

}
