import { ImageCollector } from 'src/imageCollector';
import { AttributeTransformer, Properties } from '.';

export class BackgroundImageTransformer implements AttributeTransformer {
	transform(element: Properties) {
		const value = element.getAttribute('data-background-image');
		if (value != undefined) {
			if (ImageCollector.getInstance().shouldCollect) {
				ImageCollector.getInstance().addImage(value);
			}
		}
	}
}
