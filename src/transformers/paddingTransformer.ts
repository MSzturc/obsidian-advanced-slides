import { AttributeTransformer, Properties } from '.';

export class PaddingTransformer implements AttributeTransformer {
	transform(element: Properties) {
		const value = element.getAttribute('pad');
		if (value != undefined) {
			element.addStyle('padding', value);
			element.addStyle('box-sizing', 'border-box');
			element.deleteAttribute('pad');
		}
	}
}
