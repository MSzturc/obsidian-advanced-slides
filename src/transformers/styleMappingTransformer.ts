import { AttributeTransformer, Properties } from '.';

export class StyleMappingTransformer implements AttributeTransformer {
	private from: string;
	private to: string;

	constructor(from: string, to: string) {
		this.from = from;
		this.to = to;
	}

	transform(element: Properties) {
		const value = element.getAttribute(this.from);
		if (value != undefined) {
			element.addStyle(this.to, value);
			element.deleteAttribute(this.from);
		}
	}
}
