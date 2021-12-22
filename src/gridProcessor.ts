import { Options } from "./options";

export class GridProcessor {

	private gridRegex = /<\s*grid([^>]+)>(.*?)<\/grid>/sg;
	private gridPropertiesRegex = /([^=]*)\s*=\s*"([^"]*)"\s*|([^=]*)\s*=\s*'([^']*)'\s*/g;

	private gridAttributeRegex = /^(-?\d*(?:px)?)(?:\s|x)(-?\d*(?:px)?)$/m;

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

		return slide;
	}

	transformGrid(attr: string, inner: string): string {
		const attributes = this.parseAttributes(attr.trim());

		const grid = this.read(attributes);

		if (grid == undefined) {
			return undefined;
		}

		const left = this.leftOf(grid);
		const top = this.topOf(grid);
		const height = this.heightOf(grid);
		const width = this.widthOf(grid);

		const otherStyle = this.styleOf(attributes);
		const clazz = this.classOf(attributes);
		const classString = clazz ? ` class="${clazz}"` : ' ';

		const attrResult = this.attrOf(attributes);

		return `<div${classString}style="position: fixed; left: ${left}; top: ${top}; height: ${height}; width: ${width}; ${otherStyle}"${attrResult}>${inner}</div>`;
	}

	read(attributes: Map<string, string>): Map<string, number> {
		const result = new Map<string, number>();

		const drag = attributes.get('drag');
		const drop = attributes.get('drop');

		if (drag == undefined || drop == undefined) {
			return undefined;
		}

		const [, width, height] = this.gridAttributeRegex.exec(drag);
		const [, x, y] = this.gridAttributeRegex.exec(drop);

		if (width) {
			result.set('width', this.toPixel(960, width));
		}

		if (height) {
			result.set('height', this.toPixel(700, height));
		}

		if (x) {
			result.set('x', this.toPixel(960, x));
		}

		if (y) {
			result.set('y', this.toPixel(700, y));
		}
		return result;
	}

	toPixel(max: number, input: string): number {
		if (input.toLowerCase().endsWith('px')) {
			return Number(input.toLowerCase().replace('px', ''));
		} else {
			return max / 100 * Number(input);
		}
	}


	attrOf(attributes: Map<string, string>): string {
		attributes.delete('drag');
		attributes.delete('drop');
		attributes.delete('style');
		attributes.delete('class');

		let result = '';

		for (const [key, value] of attributes) {
			if (key && value) {
				result = result + `${key}="${value}" `;
			}
		}
		return ' ' + result.trim();
	}

	classOf(attributes: Map<string, string>): string {
		return attributes.has('class') ? attributes.get('class') : undefined;
	}

	styleOf(attributes: Map<string, string>): string {
		return attributes.has('style') ? attributes.get('style') : '';
	}

	leftOf(grid: Map<string, number>): string {
		if (grid.get('x') < 0) {
			return (960 + grid.get('x') - grid.get('width')) + 'px';
		} else {
			return grid.get('x') + 'px';
		}
	}

	topOf(grid: Map<string, number>): string {
		if (grid.get('y') < 0) {
			return (700 + grid.get('y') - grid.get('height')) + 'px';
		} else {
			return grid.get('y') + 'px';
		}
	}

	heightOf(grid: Map<string, number>): string {
		return grid.get('height') + 'px';
	}

	widthOf(grid: Map<string, number>): string {
		return grid.get('width') + 'px';
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
