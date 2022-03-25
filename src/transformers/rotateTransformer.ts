import { AttributeTransformer, Properties } from '.';

export class RotateTransformer implements AttributeTransformer {
	transform(element: Properties) {
		const value = element.getAttribute('rotate');
		if (value != undefined) {
			const rotate = value.endsWith('deg') ? value : value + 'deg';
			element.addStyle('transform', `rotate(${rotate})`);
			element.deleteAttribute('rotate');
		}
	}
}
