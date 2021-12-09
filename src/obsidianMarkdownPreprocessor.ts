import { App } from "obsidian";
import { BlockProcessor } from "./blockProcessor";
import { FootnoteProcessor } from "./footNoteProcessor";
import { FormatProcessor } from "./formatProcessor";
import { ImageProcessor } from "./imageProcessor";
import { InternalLinkProcessor } from "./internalLinkProcessor";
import { LatexProcessor } from "./latexProcessor";
import { MultipleFileProcessor } from "./multipleFileProcessor";

export class ObsidianMarkdownPreprocessor {

	private multipleFileProcessor : MultipleFileProcessor;
	private blockProcessor : BlockProcessor;
	private imageProcessor : ImageProcessor;
	private internalLinkProcessor : InternalLinkProcessor;
	private footnoteProcessor : FootnoteProcessor;
	private latexProcessor : LatexProcessor;
	private formatProcessor : FormatProcessor;

	constructor(app: App) {
		this.multipleFileProcessor = new MultipleFileProcessor(app);
		this.blockProcessor = new BlockProcessor();
		this.imageProcessor = new ImageProcessor(app);
		this.internalLinkProcessor = new InternalLinkProcessor();
		this.footnoteProcessor = new FootnoteProcessor();
		this.latexProcessor = new LatexProcessor();
		this.formatProcessor = new FormatProcessor();
	}

	process(markdown: string, options: any){
		const afterMultipleFileProcessor = this.multipleFileProcessor.process(markdown);
		const afterBlockProcessor = this.blockProcessor.process(afterMultipleFileProcessor);
		const afterFootNoteProcessor = this.footnoteProcessor.process(afterBlockProcessor, options);
		const afterImageProcessor = this.imageProcessor.process(afterFootNoteProcessor);
		const afterInternalLinkProcessor = this.internalLinkProcessor.process(afterImageProcessor);
		const afterLatexProcessor = this.latexProcessor.process(afterInternalLinkProcessor);
		const afterFormatProcessor = this.formatProcessor.process(afterLatexProcessor);
		return afterFormatProcessor;
	}



}


