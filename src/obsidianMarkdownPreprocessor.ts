import { BlockProcessor } from './processors/blockProcessor';
import { ExcalidrawProcessor } from './processors/excalidrawProcessor';
import { FootnoteProcessor } from './processors/footNoteProcessor';
import { FormatProcessor } from './processors/formatProcessor';
import { FragmentProcessor } from './processors/fragmentProcessor';
import { GridProcessor } from './processors/gridProcessor';
import { ImageProcessor } from './processors/imageProcessor';
import { InternalLinkProcessor } from './processors/internalLinkProcessor';
import { LatexProcessor } from './processors/latexProcessor';
import { MermaidProcessor } from './processors/mermaidProcessor';
import { MultipleFileProcessor } from './processors/multipleFileProcessor';
import { ObsidianUtils } from './obsidianUtils';
import { Options } from './options';
import { CommentProcessor } from './processors/commentProcessor';
import { DropProcessor } from './processors/dropProcessor';
import { YamlStore } from './yamlStore';
import { AutoClosingProcessor } from './processors/autoClosingProcessor';
import { EmojiProcessor } from './processors/emojiProcessor';
import { IconsProcessor } from './processors/iconsProcessor';
import { DebugViewProcessor } from './processors/debugViewProcessor';
import { CalloutProcessor } from './processors/calloutProcessor';
import { TemplateProcessor } from './processors/templateProcessor';
import { ChartProcessor } from './processors/chartProcessor';
import { DefaultBackgroundProcessor } from './processors/defaultBackgroundProcessor';
import { ReferenceProcessor } from './processors/referenceProcessor';

export class ObsidianMarkdownPreprocessor {
	private multipleFileProcessor: MultipleFileProcessor;
	private blockProcessor: BlockProcessor;
	private imageProcessor: ImageProcessor;
	private internalLinkProcessor: InternalLinkProcessor;
	private footnoteProcessor: FootnoteProcessor;
	private latexProcessor: LatexProcessor;
	private formatProcessor: FormatProcessor;
	private excalidrawProcessor: ExcalidrawProcessor;
	private mermaidProcessor: MermaidProcessor;
	private fragmentProcessor: FragmentProcessor;
	private gridProcessor: GridProcessor;
	private commentProcessor: CommentProcessor;
	private dropProcessor: DropProcessor;
	private autoClosingProcessor: AutoClosingProcessor;
	private emojiProcessor: EmojiProcessor;
	private iconsProcessor: IconsProcessor;
	private debugViewProcessor: DebugViewProcessor;
	private calloutProcessor: CalloutProcessor;
	private templateProcessor: TemplateProcessor;
	private chartProcessor: ChartProcessor;
	private defaultBackgroundProcessor: DefaultBackgroundProcessor;
	private referenceProcessor: ReferenceProcessor;

	constructor(utils: ObsidianUtils) {
		this.multipleFileProcessor = new MultipleFileProcessor(utils);
		this.blockProcessor = new BlockProcessor();
		this.imageProcessor = new ImageProcessor(utils);
		this.internalLinkProcessor = new InternalLinkProcessor(utils);
		this.footnoteProcessor = new FootnoteProcessor();
		this.latexProcessor = new LatexProcessor();
		this.formatProcessor = new FormatProcessor();
		this.excalidrawProcessor = new ExcalidrawProcessor(utils);
		this.mermaidProcessor = new MermaidProcessor();
		this.fragmentProcessor = new FragmentProcessor();
		this.gridProcessor = new GridProcessor();
		this.commentProcessor = new CommentProcessor();
		this.dropProcessor = new DropProcessor();
		this.autoClosingProcessor = new AutoClosingProcessor();
		this.emojiProcessor = new EmojiProcessor();
		this.iconsProcessor = new IconsProcessor();
		this.debugViewProcessor = new DebugViewProcessor();
		this.calloutProcessor = new CalloutProcessor();
		this.templateProcessor = new TemplateProcessor(utils);
		this.chartProcessor = new ChartProcessor();
		this.defaultBackgroundProcessor = new DefaultBackgroundProcessor();
		this.referenceProcessor = new ReferenceProcessor();
	}
	process(markdown: string, options: Options) {
		YamlStore.getInstance().options = options;

		let before = this.trimEnding(markdown, options);
		let after;

		let circuitCounter = 0;
		while (before != after) {
			circuitCounter++;
			if (after) {
				before = after;
			}
			const afterMultipleFileProcessor = this.multipleFileProcessor.process(before);
			after = this.templateProcessor.process(afterMultipleFileProcessor, options);

			//Remove default templates after first pass
			options.defaultTemplate = null;

			if (circuitCounter > 9) {
				console.log('WARNING: Circuit in template hierarchy detected!');
				break;
			}
		}

		const afterReferenceProcessor = this.referenceProcessor.process(after);
		const afterDebugViewProcessor = this.debugViewProcessor.process(afterReferenceProcessor, options);
		const afterAutoClosingProcessor = this.autoClosingProcessor.process(afterDebugViewProcessor);
		const defaultBackgroundProcessor = this.defaultBackgroundProcessor.process(afterAutoClosingProcessor, options);
		const afterCalloutProcessor = this.calloutProcessor.process(defaultBackgroundProcessor);
		const afterEmojiProcessor = this.emojiProcessor.process(afterCalloutProcessor);
		const afterIconsProcessor = this.iconsProcessor.process(afterEmojiProcessor);
		const afterMermaidProcessor = this.mermaidProcessor.process(afterIconsProcessor);
		const afterBlockProcessor = this.blockProcessor.process(afterMermaidProcessor);
		const afterFootNoteProcessor = this.footnoteProcessor.process(afterBlockProcessor, options);
		const afterExcalidrawProcessor = this.excalidrawProcessor.process(afterFootNoteProcessor);
		const afterImageProcessor = this.imageProcessor.process(afterExcalidrawProcessor);
		const afterInternalLinkProcessor = this.internalLinkProcessor.process(afterImageProcessor, options);
		const afterLatexProcessor = this.latexProcessor.process(afterInternalLinkProcessor);
		const afterFormatProcessor = this.formatProcessor.process(afterLatexProcessor);
		const afterFragmentProcessor = this.fragmentProcessor.process(afterFormatProcessor, options);
		const afterDropProcessor = this.dropProcessor.process(afterFragmentProcessor, options);
		const afterGridProcessor = this.gridProcessor.process(afterDropProcessor, options);
		const afterCommentProcessor = this.commentProcessor.process(afterGridProcessor);
		const afterChartProcessor = this.chartProcessor.process(afterCommentProcessor, options);

		if (options.log) {
			this.log('markdown', '', markdown);
			this.log('merge & template', markdown, after);
			this.log('afterReferenceProcessor', after, afterReferenceProcessor);
			this.log('afterDebugViewProcessor', afterReferenceProcessor, afterDebugViewProcessor);
			this.log('afterAutoClosingProcessor', afterDebugViewProcessor, afterAutoClosingProcessor);
			this.log('defaultBackgroundProcessor', afterAutoClosingProcessor, defaultBackgroundProcessor);
			this.log('afterCalloutProcessor', defaultBackgroundProcessor, afterCalloutProcessor);
			this.log('afterEmojiProcessor', afterCalloutProcessor, afterEmojiProcessor);
			this.log('afterIconsProcessor', afterEmojiProcessor, afterIconsProcessor);
			this.log('afterMermaidProcessor', afterIconsProcessor, afterMermaidProcessor);
			this.log('afterBlockProcessor', afterMermaidProcessor, afterBlockProcessor);
			this.log('afterFootNoteProcessor', afterBlockProcessor, afterFootNoteProcessor);
			this.log('afterExcalidrawProcessor', afterFootNoteProcessor, afterExcalidrawProcessor);
			this.log('afterImageProcessor', afterExcalidrawProcessor, afterImageProcessor);
			this.log('afterInternalLinkProcessor', afterImageProcessor, afterInternalLinkProcessor);
			this.log('afterLatexProcessor', afterInternalLinkProcessor, afterLatexProcessor);
			this.log('afterFormatProcessor', afterLatexProcessor, afterFormatProcessor);
			this.log('afterFragmentProcessor', afterFormatProcessor, afterFragmentProcessor);
			this.log('afterDropProcessor', afterFragmentProcessor, afterDropProcessor);
			this.log('afterGridProcessor', afterDropProcessor, afterGridProcessor);
			this.log('afterCommentProcessor', afterGridProcessor, afterCommentProcessor);
			this.log('afterChartProcessor', afterCommentProcessor, afterChartProcessor);

		}

		return afterChartProcessor;
	}
	trimEnding(markdown: string, options: Options): string {

		const input = markdown + '\n';

		let m;
		if ((m = new RegExp(options.separator, 'gmi').exec(input)) !== null) {
			const [match] = m;

			if (input.endsWith(match)) {
				return input.substring(0, input.lastIndexOf(match));
			}
		}

		if ((m = new RegExp(options.verticalSeparator, 'gmi').exec(input)) !== null) {
			const [match] = m;

			if (input.endsWith(match)) {
				return input.substring(0, input.lastIndexOf(match));
			}
		}

		return markdown;
	}

	log(name: string, before: string, after: string) {
		if (before != after) {
			console.log(`${name}: ${after}`);
		}
	}
}

