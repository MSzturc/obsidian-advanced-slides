import { Options } from "../options";
import { Properties } from "src/transformers";

export class GridProcessor {

	private gridRegex = /<\s*grid([^>]+)>(.*?)<\/grid>/sg;
	private gridPropertiesRegex = /([^=]*)\s*=\s*"([^"]*)"\s*|([^=]*)\s*=\s*'([^']*)'\s*/g;

	process(markdown: string, options: Options) {
		let output = markdown;

		markdown
			.split(new RegExp(options.separator, 'gmi'))
			.map((slidegroup) => {
				return slidegroup
					.split(new RegExp(options.verticalSeparator, 'gmi'))
					.map((slide) => {
						if (this.gridRegex.test(slide)) {
							const newSlide = this.transformSlide(slide);
							output = output.split(slide).join(newSlide);
							return newSlide;
						}
						return slide;
					})
					.join(options.verticalSeparator);
			})
			.join(options.separator);

		return output;
	}

	transformSlide(slide: string) {
		const result: Map<string, string> = new Map<string, string>();
		this.gridRegex.lastIndex = 0;

		let m;
		while ((m = this.gridRegex.exec(slide)) !== null) {
			if (m.index === this.gridRegex.lastIndex) {
				this.gridRegex.lastIndex++;
			}
			const [match, attr, inner] = m;
			result.set(match, this.transformGrid(attr, inner));
		}

		for (const [key, value] of result) {
			if (value) {
				slide = slide.split(key).join(value);
			}
		}
		return slide + '\n<!-- .slide: class="stack" -->';
	}

	transformGrid(attr: string, inner: string): string {
		const attributes = this.parseAttributes(attr.trim());
		const properties = new Properties(attributes);
		return `<div class="${properties.getClasses()}" style="${properties.getStyles()}" ${properties.getAttributes()}>\n${inner}</div>`;
	}

	parseAttributes(attributes: string): Map<string, string> {
		const result: Map<string, string> = new Map<string, string>();
		this.gridPropertiesRegex.lastIndex = 0;

		let m;
		while ((m = this.gridPropertiesRegex.exec(attributes)) !== null) {
			if (m.index === this.gridPropertiesRegex.lastIndex) {
				this.gridPropertiesRegex.lastIndex++;
			}
			const [, key, value] = m;
			result.set(key, value);
		}

		return result;
	}

}
