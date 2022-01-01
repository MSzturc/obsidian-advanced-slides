import { loadFront } from "yaml-front-matter";

import _ from "lodash"
import defaults from "./defaults.json";

export class YamlParser {

	getSlideOptions(options: unknown) {
		return _.defaults({}, options, defaults);
	}

	getSlidifyOptions(options: unknown) {
		const slidifyProps = ['separator', 'verticalSeparator'];
		return _.pick(options, slidifyProps)
	}

	getRevealOptions(options: unknown) {
		const revealProps = ['width', 'height', 'margin', 'minScale', 'maxScale', 'controls', 'controlsTutorial', 'controlsLayout', 'controlsBackArrows', 'progress', 'slideNumber', 'showSlideNumber', 'hashOneBasedIndex', 'hash', 'respondToHashChanges', 'history', 'keyboard', 'keyboardCondition', 'disableLayout', 'overview', 'center', 'touch', 'loop', 'rtl', 'navigationMode', 'shuffle', 'fragments', 'fragmentInURL', 'embedded', 'help', 'pause', 'showNotes', 'autoPlayMedia', 'preloadIframes', 'autoAnimate', 'autoAnimateMatcher', 'autoAnimateEasing', 'autoAnimateDuration', 'autoAnimateUnmatched', 'autoSlide', 'autoSlideStoppable', 'autoSlideMethod', 'defaultTiming', 'mouseWheel', 'previewLinks', 'postMessage', 'postMessageEvents', 'focusBodyOnPageVisibilityChange', 'transition', 'transitionSpeed', 'backgroundTransition', 'pdfMaxPagesPerSlide', 'pdfSeparateFragments', 'pdfPageHeightOffset', 'viewDistance', 'mobileViewDistance', 'display', 'hideInactiveCursor', 'hideCursorTime'];
		return _.pick(options, revealProps)
	}

	parseYamlFrontMatter(input: string): { yamlOptions: unknown; markdown: string; } {
		const document = loadFront(input.replace(/^\uFEFF/, ''));
		return {
			yamlOptions: _.omit(document, '__content'),
			markdown: document.__content || input
		};
	}

}
