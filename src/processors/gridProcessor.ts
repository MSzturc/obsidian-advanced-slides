import { Options } from '../options';
import { Properties } from 'src/transformers';

export class GridProcessor {
	private gridBlockRegex = /<\s*grid(?:(?!(<grid|<\/grid>)).)*<\/grid>/gs;
	private gridRegex = /<\s*grid([^>]+)>(.*?)<\/grid>/s;
	private gridPropertiesRegex = /([^=]*)\s*=\s*"([^"]*)"\s*|([^=]*)\s*=\s*'([^']*)'\s*/g;

	process(markdown: string, options: Options) {
		let output = markdown;

		markdown
			.split(new RegExp(options.separator, 'gmi'))
			.map(slidegroup => {
				return slidegroup
					.split(new RegExp(options.verticalSeparator, 'gmi'))
					.map(slide => {
						if (this.gridBlockRegex.test(slide)) {
							let before = this.transformSlide(slide);
							let after;
							while (after != before) {
								if (after) {
									before = after;
								}
								after = this.transformSlide(before);
							}
							output = output.split(slide).join(after);
							return after;
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
		this.gridBlockRegex.lastIndex = 0;

		let m;
		while ((m = this.gridBlockRegex.exec(slide)) !== null) {
			if (m.index === this.gridBlockRegex.lastIndex) {
				this.gridBlockRegex.lastIndex++;
			}
			const gridTag = m[0];

			const [match, attr, inner] = this.gridRegex.exec(gridTag);
			result.set(match, this.transformGrid(attr, inner));
		}

		for (const [key, value] of result) {
			if (value) {
				slide = slide.split(key).join(value);
			}
		}
		return slide;
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
