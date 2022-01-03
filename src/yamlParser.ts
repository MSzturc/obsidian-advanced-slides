import { loadFront } from "yaml-front-matter";

import _ from "lodash"
import defaults from "./defaults.json";
import { AdvancedSlidesSettings } from "./main";

export class YamlParser {

	private settings: AdvancedSlidesSettings;

	constructor(settings: AdvancedSlidesSettings) {
		this.settings = settings;
	}

	getSlideOptions(options: unknown) {
		const globalSettings = _.omitBy(this.settings, _.isEmpty);
		return _.defaults({}, options, globalSettings, defaults);
	}

	getSlidifyOptions(options: unknown) {
		const slidifyProps = ['separator', 'verticalSeparator'];
		return _.pick(options, slidifyProps)
	}

	getRevealOptions(options: unknown) {
		const revealProps = ['width', 'height', 'margin', 'minScale', 'maxScale', 'controls', 'controlsTutorial', 'controlsLayout', 'controlsBackArrows', 'progress', 'slideNumber', 'showSlideNumber', 'hashOneBasedIndex', 'hash', 'respondToHashChanges', 'history', 'keyboard', 'keyboardCondition', 'disableLayout', 'overview', 'center', 'touch', 'loop', 'rtl', 'navigationMode', 'shuffle', 'fragments', 'fragmentInURL', 'embedded', 'help', 'pause', 'showNotes', 'autoPlayMedia', 'preloadIframes', 'autoAnimate', 'autoAnimateMatcher', 'autoAnimateEasing', 'autoAnimateDuration', 'autoAnimateUnmatched', 'autoSlide', 'autoSlideStoppable', 'autoSlideMethod', 'defaultTiming', 'mouseWheel', 'previewLinks', 'postMessage', 'postMessageEvents', 'focusBodyOnPageVisibilityChange', 'transition', 'transitionSpeed', 'backgroundTransition', 'pdfMaxPagesPerSlide', 'pdfSeparateFragments', 'pdfPageHeightOffset', 'viewDistance', 'mobileViewDistance', 'display', 'hideInactiveCursor', 'hideCursorTime'];
		const globalSettings = _.pick(_.omitBy(this.settings, _.isEmpty), revealProps);
		const slideSettings = _.pick(options, revealProps);
		return _.defaults({}, slideSettings, globalSettings);
	}

	getTemplateSettings(options: unknown) {
		const properties = ['enableOverview', 'enableChalkboard', 'enableMenu'];

		const globalSettings = _.pick(this.settings, properties);
		const slideSettings = _.pick(options, properties);

		return _.defaults({}, slideSettings, globalSettings);
	}

	parseYamlFrontMatter(input: string): { yamlOptions: unknown; markdown: string; } {
		const document = loadFront(input.replace(/^\uFEFF/, ''));
		return {
			yamlOptions: _.omit(document, '__content'),
			markdown: document.__content || input
		};
	}

}
