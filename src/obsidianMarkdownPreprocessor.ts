import { App } from "obsidian";
import { BlockProcessor } from "./blockProcessor";
import { ImageProcessor } from "./imageProcessor";
import { MultipleFileProcessor } from "./multipleFileProcessor";

export class ObsidianMarkdownPreprocessor {

	private multipleFileProcessor : MultipleFileProcessor;
	private blockProcessor : BlockProcessor;
	private imageProcessor : ImageProcessor;

	constructor(app: App) {
		this.multipleFileProcessor = new MultipleFileProcessor(app);
		this.blockProcessor = new BlockProcessor();
		this.imageProcessor = new ImageProcessor(app);
	}

	process(markdown: string){
		const afterMultipleFileProcessor = this.multipleFileProcessor.process(markdown);
		const afterBlockProcessor = this.blockProcessor.process(afterMultipleFileProcessor);

		const afterImageProcessor = this.imageProcessor.process(afterBlockProcessor);
		return afterImageProcessor;
	}



}


