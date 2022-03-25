import { AttributeTransformer, Properties } from '.';

export class StyleTransformer implements AttributeTransformer {
	transform(element: Properties) {
		const style = element.getAttribute('style');

		if (style != undefined) {
			style
				.split(';')
				.map(value => value.trim())
				.filter(value => value.length > 0)
				.forEach((item: string) => {
					if (item && item.includes(':')) {
						const [key, value] = item.split(':');
						if (key && key.length > 0 && value) {
							element.addStyle(key.trim(), value.trim());
						}
					}
				});
			element.deleteAttribute('style');
		}
	}
}
