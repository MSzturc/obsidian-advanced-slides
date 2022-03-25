import { AttributeTransformer, Properties } from '.';

export class BorderTransformer implements AttributeTransformer {
	transform(element: Properties) {
		const value = element.getAttribute('border');
		if (value != undefined) {
			element.addStyle('border', value);
			element.addStyle('box-sizing', 'border-box');
			element.deleteAttribute('border');
		}
	}
}
