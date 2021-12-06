import fs from "fs-extra";

export class RevealRenderer {

	constructor() {
	}

	async renderFile(filePath : String) {
		const content = await (await fs.readFile(filePath.toString())).toString();
		return content;
	}

}


