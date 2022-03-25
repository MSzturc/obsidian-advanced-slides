import { AttributeTransformer, Properties } from '.';

export class ClassMappingTransformer implements AttributeTransformer {
	private from: string;

	constructor(from: string) {
		this.from = from;
	}

	transform(element: Properties) {
		const value = element.getAttribute(this.from);
		if (value != undefined) {
			value.split(' ').forEach(item => {
				if (item.trim().length > 0) {
					element.addClass(item.trim());
				}
			});
			element.deleteAttribute(this.from);
		}
	}
}
