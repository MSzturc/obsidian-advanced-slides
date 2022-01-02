import { emptyDir, copy } from "fs-extra";
import { writeFile } from "fs/promises";
import path from "path";
import { ObsidianUtils } from "./obsidianUtils";


export class RevealExporter {

	private pluginDirectory: string;
	private exportDirectory: string;

	constructor(utils: ObsidianUtils) {
		this.pluginDirectory = utils.getPluginDirectory();
		this.exportDirectory = utils.getExportDirectory();
	}

	public async export(filePath: string, html: string, imgList: string[]) {

		const ext = path.extname(filePath);
		const folderName = path.basename(filePath).replaceAll(ext, '');
		const folderDir = path.join(this.exportDirectory, folderName);

		await emptyDir(folderDir);
		await writeFile(path.join(folderDir, 'index.html'), html);

		await copy(path.join(this.pluginDirectory, 'css'), path.join(folderDir, 'css'));
		await copy(path.join(this.pluginDirectory, 'dist'), path.join(folderDir, 'dist'));
		await copy(path.join(this.pluginDirectory, 'plugin'), path.join(folderDir, 'plugin'));

		window.open('file://' + folderDir);
	}

}
