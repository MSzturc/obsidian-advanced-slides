import { App } from "obsidian";
import { MultipleFileProcessor } from "./multipleFileProcessor";

export class ObsidianMarkdownPreprocessor {

	private multipleFileProcessor : MultipleFileProcessor;

	constructor(app: App) {
		this.multipleFileProcessor = new MultipleFileProcessor(app);
	}

	process(markdown: string){
		const afterMultipleFileProcessor = this.multipleFileProcessor.process(markdown);
		return afterMultipleFileProcessor;
	}



}


