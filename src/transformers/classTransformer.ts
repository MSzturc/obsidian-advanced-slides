import { AttributeTransformer, Properties } from '.';

export class ClassTransformer implements AttributeTransformer {
	transform(element: Properties) {
		const clazz = element.getAttribute('class');

		if (clazz != undefined) {
			clazz
				.split(' ')
				.map(value => value.trim())
				.forEach(value => {
					element.addClass(value);
				});
			element.deleteAttribute('class');
		}
	}
}
