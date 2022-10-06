import { YamlStore } from 'src/yamlStore';
import { AttributeTransformer, Properties } from '.';

export class GridTransformer implements AttributeTransformer {
	private maxWidth: number;
	private maxHeight: number;
	private isCenter: boolean;

	constructor() {
		this.maxWidth = YamlStore.getInstance().options.width;
		this.maxHeight = YamlStore.getInstance().options.height;
		this.isCenter = YamlStore.getInstance().options.center;
	}

	private gridAttributeRegex =
		/^(?:(-?\d*(?:px)?)(?:\s*|x)(-?\d*(?:px)?)|(center|top|bottom|left|right|topleft|topright|bottomleft|bottomright))$/m;

	transform(element: Properties) {

		let defaultDrop;
		let defaultUnit;

		const isAbsolute = element.getAttribute('absolute') == 'true';

		if (isAbsolute) {
			defaultDrop = '480px 700px';
			defaultUnit = 'px';
		} else {
			defaultDrop = '50 100';
			defaultUnit = '%';
		}

		const drop = element.getAttribute('drop');

		if (drop != undefined) {
			const drag = element.getAttribute('drag') ?? defaultDrop;
			const grid = this.read(drag, drop, isAbsolute);

			if (grid != undefined) {
				const left = this.leftOf(grid) + defaultUnit;
				const top = this.topOf(grid) + defaultUnit;
				const height = this.heightOf(grid) + defaultUnit;
				const width = this.widthOf(grid) + defaultUnit;

				element.addStyle('position', 'absolute');
				element.addStyle('left', left);
				element.addStyle('top', top);
				element.addStyle('height', height);
				element.addStyle('width', width);

				if (isAbsolute) {
					element.addStyle('min-height', height);
				}
			}
			element.deleteAttribute('drag');
			element.deleteAttribute('drop');
		}

		if (element.getAttribute('align') || drop) {
			const flow = element.getAttribute('flow');
			const [align, alignItems, justifyContent, stretch] = this.getAlignment(element.getAttribute('align'), flow);
			const justifyCtx = element.getAttribute('justify-content') ?? justifyContent;

			if (align) {
				element.addAttribute('align', align, false);
			}

			if (stretch) {
				element.addClass(stretch);
			}

			switch (flow) {
				case 'row':
					element.addStyle('display', 'flex');
					element.addStyle('flex-direction', 'row');
					element.addStyle('align-items', alignItems);
					element.addStyle('justify-content', justifyCtx);
					element.addClass('flex-even');
					break;
				case 'col':
				default:
					element.addStyle('display', 'flex');
					element.addStyle('flex-direction', 'column');
					element.addStyle('align-items', alignItems);
					element.addStyle('justify-content', justifyCtx);
					break;
			}

			if (this.isCenter != undefined && !this.isCenter) {
				element.addStyle('align-items', 'start');
			}
			element.deleteAttribute('flow');
			element.deleteAttribute('justify-content');
		}

	}

	getAlignment(input: string, flow: string): [string, string, string, string] {
		const direction = flow ?? 'col';

		switch (input) {
			case 'topleft':
				if (direction == 'col') {
					return ['left', 'flex-start', 'flex-start', undefined];
				} else {
					return ['left', 'flex-start', 'space-evenly', undefined];
				}
			case 'topright':
				if (direction == 'col') {
					return ['right', 'flex-end', 'flex-start', undefined];
				} else {
					return ['right', 'flex-start', 'space-evenly', undefined];
				}
			case 'bottomright':
				if (direction == 'col') {
					return ['right', 'flex-end', 'flex-end', undefined];
				} else {
					return ['right', 'flex-end', 'space-evenly', undefined];
				}
			case 'bottomleft':
				if (direction == 'col') {
					return ['left', 'flex-start', 'flex-end', undefined];
				} else {
					return ['left', 'flex-end', 'space-evenly', undefined];
				}
			case 'left':
				if (direction == 'col') {
					return ['left', 'flex-start', 'space-evenly', undefined];
				} else {
					return ['left', 'center', 'space-evenly', undefined];
				}
			case 'right':
				if (direction == 'col') {
					return ['right', 'flex-end', 'space-evenly', undefined];
				} else {
					return ['right', 'center', 'space-evenly', undefined];
				}
			case 'top':
				if (direction == 'col') {
					return [undefined, 'center', 'flex-start', undefined];
				} else {
					return [undefined, 'flex-start', 'space-evenly', undefined];
				}
			case 'bottom':
				if (direction == 'col') {
					return [undefined, 'center', 'flex-end', undefined];
				} else {
					return [undefined, 'flex-end', 'space-evenly', undefined];
				}

			case 'stretch':
				if (direction == 'col') {
					return [undefined, 'center', 'space-evenly', 'stretch-column'];
				} else {
					return [undefined, 'center', 'space-evenly', 'stretch-row'];
				}

			case 'block':
			case 'justify':
				return ['justify', 'center', 'space-evenly', undefined];
			case 'center':
			default:
				// align - alignItems - justifyContent
				return [undefined, 'center', 'center', undefined];
		}
	}

	read(drag: string, drop: string, isAbsolute: boolean): Map<string, number> {
		try {
			const result = new Map<string, number>();

			if (isAbsolute) {
				result.set('maxWidth', this.maxWidth);
				result.set('maxHeight', this.maxHeight);
				return this.readValues(drag, drop, result, this.toPixel, this.getXYof);

			} else {
				result.set('maxWidth', 100);
				result.set('maxHeight', 100);
				return this.readValues(drag, drop, result, this.toRelativeValue, this.relativeOf);
			}
		} catch (ex) {
			return undefined;
		}
	}

	readValues(drag: string, drop: string, result: Map<string, number>, valueTransformer: (max: number, input: string) => number, textTransformer: (name: string, width: number, height: number) => [number, number]): Map<string, number> {

		try {
			const [, width, height] = this.gridAttributeRegex.exec(drag);
			const [, x, y, name] = this.gridAttributeRegex.exec(drop);

			if (width) {
				result.set('width', valueTransformer(result.get('maxWidth'), width));
			}

			if (height) {
				result.set('height', valueTransformer(result.get('maxHeight'), height));
			}

			if (name) {
				const [nx, ny] = textTransformer(name, result.get('width'), result.get('height'));

				result.set('x', nx);
				result.set('y', ny);
			} else {
				if (x) {
					result.set('x', valueTransformer(result.get('maxWidth'), x));
				}

				if (y) {
					result.set('y', valueTransformer(result.get('maxHeight'), y));
				}
			}
			return result;
		} catch (ex) {
			return undefined;
		}
	}

	toRelativeValue(max: number, input: string): number {
		if (input.toLowerCase().endsWith('px')) {
			return Number(input.toLowerCase().replace('px', '')) / max * 100;
		} else {
			return Number(input);
		}
	}

	toPixel(max: number, input: string): number {
		if (input.toLowerCase().endsWith('px')) {
			return Number(input.toLowerCase().replace('px', ''));
		} else {
			return (max / 100) * Number(input);
		}
	}

	getXYof(name: string, width: number, height: number): [number, number] {
		switch (name) {
			case 'topleft':
				return [0, 0];
			case 'topright':
				return [this.maxWidth - width, 0];
			case 'bottomleft':
				return [0, this.maxHeight - height];
			case 'bottomright':
				return [this.maxWidth - width, this.maxHeight - height];
			case 'left':
				return [0, (this.maxHeight - height) / 2];
			case 'right':
				return [this.maxWidth - width, (this.maxHeight - height) / 2];
			case 'top':
				return [(this.maxWidth - width) / 2, 0];
			case 'bottom':
				return [(this.maxWidth - width) / 2, this.maxHeight - height];
			case 'center':
				return [(this.maxWidth - width) / 2, (this.maxHeight - height) / 2];
			default:
				return [0, 0];
		}
	}

	relativeOf(name: string, width: number, height: number): [number, number] {

		switch (name) {
			case 'topleft':
				return [0, 0];
			case 'topright':
				return [100 - width, 0];
			case 'bottomleft':
				return [0, 100 - height];
			case 'bottomright':
				return [100 - width, 100 - height];
			case 'left':
				return [0, (100 - height) / 2];
			case 'right':
				return [100 - width, (100 - height) / 2];
			case 'top':
				return [(100 - width) / 2, 0];
			case 'bottom':
				return [(100 - width) / 2, 100 - height];
			case 'center':
				return [(100 - width) / 2, (100 - height) / 2];
			default:
				return [0, 0];
		}
	}

	leftOf(grid: Map<string, number>): number {
		if (grid.get('x') < 0) {
			return grid.get('maxWidth') + grid.get('x') - grid.get('width');
		} else {
			return grid.get('x');
		}
	}

	topOf(grid: Map<string, number>): number {
		if (grid.get('y') < 0) {
			return grid.get('maxHeight') + grid.get('y') - grid.get('height');
		} else {
			return grid.get('y');
		}
	}

	heightOf(grid: Map<string, number>): number {
		return grid.get('height');
	}

	widthOf(grid: Map<string, number>): number {
		return grid.get('width');
	}
}
