import { App } from "obsidian";
import { BlockProcessor } from "./blockProcessor";
import { ImageProcessor } from "./imageProcessor";
import { InternalLinkProcessor } from "./internalLinkProcessor";
import { MultipleFileProcessor } from "./multipleFileProcessor";

export class ObsidianMarkdownPreprocessor {

	private multipleFileProcessor : MultipleFileProcessor;
	private blockProcessor : BlockProcessor;
	private imageProcessor : ImageProcessor;
	private internalLinkProcessor : InternalLinkProcessor;

	constructor(app: App) {
		this.multipleFileProcessor = new MultipleFileProcessor(app);
		this.blockProcessor = new BlockProcessor();
		this.imageProcessor = new ImageProcessor(app);
		this.internalLinkProcessor = new InternalLinkProcessor();
	}

	process(markdown: string){
		const afterMultipleFileProcessor = this.multipleFileProcessor.process(markdown);
		const afterBlockProcessor = this.blockProcessor.process(afterMultipleFileProcessor);

		const afterImageProcessor = this.imageProcessor.process(afterBlockProcessor);
		const afterInternalLinkProcessor = this.internalLinkProcessor.process(afterImageProcessor);
		return afterInternalLinkProcessor;
	}



}


