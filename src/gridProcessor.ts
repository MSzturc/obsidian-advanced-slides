import { Options } from "./options";

export class GridProcessor {

	private gridRegex = /<\s*grid([^>]+)>(.*?)<\/grid>/sg;
	private gridPropertiesRegex = /([^=]*)\s*=\s*"([^"]*)"\s*|([^=]*)\s*=\s*'([^']*)'\s*/g;

	private gridAttributeRegex = /^(?:(-?\d*(?:px)?)(?:\s|x)(-?\d*(?:px)?)|(center|top|bottom|left|right|topleft|topright|bottomleft|bottomright))$/m;

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

		const flow = this.flowOf(attributes);
		const flowClass = this.flowClassOf(attributes);
		const bg = this.backgroundOf(attributes);
		const pad = this.paddingOf(attributes);
		const opacity = this.opacityOf(attributes);
		const border = this.borderOf(attributes);
		const filter = this.filterOf(attributes);
		const rotate = this.rotateOf(attributes);
		const animate = this.animationOf(attributes);
		const fragment = this.fragmentOf(attributes);

		const attrResult = this.attrOf(attributes);

		return `<div class="reset-margin${clazz}${animate}${fragment}${flowClass}" style="${flow}${bg}${pad}${opacity}${border}${filter}${rotate}position: fixed; left: ${left}; top: ${top}; height: ${height}; width: ${width}; ${otherStyle}"${attrResult}>\n${inner}</div>`;
	}

	read(attributes: Map<string, string>): Map<string, number> {
		try {
			const result = new Map<string, number>();

			const drag = attributes.get('drag') ?? '480px 700px';
			const drop = attributes.get('drop');

			if (drop == undefined) {
				return undefined;
			}

			const [, width, height] = this.gridAttributeRegex.exec(drag);
			const [, x, y, name] = this.gridAttributeRegex.exec(drop);

			if (width) {
				result.set('width', this.toPixel(960, width));
			}

			if (height) {
				result.set('height', this.toPixel(700, height));
			}

			if (name) {
				const [nx, ny] = this.getXYof(name, result.get('width'), result.get('height'));

				result.set('x', nx);
				result.set('y', ny);
			} else {
				if (x) {
					result.set('x', this.toPixel(960, x));
				}

				if (y) {
					result.set('y', this.toPixel(700, y));
				}
			}
			return result;
		} catch (ex) {
			return undefined;
		}
	}

	getXYof(name: string, width: number, height: number): [number, number] {

		switch (name) {
			case "topleft":
				return [0, 0];
			case "topright":
				return [960 - width, 0];
			case "bottomleft":
				return [0, 700 - height];
			case "bottomright":
				return [960 - width, 700 - height];
			case "left":
				return [0, (700 - height) / 2];
			case "right":
				return [960 - width, (700 - height) / 2];
			case "top":
				return [(960 - width) / 2, 0];
			case "bottom":
				return [(960 - width) / 2, 700 - height];
			case "center":
				return [(960 - width) / 2, (700 - height) / 2];
			default:
				return [0, 0];
		}
	}

	animationOf(attributes: Map<string, string>){
		const animate = attributes.get('animate');
		return (animate != undefined) ? ` ${animate}` : '';
	}

	fragmentOf(attributes: Map<string, string>){
		const animate = attributes.get('frag');
		return (animate != undefined) ? ` fragment` : '';
	}

	backgroundOf(attributes: Map<string, string>){
		const bg = attributes.get('bg');
		return (bg != undefined) ? `background-color: ${bg}; ` : '';
	}
	
	paddingOf(attributes: Map<string, string>){
		const pad = attributes.get('pad');
		return (pad != undefined) ? `box-sizing: border-box; padding: ${pad}; ` : '';
	}
	
	opacityOf(attributes: Map<string, string>){
		const opacity = attributes.get('opacity');
		return (opacity != undefined) ? `opacity: ${opacity}; ` : '';
	}

	borderOf(attributes: Map<string, string>){
		const border = attributes.get('border');
		return (border != undefined) ? `border: ${border}; ` : '';
	}

	filterOf(attributes: Map<string, string>){
		const filter = attributes.get('filter');
		return (filter != undefined) ? `filter: ${filter}; ` : '';
	}

	rotateOf(attributes: Map<string, string>){
		const rotate = attributes.get('rotate');
		return (rotate != undefined) ? `transform: rotate(${rotate.toLowerCase().endsWith('deg')?rotate : rotate +'deg'}); ` : '';
	}

	flowOf(attributes: Map<string, string>){
		const flow = attributes.get('flow');

		switch (flow) {
			case "row":
				return `display: flex; flex-direction: row; align-items: center; justify-content: space-evenly; `;
			case "col":
			default:
				return `display: flex; flex-direction: column; justify-content: space-evenly; `;
		}
	}

	flowClassOf(attributes: Map<string, string>){
		const flow = attributes.get('flow');
		return (flow == "row") ? ` flex-even` : '';
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
		attributes.delete('flow');
		attributes.delete('bg');
		attributes.delete('pad');
		attributes.delete('opacity');
		attributes.delete('border');
		attributes.delete('filter');
		attributes.delete('rotate');
		attributes.delete('animate');
		this.remap(attributes, 'frag', 'data-fragment-index');

		let result = '';

		for (const [key, value] of attributes) {
			if (key && value) {
				result = result + `${key}="${value}" `;
			}
		}
		return ' ' + result.trim();
	}

	remap(attributes: Map<string, string>, src : string, dst: string){
		const value = attributes.get(src);
		if( value){
			attributes.set(dst,value);
			attributes.delete(src);
		}
	}

	classOf(attributes: Map<string, string>): string {
		return attributes.has('class') ? ' ' + attributes.get('class') : '';
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
