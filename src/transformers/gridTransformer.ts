import { YamlStore } from "src/yamlStore";
import { AttributeTransformer, Properties } from ".";

export class GridTransformer implements AttributeTransformer {

	private maxWidth: number;
	private maxHeight: number;

	constructor() {
		this.maxWidth = YamlStore.getInstance().options.width;
		this.maxHeight = YamlStore.getInstance().options.height;
	}

	private gridAttributeRegex = /^(?:(-?\d*(?:px)?)(?:\s|x)(-?\d*(?:px)?)|(center|top|bottom|left|right|topleft|topright|bottomleft|bottomright))$/m;

	transform(element: Properties) {
		const drop = element.getAttribute('drop');
		if (drop != undefined) {
			const drag = element.getAttribute('drag') ?? '480px 700px';

			const grid = this.read(drag, drop);

			if (grid != undefined) {

				const left = this.leftOf(grid);
				const top = this.topOf(grid);
				const height = this.heightOf(grid);
				const width = this.widthOf(grid);

				element.addClass('reset-margin');
				element.addStyle('position', 'fixed');
				element.addStyle('left', left);
				element.addStyle('top', top);
				element.addStyle('height', height);
				element.addStyle('width', width);

				const flow = element.getAttribute('flow');
				const [align, alignItems, justifyContent] = this.getAlignment(element.getAttribute('align'), flow);
				const justifyCtx = element.getAttribute('justify-content') ?? justifyContent;

				element.deleteAttribute('align');

				if (align) {
					element.addAttribute('align', align, false);
				}

				switch (flow) {
					case "row":
						element.addStyle('display', 'flex');
						element.addStyle('flex-direction', 'row');
						element.addStyle('align-items', alignItems);
						element.addStyle('justify-content', justifyCtx);
						element.addClass('flex-even');
						break;
					case "col":
					default:
						element.addStyle('display', 'flex');
						element.addStyle('flex-direction', 'column');
						element.addStyle('align-items', alignItems);
						element.addStyle('justify-content', justifyCtx);
						break;
				}
				element.deleteAttribute('flow');
				element.deleteAttribute('justify-content');
			}
			element.deleteAttribute('drag');
			element.deleteAttribute('drop');
		}
	}

	getAlignment(input: string, flow: string): [string, string, string] {

		const direction = flow ?? 'col';

		switch (input) {
			case "topleft":
				if (direction == "col") {
					return [undefined, 'flex-start', 'flex-start'];
				} else {
					return ['left', 'flex-start', 'space-evenly'];
				}
			case "topright":
				if (direction == "col") {
					return [undefined, 'flex-end', 'flex-start'];
				} else {
					return ['right', 'flex-start', 'space-evenly'];
				}
			case "bottomright":
				if (direction == "col") {
					return [undefined, 'flex-end', 'flex-end'];
				} else {
					return ['right', 'flex-end', 'space-evenly'];
				}
			case "bottomleft":
				if (direction == "col") {
					return [undefined, 'flex-start', 'flex-end'];
				} else {
					return ['left', 'flex-end', 'space-evenly'];
				}
			case "left":
				if (direction == "col") {
					return [undefined, 'flex-start', 'space-evenly'];
				} else {
					return ['left', 'center', 'space-evenly'];
				}
			case "right":
				if (direction == "col") {
					return [undefined, 'flex-end', 'space-evenly'];
				} else {
					return ['right', 'center', 'space-evenly'];
				}
			case "top":
				if (direction == "col") {
					return [undefined, 'center', 'flex-start'];
				} else {
					return [undefined, 'flex-start', 'space-evenly'];
				}
			case "bottom":
				if (direction == "col") {
					return [undefined, 'center', 'flex-end'];
				} else {
					return [undefined, 'flex-end', 'space-evenly'];
				}
			case "center":
			default:
				// align - alignItems - justifyContent
				return [undefined, 'center', 'space-evenly'];
		}
	}

	read(drag: string, drop: string): Map<string, number> {

		try {
			const result = new Map<string, number>();

			const [, width, height] = this.gridAttributeRegex.exec(drag);
			const [, x, y, name] = this.gridAttributeRegex.exec(drop);

			if (width) {
				result.set('width', this.toPixel(this.maxWidth, width));
			}

			if (height) {
				result.set('height', this.toPixel(this.maxHeight, height));
			}

			if (name) {
				const [nx, ny] = this.getXYof(name, result.get('width'), result.get('height'));

				result.set('x', nx);
				result.set('y', ny);
			} else {
				if (x) {
					result.set('x', this.toPixel(this.maxWidth, x));
				}

				if (y) {
					result.set('y', this.toPixel(this.maxHeight, y));
				}
			}
			return result;
		} catch (ex) {
			return undefined;
		}
	}

	toPixel(max: number, input: string): number {
		if (input.toLowerCase().endsWith('px')) {
			return Number(input.toLowerCase().replace('px', ''));
		} else {
			return max / 100 * Number(input);
		}
	}

	getXYof(name: string, width: number, height: number): [number, number] {

		switch (name) {
			case "topleft":
				return [0, 0];
			case "topright":
				return [this.maxWidth - width, 0];
			case "bottomleft":
				return [0, this.maxHeight - height];
			case "bottomright":
				return [this.maxWidth - width, this.maxHeight - height];
			case "left":
				return [0, (this.maxHeight - height) / 2];
			case "right":
				return [this.maxWidth - width, (this.maxHeight - height) / 2];
			case "top":
				return [(this.maxWidth - width) / 2, 0];
			case "bottom":
				return [(this.maxWidth - width) / 2, this.maxHeight - height];
			case "center":
				return [(this.maxWidth - width) / 2, (this.maxHeight - height) / 2];
			default:
				return [0, 0];
		}
	}

	leftOf(grid: Map<string, number>): string {
		if (grid.get('x') < 0) {
			return (this.maxWidth + grid.get('x') - grid.get('width')) + 'px';
		} else {
			return grid.get('x') + 'px';
		}
	}

	topOf(grid: Map<string, number>): string {
		if (grid.get('y') < 0) {
			return (this.maxHeight + grid.get('y') - grid.get('height')) + 'px';
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
}
